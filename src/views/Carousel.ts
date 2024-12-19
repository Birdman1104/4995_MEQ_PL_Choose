import anime from 'animejs';
import { Container, Graphics, Point, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { makeSprite } from '../utils';

const W = 80;
const OFFSET = 100;

const getArrowConfig = (side: 'left' | 'right') => {
    return {
        texture: Images['ui/arrow'],
        anchor: new Point(0.5, 0.5),
        position: new Point(200 * (side === 'left' ? -1 : 1), 0),
        scale: new Point(1 * (side === 'left' ? 1 : -1), 1),
    };
};

export class Carousel extends Container {
    private rightArrow: Sprite;
    private leftArrow: Sprite;
    private carouselContainer: Container;
    private itemsData: any[] = [1, 1, 1, 1, 1];
    private items: Sprite[] = [];
    private maskGr: Graphics;

    private currentIndex = 0;
    private animationRunning = false;

    constructor() {
        super();

        this.build();
        // drawBounds(this);
    }

    public getBounds(): Rectangle {
        return new Rectangle(-300, -100, 600, 200);
    }

    public updateItemsData(data: any[]): void {
        this.itemsData = data;
    }

    private build(): void {
        this.carouselContainer = new Container();

        this.addChild(this.carouselContainer);

        this.maskGr = new Graphics();
        this.maskGr.beginFill(0xff0000);
        this.maskGr.drawRect(-200, -100, 400, 200);
        this.maskGr.endFill();
        this.addChild(this.maskGr);
        this.carouselContainer.mask = this.maskGr;

        for (let i = 0; i < 5; i++) {
            const item = makeSprite({
                texture: Images[`ui/choice_bg`],
                anchor: new Point(0.5, 0.5),

                scale: new Point(1.5, 1.5),
            });
            item.position.set((i - this.itemsData.length / 2) * (item.width + OFFSET), 0);
            this.items.push(item);
            this.carouselContainer.addChild(item);
        }

        this.buildArrows();
    }

    private buildArrows(): void {
        this.rightArrow = makeSprite(getArrowConfig('right'));
        this.rightArrow.interactive = true;
        this.rightArrow.on('pointerdown', () => this.slideCarousel(1));
        this.addChild(this.rightArrow);

        this.leftArrow = makeSprite(getArrowConfig('left'));
        this.leftArrow.interactive = true;
        this.leftArrow.on('pointerdown', () => this.slideCarousel(-1));
        this.addChild(this.leftArrow);
    }

    private slideCarousel(direction) {
        if (this.animationRunning) return;

        const totalItems = this.items.length;

        this.currentIndex = (this.currentIndex - direction + totalItems) % totalItems;
        if (direction > 0) {
            const lastItem = this.items.pop();
            if (!lastItem) return;
            lastItem.x = this.items[0].x - lastItem.width - OFFSET;
            this.items.unshift(lastItem);
        } else {
            const firstItem = this.items.shift();
            if (!firstItem) return;
            firstItem.x = this.items[this.items.length - 1].x + firstItem.width + OFFSET;
            this.items.push(firstItem);
        }

        this.items.forEach((item, index) => {
            const delta = (item.width + OFFSET) * direction;
            anime({
                targets: item,
                x: item.x + delta,
                begin: () => {
                    if (index === 0) {
                        this.animationRunning = true;
                    }
                },
                complete: () => {
                    if (index === this.items.length - 1) {
                        this.animationRunning = false;
                    }
                },
            });
        });
    }
}
