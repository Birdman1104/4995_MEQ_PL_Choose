import { ObservableModel } from './ObservableModel';

export enum ItemType {
    Type1 = '1',
    Type2 = '2',
    Type3 = '3',
    Type4 = '4',
    Type5 = '5',
}

export class ZoneModel extends ObservableModel {
    private _selected = false;
    private _type: ItemType;
    private _completed = false;

    constructor(private _zoneNumber: number, private _x: number, private _y: number) {
        super('ZoneModel');
        this.makeObservable();
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get zoneNumber(): number {
        return this._zoneNumber;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
    }

    public get type(): ItemType {
        return this._type;
    }

    public set type(value: ItemType) {
        this._type = value;
    }

    public get completed(): boolean {
        return this._completed;
    }

    public set completed(value: boolean) {
        this._completed = value;
    }

    public updateType(type: ItemType): void {
        this._type = type;
    }

    public initialize(): void {
        //
    }
}
