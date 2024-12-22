import { Container, NineSlicePlane, Point, Sprite, Text, Texture } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

export class MoneyBar extends Container {
    private bkg: NineSlicePlane;
    private value: Text;
    private icon: Sprite;

    constructor() {
        super();

        this.build();
    }

    public updateMoney(value: number): void {
        this.value.text = value.toString();
        this.value.style.fontFamily = 'MyCustomFont';
        this.value.updateText(false);
    }

    private build(): void {
        this.buildBkg();
        this.buildIcon();
        this.buildValue();
    }

    private buildBkg(): void {
        this.bkg = new NineSlicePlane(Texture.from(Images['ui/bar']), 5, 5, 5, 5);
        this.bkg.width = 200;
        this.bkg.height = 50;
        this.addChild(this.bkg);
    }

    private buildIcon(): void {
        this.icon = makeSprite({ texture: Images['ui/money'], scale: new Point(2, 2) });
        this.icon.position.set(10, 25);
        this.addChild(this.icon);
    }

    private buildValue(): void {
        this.value = new Text('0', { fill: 'white', fontSize: 36, fontFamily: 'MyCustomFont' });
        this.value.anchor.set(0.5);
        // delayRunnable(0.5, () => {
        //     this.value.style.fontFamily = 'MyCustomFont';
        //     this.value.updateText(true);
        // });
        this.value.position.set(110, 25);
        this.addChild(this.value);
    }
}
