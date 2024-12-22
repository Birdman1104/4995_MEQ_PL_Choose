import { ZONES_POSITIONS } from '../configs/zonesConfig';
import { ObservableModel } from './ObservableModel';
import { ZoneModel } from './ZoneModel';

export enum BoardState {
    Unknown,
    Intro,
    ClickOnRoom,
    Idle,
    Zone1,
    Zone2,
    Zone3,
    Zone4,
    Zone5,
    Complete,
}

export class BoardModel extends ObservableModel {
    private _state: BoardState = BoardState.Unknown;
    private _zones: ZoneModel[] = [];
    private _selectedZoneNumber: number;
    private _selectedZone: ZoneModel | null;
    private _money = 0;
    private _progress = 0;

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

    public get money(): number {
        return this._money;
    }

    public set money(value: number) {
        this._money = value;
    }

    public get progress(): number {
        return this._progress;
    }

    public set progress(value: number) {
        this._progress = value;
    }

    public setState(state: BoardState): void {
        this.state = state;
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
        this.state = BoardStateMapToZone[zoneNumber];
    }

    public updateSelectedItem(uuid: string): void {
        if (!this.selectedZone) return;

        this.selectedZone.updateSelectedItem(uuid);
    }

    public acceptOkClick(uuid: string): void {
        if (!this.selectedZone) return;

        this.selectedZone.updateChosenItem(uuid);

        const price = this.selectedZone.getItemPrice(uuid);
        this.money -= price;

        const notCompleted = this.zones.find((zone) => !zone.completed);
        this.state = notCompleted ? BoardState.Idle : BoardState.Complete;

        this.selectedZone = null;

        this.progress = this.zones.filter((zone) => zone.completed).length / this.zones.length;
    }

    public noClick(): void {
        this.state = BoardState.Idle;
        this.selectedZone?.reset();
        this.selectedZone = null;
    }

    public initialize(): void {
        this.state = BoardState.ClickOnRoom;
        this._money = 14000;
    }

    public initializeZones(): void {
        const arr: ZoneModel[] = [];
        ZONES_POSITIONS.forEach(({ x, y }, i) => {
            const zone = new ZoneModel(i + 1, x, y);
            zone.initialize();
            arr.push(zone);
        });

        this.zones = arr;
    }
}

const BoardStateMapToZone = {
    1: BoardState.Zone1,
    2: BoardState.Zone2,
    3: BoardState.Zone3,
    4: BoardState.Zone4,
    5: BoardState.Zone5,
};
