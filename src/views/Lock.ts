import anime from 'animejs';
import { Container, Point, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { callIfExists, makeSprite } from '../utils';

export enum LockArea {
    MainRoom,
    Storage,
    Lock1,
    Lock2,
    Lock3,
}

export class Lock extends Container {
    private icon: Sprite;

    constructor(private _area: LockArea) {
        super();

        this.build();
    }

    public get area(): LockArea {
        return this._area;
    }

    public hideSign(): void {
        this.icon.interactive = false;
        anime({
            targets: this.icon,
            alpha: 0,
            duration: 200,
            easing: 'linear',
        });
    }

    public showPlusSign(cb?): void {
        this.icon.texture = Texture.from(Images['ui/plus']);
        anime({
            targets: this.icon,
            alpha: 1,
            duration: 200,
            easing: 'linear',
            complete: () => callIfExists(cb),
        });
    }

    private build(): void {
        if (this.area === LockArea.MainRoom) {
            this.buildPlusSign();
        } else {
            this.buildLock();
        }
    }

    private buildLock(): void {
        this.icon = makeSprite({ texture: Images['ui/lock'], scale: new Point(1.25, 1.25) });
        this.icon.interactive = true;
        this.addChild(this.icon);
    }

    private buildPlusSign(): void {
        this.icon = makeSprite({ texture: Images['ui/plus'], scale: new Point(1.25, 1.25) });
        this.icon.interactive = true;
        this.icon.on('pointerdown', () => this.emit('lockClick', this.area));
        this.addChild(this.icon);
    }
}
