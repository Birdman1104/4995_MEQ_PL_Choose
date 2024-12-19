import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { BoardModelEvents, GameModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { GameState } from '../models/GameModel';
import { ZoneModel } from '../models/ZoneModel';
import { lp, makeSprite } from '../utils';
import { Zone } from './Zone';

const BOUNDS_L = {
    x: -300,
    y: -300,
    w: 600,
    h: 600,
};

const BOUNDS_P = {
    x: -300,
    y: -600,
    w: 600,
    h: 1200,
};

export class BoardView extends Container {
    private bkg: Sprite;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this)
            .on(BoardModelEvents.ZonesUpdate, this.onZonesUpdate, this);

        this.build();
    }

    get viewName() {
        return 'BoardView';
    }

    public getBounds(): Rectangle {
        const { x, y, w, h } = lp(BOUNDS_L, BOUNDS_P);
        return new Rectangle(x, y, w, h);
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        this.buildBkg();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.addChild(this.bkg);
    }

    private onBoardStateUpdate(state: BoardState): void {
        console.warn(BoardState[state]);
    }

    private onZonesUpdate(zones: ZoneModel[]): void {
        zones.forEach((z) => {
            const zone = new Zone(z);
            zone.position.set(z.x, z.y);
            this.addChild(zone);
        });
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }
}
