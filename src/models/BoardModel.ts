import { ZONES_POSITIONS } from '../configs/zonesConfig';
import { ObservableModel } from './ObservableModel';
import { ZoneModel } from './ZoneModel';

export enum BoardState {
    Unknown,
    Intro,
    ClickOnRoom,
    ZoomIn,
    Zone1,
    Zone2,
    Zone3,
    Zone4,
    Zone5,
    ShowZoneVFX,
    ShowFinalVFX,
}

export class BoardModel extends ObservableModel {
    private _state: BoardState = BoardState.Unknown;
    private _zones: ZoneModel[] = [];

    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    get state(): BoardState {
        return this._state;
    }

    set state(value: BoardState) {
        this._state = value;
    }

    get zones(): ZoneModel[] {
        return this._zones;
    }

    set zones(value: ZoneModel[]) {
        this._zones = value;
    }

    public initialize(): void {
        this.state = BoardState.Intro;
        this.initializeZones();
    }

    private initializeZones(): void {
        const arr: ZoneModel[] = [];
        ZONES_POSITIONS.forEach(({ x, y }, i) => {
            const zone = new ZoneModel(i + 1, x, y);
            zone.initialize();
            arr.push(zone);
        });

        this.zones = arr;
    }
}
