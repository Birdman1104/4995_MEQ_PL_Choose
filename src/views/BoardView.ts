import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Emitter } from 'pixi-particles';
import { Container, NineSlicePlane, Rectangle, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { EXTERIOR_ITEMS } from '../configs/exteriorConfig';
import { LOCKS } from '../configs/zonesConfig';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, ZoneModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { ItemModel } from '../models/ItemModel';
import { ZoneModel } from '../models/ZoneModel';
import { bringToFront, getGameBounds, lp, makeSprite } from '../utils';
import { Lock, LockArea } from './Lock';
import { Zone } from './Zone';

const BOUNDS_L = {
    x: -300,
    y: -300,
    w: 600,
    h: 600,
};

const BOUNDS_P = {
    x: -300,
    y: -600,
    w: 600,
    h: 1200,
};

export class BoardView extends Container {
    private bkg: Sprite;
    private zones: Zone[] = [];
    private selectedZone: Zone | null = null;
    private locks: Lock[] = [];
    private overlay: NineSlicePlane;
    private fullFence: Sprite;
    private emitter: Emitter;

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this)
            .on(ZoneModelEvents.SelectedItemUpdate, this.onZoneSelectedItemUpdate, this)
            .on(ZoneModelEvents.CompletedUpdate, this.onZoneCompletedUpdate, this)
            .on(BoardModelEvents.SelectedZoneUpdate, this.onSelectedZoneUpdate, this)
            .on(BoardModelEvents.ZonesUpdate, this.onZonesUpdate, this);

        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public update(dt): void {
        console.log(dt);
        // this.emitter?.update(dt);
        this.zones.forEach((z) => z?.update(dt));
    }

    public getBounds(): Rectangle {
        const { x, y, w, h } = lp(BOUNDS_L, BOUNDS_P);
        return new Rectangle(x, y, w, h);
    }

    public rebuild(): void {
        this.setOverlaySize();
    }

    private build(): void {
        this.buildBkg();
        this.buildLocks();
        this.buildEmptyFence();
        this.buildFullFence();
        this.buildOverlay();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.addChild(this.bkg);
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
        console.warn(BoardState[state]);

        if (state === BoardState.Complete) {
            this.showFullFence();
        }
    }

    private showFullFence(): void {
        anime({
            targets: this.fullFence,
            alpha: 1,
            duration: 500,
            easing: 'easeInOutSine',
        });
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
}
