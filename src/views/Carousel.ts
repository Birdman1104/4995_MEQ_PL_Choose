import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { getArrowConfig } from '../configs/spriteConfigs';
import { UIEvents } from '../events/MainEvents';
import { makeSprite } from '../utils';
import { ChoiceCard } from './ChoiceCard';

const W = 80;
const OFFSET = 30;

const maskConfig = {
    x: -200,
    y: -100,
    width: 400,
    height: 200,
};

export class Carousel extends Container {
    private rightArrow: Sprite;
    private leftArrow: Sprite;
    private carouselContainer: Container;
    private itemsData: any[] = [1, 1, 1, 1, 1];
    private items: ChoiceCard[] = [];
    private maskGr: Graphics;

    private currentIndex = 0;
    private animationRunning = false;

    constructor() {
        super();

        this.build();
        // drawBounds(this);
    }

    public getBounds(): Rectangle {
        return new Rectangle(-230, -70, 460, 140);
    }

    public updateItemsData(data: { img: string; price: number; uuid: string }[]): void {
        this.itemsData = data;

        this.items.forEach((item, index) => {
            const { img, price, uuid } = this.itemsData[index];
            item.updateItem(img, price, uuid);
        });
    }

    private build(): void {
        this.carouselContainer = new Container();

        this.addChild(this.carouselContainer);

        this.maskGr = new Graphics();
        this.maskGr.beginFill(0xff0000);
        this.maskGr.drawRect(maskConfig.x, maskConfig.y, maskConfig.width, maskConfig.height);
        this.maskGr.endFill();
        this.addChild(this.maskGr);
        this.carouselContainer.mask = this.maskGr;

        for (let i = 0; i < 5; i++) {
            const item = new ChoiceCard();
            item.position.set((i - this.itemsData.length / 2) * (item.width + OFFSET), 0);
            item.on('cardClick', (uuid) => {
                lego.event.emit(UIEvents.CardClick, uuid);
            });
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
                easing: 'easeInOutSine',
                duration: 300,
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
