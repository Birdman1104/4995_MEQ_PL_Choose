import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { getFurnitureSpriteConfig, getLineSpriteConfig, plusSpriteConfig } from '../configs/spriteConfigs';
import { BoardEvents } from '../events/MainEvents';
import { ZoneModel } from '../models/ZoneModel';
import { makeSprite } from '../utils';

export class Zone extends Container {
    private plus: Sprite | null;
    private line: Sprite;
    private furniture: Sprite;

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

    public enableInteractive(): void {
        this.line.interactive = true;
    }

    public disableInteractive(): void {
        this.line.interactive = false;
    }

    public removePlusSign(): void {
        this.plus?.destroy();
        this.plus = null;
    }

    public buildFurniture({ x, y, type }): void {
        const texture = Images[`interior/zone_${this.zoneNumber}_${type}`];

        if (this.furniture) {
            this.furniture.texture = Texture.from(texture);
        } else {
            this.furniture = makeSprite(getFurnitureSpriteConfig(texture, x, y));
            this.addChild(this.furniture);
        }
    }

    private build(): void {
        this.buildLines();

        this.config.selectedItem ? this.buildFurniture(this.config.selectedItem) : this.buildPlus();
    }

    private buildLines(): void {
        this.line = makeSprite(getLineSpriteConfig(this.zoneNumber));
        this.line.interactive = true;
        this.line.on('pointerdown', () => {
            lego.event.emit(BoardEvents.ZoneClicked, this.zoneNumber);
        });
        this.addChild(this.line);
    }

    private buildPlus(): void {
        this.plus = makeSprite(plusSpriteConfig);
        this.addChild(this.plus);
    }
}
