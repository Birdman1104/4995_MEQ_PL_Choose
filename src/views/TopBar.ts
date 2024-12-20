import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { drawBounds } from '../utils';
import { MoneyBar } from './MoneyBar';

export class TopBar extends Container {
    private moneyBar: MoneyBar;
    constructor() {
        super();

        lego.event.on(BoardModelEvents.MoneyUpdate, this.onMoneyUpdate, this);
        this.build();

        drawBounds(this);
    }

    getBounds(): Rectangle {
        return new Rectangle(0, 0, 800, 100);
    }

    private build(): void {
        this.moneyBar = new MoneyBar();
        this.moneyBar.position.set(500, 25);
        this.addChild(this.moneyBar);
    }

    private onMoneyUpdate(money: number): void {
        this.moneyBar.updateMoney(money);
    }
}
