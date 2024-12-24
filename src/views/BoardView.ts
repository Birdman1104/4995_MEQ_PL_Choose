import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Emitter } from 'pixi-particles';
import { Container, NineSlicePlane, Point, Rectangle, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { EXTERIOR_ITEMS } from '../configs/exteriorConfig';
import { getCircleParticleConfig, getSplashParticlesConfig } from '../configs/particlesConfig';
import { LOCKS } from '../configs/zonesConfig';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, ZoneModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { ItemModel } from '../models/ItemModel';
import { ZoneModel } from '../models/ZoneModel';
import { bringToFront, getGameBounds, getViewByProperty, isSquareLikeScreen, lp, makeSprite } from '../utils';
import { Lock, LockArea } from './Lock';
import { SecondRoom } from './SecondRoom';
import { Zone } from './Zone';

const BOUNDS_L = {
    x: -150,
    y: -150,
    w: 300,
    h: 300,
};

const BOUNDS_P = {
    x: -200,
    y: -200,
    w: 375,
    h: 400,
};

const BOUNDS_L_S = {
    x: -150,
    y: -150,
    w: 300,
    h: 300,
};

const BOUNDS_P_S = {
    x: -250,
    y: -250,
    w: 500,
    h: 500,
};

const getBounds = () => {
    return isSquareLikeScreen() ? lp(BOUNDS_L_S, BOUNDS_P_S) : lp(BOUNDS_L, BOUNDS_P);
};

export class BoardView extends Container {
    private state: BoardState;
    private zones: Zone[] = [];
    private selectedZone: Zone | null = null;
    private locks: Lock[] = [];
    private overlay: NineSlicePlane;
    private fullFence: Sprite;
    private secondRoom: SecondRoom;
    private emitters: Emitter[] = [];

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this)
            .on(ZoneModelEvents.SelectedItemUpdate, this.onZoneSelectedItemUpdate, this)
            .on(ZoneModelEvents.CompletedUpdate, this.onZoneCompletedUpdate, this)
            .on(BoardModelEvents.SelectedZoneUpdate, this.onSelectedZoneUpdate, this)
            .on(BoardModelEvents.ZonesUpdate, this.onZonesUpdate, this);

        this.build();

        // drawBounds(this);
    }

    get viewName() {
        return 'BoardView';
    }

    public update(dt): void {
        this.zones.forEach((z) => z?.update(dt));
        this.secondRoom?.update(dt);
        this.emitters?.forEach((emitter) => emitter?.update(dt));
    }

    public getBounds(): Rectangle {
        const { x, y, w, h } = getBounds();
        return new Rectangle(x, y, w, h);
    }

    public rebuild(): void {
        this.setOverlaySize();
    }

    public getHintPositions(): Point[] {
        switch (this.state) {
            case BoardState.Intro:
                const { x, y } = this.toGlobal(new Point(0, 0));
                return [new Point(x, y + 40)];
            case BoardState.ClickOnRoom:
            case BoardState.Idle:
                const zone = this.zones.reverse().find((z) => !z.isCompleted);
                if (zone) {
                    const { x, y } = zone.toGlobal(new Point(0, 0));
                    return [new Point(x, y + 5)];
                }

            case BoardState.Zone1:
            case BoardState.Zone2:
            case BoardState.Zone3:
            case BoardState.Zone4:
            case BoardState.Zone5:
                if (this.selectedZone?.isShowingButtons) {
                    return this.selectedZone.getHintPosition();
                } else {
                    const carousel = getViewByProperty('viewName', 'Carousel');
                    return carousel.getHintPosition();
                }

            default:
                break;
        }
        return [new Point(0, 0)];
    }

    private build(): void {
        this.buildBkg();
        this.buildSecondRoom();
        this.buildLocks();
        this.buildEmptyFence();
        this.buildFullFence();
        this.buildOverlay();
    }

    private buildBkg(): void {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                const bkg = makeSprite({ texture: Images[`game/bkg${j + 1}${i + 1}`] });
                bkg.position.set(i * (bkg.width - 1) - bkg.width / 2, j * (bkg.height - 1) - bkg.height / 2);
                bkg.interactive = true;
                bkg.on('pointerdown', () => lego.event.emit(BoardEvents.BkgClick));
                this.addChild(bkg);
            }
        }
    }

    private buildSecondRoom(): void {
        this.secondRoom = new SecondRoom();
        this.secondRoom.position.set(150, -100);
        this.addChild(this.secondRoom);
    }

    private buildLocks(): void {
        LOCKS.forEach(({ x, y, area }) => {
            const lock = new Lock(area);
            lock.position.set(x, y);
            lock.on('lockClick', (area: LockArea) => {
                lock.hideSign();
                lego.event.emit(BoardEvents.LockClick, area);
            });
            this.addChild(lock);
            this.locks.push(lock);
        });
    }

    private buildEmptyFence(): void {
        const config = EXTERIOR_ITEMS.find((item) => item.item === 'emptyFence')!.config;
        const sprite = makeSprite(config);
        this.addChild(sprite);
    }

    private buildFullFence(): void {
        const config = EXTERIOR_ITEMS.find((item) => item.item === 'fullFence')!.config;
        this.fullFence = makeSprite(config);
        this.fullFence.alpha = 0;
        this.addChild(this.fullFence);
    }

    private buildOverlay(): void {
        this.overlay = new NineSlicePlane(Texture.from(Images['ui/bar']), 5, 5, 5, 5);
        this.setOverlaySize();
        this.overlay.alpha = 0;
        this.addChild(this.overlay);
    }

    private onZonesUpdate(zones: ZoneModel[]): void {
        this.zones = zones.map((z) => {
            const zone = new Zone(z);
            zone.position.set(z.x, z.y);
            this.addChild(zone);
            return zone;
        });
    }

    private onSelectedZoneUpdate(newZone: ZoneModel | null, oldZone: ZoneModel | null, uuid: string): void {
        if (!newZone) {
            this.selectedZone = null;
            this.zones.forEach((z) => z.enableInteractive());
            this.sortZonesByDefault();
            this.overlay.alpha = 0;
            return;
        }

        const zone = this.zones.find((z) => z.uuid === newZone.uuid);
        if (zone) {
            this.selectedZone = zone;
            this.selectedZone.removePlusSign();
            this.overlay.alpha = 1;
            bringToFront(this, this.overlay);
            bringToFront(this, this.selectedZone);
        }
        this.zones.forEach((z) => {
            if (z.uuid !== newZone.uuid) {
                z.disableInteractive();
            }
        });
    }

    private onZoneSelectedItemUpdate(item: ItemModel): void {
        if (!this.selectedZone) return;
        item ? this.selectedZone.buildFurniture(item) : this.selectedZone.removeFurniture();
    }

    private onZoneCompletedUpdate(completed: boolean, wasCompleted: boolean, uuid: string): void {
        if (!this.selectedZone || !completed) return;
        this.selectedZone.complete();
    }

    private onBoardStateUpdate(state: BoardState): void {
        this.state = state;
        if (state === BoardState.Complete) {
            this.showFullFence();
        }
    }

    private showFullFence(): void {
        this.emitParticles();
        anime({
            targets: this.fullFence,
            alpha: 1,
            duration: 500,
            easing: 'easeInOutSine',
            complete: () => {
                this.locks.find((l) => l.area === LockArea.Storage)?.hideSign();

                this.secondRoom.reveal(() => {
                    this.locks.find((l) => l.area === LockArea.Storage)?.showPlusSign(() => this.showHint());
                });
            },
        });
    }

    private emitParticles(): void {
        this.zones.forEach((z) => {
            z.emitParticles();
        });
        this.emitters.push(
            new Emitter(this, [Texture.from(Images['game/particle'])], getCircleParticleConfig(-170, 100)),
        );
        // for(let i = )
        this.emitters.push(
            new Emitter(
                this,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(-150, 100, 50, 50, '4dc934'),
            ),
        );
        this.emitters.push(
            new Emitter(
                this,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(-200, 70, 60, 60, 'c934a6'),
            ),
        );
        this.emitters.push(
            new Emitter(
                this,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(-125, 120, 50, 50, 'd49d08'),
            ),
        );
        this.emitters.push(
            new Emitter(
                this,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(-240, 60, 50, 50, 'd49d08'),
            ),
        );
    }

    private sortZonesByDefault(): void {
        this.zones.sort((a, b) => a.zoneNumber - b.zoneNumber);
        this.zones.forEach((z) => bringToFront(this, z));
    }

    private setOverlaySize(): void {
        const { width, height } = getGameBounds();
        const w = width * 2;
        const h = height * 2;
        this.overlay.width = w;
        this.overlay.height = h;
        this.overlay.position.set(-w / 2, -h / 2);
    }

    private showHint() {
        const hand = makeSprite({ texture: Images['game/hand'] });
        hand.anchor.set(0);
        this.addChild(hand);
        let currentPoint = 0;
        const hintPositions = [this.locks.find((l) => l.area === LockArea.Storage)!.position];

        const moveHand = (pos): void => {
            anime({
                targets: hand,
                x: pos.x + 5,
                y: pos.y + 5,
                duration: 500,
                easing: 'easeInOutCubic',
                complete: () => pointHand(),
            });
        };

        const pointHand = (): void => {
            anime({
                targets: hand.scale,
                x: 0.4,
                y: 0.4,
                duration: 500,
                easing: 'easeInOutCubic',
                direction: 'alternate',
                complete: () => {
                    currentPoint += 1;
                    currentPoint = currentPoint % hintPositions.length;
                    moveHand(hintPositions[currentPoint]);
                },
            });
        };

        const showFirstTime = (): void => {
            const point = hintPositions[currentPoint];
            hand.scale.set(0.6);
            hand.alpha = 1;
            hand.position.set(point.x + 5, point.y + 5);
            hand.angle = 0;
            hand.visible = true;

            pointHand();
        };

        showFirstTime();
    }
}
