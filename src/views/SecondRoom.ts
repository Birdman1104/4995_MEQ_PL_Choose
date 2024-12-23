import anime from 'animejs';
import { Emitter } from 'pixi-particles';
import { Container, Sprite, Texture } from 'pixi.js';
import { Images } from '../assets';
import { getBubbleParticlesConfig } from '../configs/particlesConfig';
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
    private emitters: Emitter[] = [];

    constructor() {
        super();

        this.build();
    }

    public update(dt: number): void {
        this.emitters?.forEach((emitter) => emitter?.update(dt));
    }

    public reveal(): void {
        this.fillings.reverse().forEach((f, i) => {
            anime({
                targets: f,
                alpha: 0,
                duration: 100,
                easing: 'linear',
                delay: i * 50,
                changeBegin: () => {
                    console.log('begin');
                    this.emitters.push(
                        new Emitter(this, [Texture.from(Images['game/smoke'])], getBubbleParticlesConfig(f.x, f.y)),
                    );
                },
            });
        });
    }

    private build(): void {
        config.forEach((c, i) => {
            const sprite = makeSprite({ texture: Images[`filling/${i + 1}`] });
            sprite.position.set(c.x, c.y);
            this.addChild(sprite);
            this.fillings.push(sprite);

            // this.emitters.push(
            //     new Emitter(this, [Texture.from(Images['game/smoke'])], getBubbleParticlesConfig(c.x, c.y)),
            // );
        });
    }
}
