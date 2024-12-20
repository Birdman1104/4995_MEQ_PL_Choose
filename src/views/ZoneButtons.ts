import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class ZoneButton extends Container {
    private okButton: Sprite;
    private noButton: Sprite;
    private bkg: Sprite;

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        this.buildBkg();
        this.buildOk();
        this.buildNo();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['ui/buttons_bg'], anchor: new Point(0.5, 0.5) });
        this.bkg.scale.x = 0.9;
        this.addChild(this.bkg);
    }

    private buildOk(): void {
        this.okButton = makeSprite({
            texture: Images['ui/button_ok'],
            anchor: new Point(0.5, 0.5),
            position: new Point(25, 0),
        });
        this.okButton.interactive = true;
        this.okButton.on('pointerdown', () => {
            this.noButton.interactive = false;
            this.emit('ok');
        });
        this.addChild(this.okButton);
    }

    private buildNo(): void {
        this.noButton = makeSprite({
            texture: Images['ui/button_no'],
            anchor: new Point(0.5, 0.5),
            position: new Point(-25, 0),
        });
        this.noButton.interactive = true;
        this.noButton.on('pointerdown', () => {
            this.okButton.interactive = false;
            this.emit('no');
        });
        this.addChild(this.noButton);
    }
}
