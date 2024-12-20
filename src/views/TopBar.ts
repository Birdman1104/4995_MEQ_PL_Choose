import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { BoardModelEvents } from '../events/ModelEvents';
import { MoneyBar } from './MoneyBar';
import { ProgressBar } from './ProgressBar';

export class TopBar extends Container {
    private moneyBar: MoneyBar;
    private progressBar: ProgressBar;

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.MoneyUpdate, this.onMoneyUpdate, this)
            .on(BoardModelEvents.ProgressUpdate, this.onProgressUpdate, this);
        this.build();
    }

    getBounds(): Rectangle {
        return new Rectangle(0, 0, 700, 100);
    }

    private build(): void {
        this.moneyBar = new MoneyBar();
        this.moneyBar.position.set(450, 25);
        this.addChild(this.moneyBar);

        this.progressBar = new ProgressBar();
        this.progressBar.position.set(50, 25);
        this.addChild(this.progressBar);
    }

    private onMoneyUpdate(money: number): void {
        this.moneyBar.updateMoney(money);
    }

    private onProgressUpdate(progress: number): void {
        this.progressBar.updateProgress(progress);
    }
}
