import { lego } from '@armathai/lego';
import { Container, Rectangle, Sprite } from 'pixi.js';
import { Images } from '../assets';
import { LOCKS } from '../configs/zonesConfig';
import { BoardEvents } from '../events/MainEvents';
import { BoardModelEvents, GameModelEvents, ZoneModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { GameState } from '../models/GameModel';
import { ItemModel } from '../models/ItemModel';
import { ZoneModel } from '../models/ZoneModel';
import { lp, makeSprite } from '../utils';
import { Lock, LockArea } from './Lock';
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
    private zones: Zone[] = [];
    private selectedZone: Zone | null = null;
    private locks: Lock[] = [];

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this)
            .on(ZoneModelEvents.SelectedItemUpdate, this.onZoneSelectedItemUpdate, this)
            .on(BoardModelEvents.SelectedZoneUpdate, this.onSelectedZoneUpdate, this)
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

        LOCKS.forEach(({ x, y, area }) => {
            const lock = new Lock(area);
            lock.position.set(x, y);
            lock.on('lockClick', (area: LockArea) => {
                lock.hideSign();
                lego.event.emit(BoardEvents.LockClick, area);
            });
            this.addChild(lock);
            this.locks.push(lock);
        });
    }

    private onBoardStateUpdate(state: BoardState): void {
        console.warn(BoardState[state]);
        switch (state) {
            case BoardState.Intro:
                console.warn('intro');

                break;

            default:
                break;
        }
    }

    private onZonesUpdate(zones: ZoneModel[]): void {
        this.zones = zones.map((z) => {
            const zone = new Zone(z);
            zone.position.set(z.x, z.y);
            this.addChild(zone);
            return zone;
        });
    }

    private onSelectedZoneUpdate(newZone: ZoneModel | null, oldZone: ZoneModel | null, uuid: string): void {
        if (!newZone) {
            this.selectedZone = null;
            return;
        }

        const zone = this.zones.find((z) => z.uuid === newZone.uuid);
        if (zone) {
            this.selectedZone = zone;
            this.selectedZone.removePlusSign();
        }
    }

    private onZoneSelectedItemUpdate(item: ItemModel): void {
        console.warn(this.selectedZone);

        if (!this.selectedZone) {
            return;
        }

        this.selectedZone.buildFurniture(item);
    }

    private onGameStateUpdate(state: GameState): void {
        //
    }
}
