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
    private _selectedZoneNumber: number;
    private _selectedZone: ZoneModel | null;

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

    get selectedZoneNumber(): number {
        return this._selectedZoneNumber;
    }

    set selectedZoneNumber(value: number) {
        this._selectedZoneNumber = value;
    }

    get selectedZone(): ZoneModel | null {
        return this._selectedZone;
    }

    set selectedZone(value: ZoneModel | null) {
        this._selectedZone = value;
    }

    public getZoneByNumber(zoneNumber: number): ZoneModel | undefined {
        return this.zones.find((zone) => zone.zoneNumber === zoneNumber);
    }

    public selectZone(zoneNumber: number): void {
        const zone = this.getZoneByNumber(zoneNumber);
        if (!zone) {
            this._selectedZone = null;
            this._selectedZoneNumber = -1;
            return;
        }

        this._selectedZoneNumber = zone.zoneNumber;
        this._selectedZone = zone;
    }

    public updateSelectedItem(uuid: string): void {
        if (!this.selectedZone) return;

        this.selectedZone.updateSelectedItem(uuid);
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
