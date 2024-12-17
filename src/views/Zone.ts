import { Container, Point, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { ITEMS_POSITIONS } from '../configs/zonesConfig';
import { makeSprite } from '../utils';

export class Zone extends Container {
    private line: Sprite;
    private furniture: Sprite;

    constructor(private _zoneNumber: number) {
        super();

        this.build();
    }

    get zoneNumber(): number {
        return this._zoneNumber;
    }

    private build(): void {
        this.buildLines();
        this.buildFurniture();
    }

    private buildLines(): void {
        this.line = makeSprite({ texture: Images[`lines/line${this.zoneNumber}`], anchor: new Point(0.5, 0.5) });
        this.addChild(this.line);
    }

    private buildFurniture(): void {
        const itemName = `zone_${this.zoneNumber}_5`;
        const { x, y } = ITEMS_POSITIONS[itemName];
        this.furniture = makeSprite({
            texture: Images[`interior/${itemName}`],
            anchor: new Point(0.5, 0.5),
        });
        this.furniture.position.set(x, y);
        this.addChild(this.furniture);
    }
}
