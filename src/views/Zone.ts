import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Emitter } from 'pixi-particles';
import { Container, Graphics, Point, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { getCircleParticleConfig, getSplashParticlesConfig } from '../configs/particlesConfig';
import { getFurnitureSpriteConfig, getLineSpriteConfig, plusSpriteConfig } from '../configs/spriteConfigs';
import { ButtonPositions, ZONE_HIT_AREA, ZONE_PARTICLE_CONFIG } from '../configs/zonesConfig';
import { BoardEvents } from '../events/MainEvents';
import { ZoneModel } from '../models/ZoneModel';
import { bringToFront, makeSprite } from '../utils';
import { ZoneButton } from './ZoneButtons';

export class Zone extends Container {
    private plus: Sprite | null;
    private line: Sprite;
    private furniture: Sprite;
    private buttons: ZoneButton;
    private chosenItemId: string;
    private _isCompleted = false;
    private interactiveArea: Graphics;
    private particleContainer: Container;
    private emitters: Emitter[] = [];

    constructor(private config: ZoneModel) {
        super();

        this.alpha = 0;
        this.build();

        anime({
            targets: this,
            alpha: 1,
            duration: 200,
            easing: 'linear',
        });
    }

    get zoneNumber(): number {
        return this.config.zoneNumber;
    }

    get uuid(): string {
        return this.config.uuid;
    }

    get isCompleted(): boolean {
        return this._isCompleted;
    }

    get isShowingButtons(): boolean {
        return this.buttons.alpha > 0;
    }

    public getHintPosition(): Point[] {
        return this.buttons.getHintPosition();
    }

    public update(dt: number): void {
        this.emitters?.forEach((emitter) => emitter?.update(dt));
    }

    public enableInteractive(): void {
        this.interactiveArea.interactive = true;
    }

    public disableInteractive(): void {
        this.interactiveArea.interactive = false;
    }

    public removePlusSign(): void {
        this.plus?.destroy();
        this.plus = null;
    }

    public complete(): void {
        this._isCompleted = true;
        this.interactiveArea.destroy();
        this.hideLine();
        this.hideButtons();
    }

    public removeFurniture(): void {
        this._isCompleted = false;
        anime({
            targets: this.furniture,
            alpha: 0,
            duration: 100,
            easing: 'linear',
        });
        this.buildPlus();
        this.hideButtons();
    }

    public buildFurniture({ x, y, type, uuid }): void {
        if (this._isCompleted) return;

        this.chosenItemId = uuid;
        const texture = Images[`interior/zone_${this.zoneNumber}_${type}`];

        if (this.furniture) {
            anime({
                targets: this.furniture,
                alpha: 0,
                duration: 100,
                easing: 'linear',
                complete: () => {
                    this.furniture.texture = Texture.from(texture);
                    this.furniture.position.set(x, y);
                    anime({
                        targets: this.furniture,
                        alpha: 1,
                        duration: 100,
                        easing: 'linear',
                    });
                },
            });
        } else {
            this.furniture = makeSprite(getFurnitureSpriteConfig(texture, x, y));
            this.furniture.alpha = 0;
            anime({
                targets: this.furniture,
                alpha: 1,
                duration: 100,
                easing: 'linear',
            });
            this.addChild(this.furniture);
            bringToFront(this, this.buttons);
        }

        if (!this.buttons.alpha) {
            this.showButtons();
        }
    }

    private build(): void {
        this.buildLines();
        this.buildInteractiveArea();

        this.config.selectedItem ? this.buildFurniture(this.config.selectedItem) : this.buildPlus();
        this.buildButtons();

        this.particleContainer = new Container();
        this.addChild(this.particleContainer);
    }

    private buildButtons(): void {
        this.buttons = new ZoneButton();
        const { x, y } = ButtonPositions[this.zoneNumber];
        this.buttons.position.set(x, y);
        this.buttons.scale.set(1.2);
        this.buttons.on('ok', () => {
            if (this._isCompleted) return;
            this.emitParticles();
            lego.event.emit(BoardEvents.OkClick, this.chosenItemId);
        });

        this.buttons.on('no', () => {
            if (this._isCompleted) return;
            lego.event.emit(BoardEvents.NoClick);
        });
        this.buttons.alpha = 0;
        this.buttons.deactivate();
        this.addChild(this.buttons);
    }

    private buildLines(): void {
        this.line = makeSprite(getLineSpriteConfig(this.zoneNumber));
        this.addChild(this.line);
    }

    private buildInteractiveArea(): void {
        this.interactiveArea = new Graphics();
        this.interactiveArea.beginFill(0xff0000, 0.3);
        this.interactiveArea.drawPolygon(ZONE_HIT_AREA[this.zoneNumber]);
        this.interactiveArea.endFill();
        this.interactiveArea.alpha = 0;
        this.interactiveArea.interactive = true;
        this.interactiveArea.on('pointerdown', () => {
            lego.event.emit(BoardEvents.ZoneClicked, this.zoneNumber);
        });
        this.addChild(this.interactiveArea);
    }

    private buildPlus(): void {
        this.plus = makeSprite(plusSpriteConfig);
        this.addChild(this.plus);
    }

    public emitParticles(): void {
        const { x, y, w, h } = ZONE_PARTICLE_CONFIG[this.zoneNumber];
        this.emitters.push(
            new Emitter(this.particleContainer, [Texture.from(Images['game/particle'])], getCircleParticleConfig(0, 0)),
        );
        this.emitters.push(
            new Emitter(
                this.particleContainer,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(x, y, w, h, '4dc934'),
            ),
        );
        this.emitters.push(
            new Emitter(
                this.particleContainer,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(x + w / 4, y + h / 4, w / 2, h / 2, 'c934a6'),
            ),
        );
        this.emitters.push(
            new Emitter(
                this.particleContainer,
                [Texture.from(Images['game/spark'])],
                getSplashParticlesConfig(x + w / 4, y + h / 4, w / 2, h / 2, 'd49d08'),
            ),
        );
    }

    private hideLine(): void {
        anime({
            targets: this.line,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => this.line.destroy(),
        });
    }

    private hideButtons(): void {
        anime({
            targets: this.buttons,
            alpha: 0,
            duration: 200,
            easing: 'linear',
            complete: () => this.buttons.deactivate(),
        });
    }

    private showButtons(): void {
        anime({
            targets: this.buttons,
            alpha: 1,
            duration: 200,
            easing: 'linear',
            complete: () => this.buttons.activate(),
        });
    }
}
