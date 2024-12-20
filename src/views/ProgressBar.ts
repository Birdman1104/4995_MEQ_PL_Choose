import anime from 'animejs';
import { Container, NineSlicePlane, Point, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

const W = 300;

export class ProgressBar extends Container {
    private bkg: NineSlicePlane;
    private progress: NineSlicePlane;
    private icon: Sprite;

    constructor() {
        super();

        this.build();
    }

    public updateProgress(value: number): void {
        const width = (W - 20) * value;
        anime({
            targets: this.progress,
            width: width + 20,
            duration: 200,
            easing: 'linear',
        });
    }

    private build(): void {
        this.buildBkg();
        this.buildProgress();
        this.buildIcon();
    }

    private buildBkg(): void {
        this.bkg = new NineSlicePlane(Texture.from(Images['ui/bar']), 5, 5, 5, 5);
        this.bkg.width = W;
        this.bkg.height = 50;
        this.addChild(this.bkg);
    }

    private buildProgress(): void {
        this.progress = new NineSlicePlane(Texture.from(Images['ui/progress']), 5, 5, 5, 5);
        this.progress.width = 50;
        this.progress.height = 48;
        this.progress.position.set(0, 1);
        this.addChild(this.progress);
    }

    private buildIcon(): void {
        this.icon = makeSprite({ texture: Images['ui/house_icon'], scale: new Point(2, 2) });
        this.icon.position.set(10, 25);
        this.addChild(this.icon);
    }
}
