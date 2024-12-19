import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { Images } from '../assets';
import { cardBkgSpriteConfig, getItemSpriteConfig, moneySpriteConfig } from '../configs/spriteConfigs';
import { makeSprite } from '../utils';

export class ChoiceCard extends Container {
    private bkg: Sprite;
    private price: Text;
    private moneyIcon: Sprite;
    private item: Sprite;
    private _uuid = '';

    constructor() {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        return this.bkg.getBounds();
    }

    public get uuid(): string {
        return this._uuid;
    }

    public updateItem(item: string, price: number, uuid: string): void {
        const texture = Images[item];

        this.item && this.item.destroy();

        this.item = makeSprite(getItemSpriteConfig(texture));
        this.item.scale.set(this.getItemScale());
        this.addChild(this.item);

        this.price.text = price.toString();
        this._uuid = uuid;
    }

    private build(): void {
        this.buildBkg();
        this.buildMoneyIcon();
        this.buildPrice();
    }

    private buildBkg(): void {
        this.bkg = makeSprite(cardBkgSpriteConfig);
        this.bkg.interactive = true;
        this.bkg.on('pointerdown', () => {
            this.emit('cardClick', this.uuid);
        });
        this.addChild(this.bkg);
    }

    private buildMoneyIcon(): void {
        this.moneyIcon = makeSprite(moneySpriteConfig);
        this.addChild(this.moneyIcon);
    }

    private buildPrice(): void {
        this.price = new Text('100', {
            fontFamily: 'Arial',
            fontSize: 20,
            fill: 0xffffff,
            align: 'center',
        });
        this.price.anchor.set(0, 0.5);
        this.price.position.set(-10, 37);
        this.addChild(this.price);
    }

    private getItemScale(): number {
        const DW = this.bkg.width * 0.8;
        const DH = this.bkg.height * 0.5;

        return Math.min(DW / this.item.width, DH / this.item.height);
    }
}
