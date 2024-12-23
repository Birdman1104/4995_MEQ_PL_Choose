import { Container, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

const config = [
    { x: 0, y: 35 },
    { x: 50, y: 10 },
    { x: -32, y: 12 },
    { x: -110, y: -23 },
    { x: -32, y: -22 },
    { x: 119, y: -17 },
    { x: 50, y: -30 },
    { x: 95, y: -41 },
    { x: 10, y: -46 },
    { x: -68, y: -38 },
    { x: -14, y: -70 },
    { x: 28, y: -77 },
];

export class SecondRoom extends Container {
    private fillings: Sprite[] = [];

    constructor() {
        super();

        this.build();
    }

    private build(): void {
        config.forEach((c, i) => {
            const sprite = makeSprite({ texture: Images[`filling/${i + 1}`] });
            sprite.position.set(c.x, c.y);
            this.addChild(sprite);
            this.fillings.push(sprite);
        });
    }
}
