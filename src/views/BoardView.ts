import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { ZONES_POSITIONS } from '../configs/zonesConfig';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
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

        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);

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

        this.buildLines();
    }

    private buildBkg(): void {
        this.bkg = makeSprite({ texture: Images['game/bkg'] });
        this.addChild(this.bkg);
    }

    private buildLines(): void {
        ZONES_POSITIONS.forEach((zoneData, i) => {
            const zone = new Zone(i + 1);
            zone.position.set(zoneData.x, zoneData.y);
            this.addChild(zone);
        });
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }
}
