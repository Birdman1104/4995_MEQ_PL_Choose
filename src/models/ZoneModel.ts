import { ITEMS_CONFIG } from '../configs/zonesConfig';
import { ItemModel } from './ItemModel';
import { ObservableModel } from './ObservableModel';

export enum ItemType {
    Type1 = '1',
    Type2 = '2',
    Type3 = '3',
    Type4 = '4',
    Type5 = '5',
}

export class ZoneModel extends ObservableModel {
    private _availableItems: ItemModel[] = [];
    private _selectedItem: ItemModel | null = null;
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

    public get completed(): boolean {
        return this._completed;
    }

    public set completed(value: boolean) {
        this._completed = value;
    }

    public get availableItems(): ItemModel[] {
        return this._availableItems;
    }

    public get selectedItem(): ItemModel | null {
        return this._selectedItem;
    }

    public updateSelectedItem(type: number): void {
        const item = this._availableItems.find((i) => i.type === type);
        if (!item) return;
        this._selectedItem = item;
    }

    public initialize(): void {
        const arr: ItemModel[] = [];
        Object.keys(ItemType).forEach((key, i) => {
            const config = ITEMS_CONFIG[`zone_${this.zoneNumber}_${ItemType[key]}`];
            arr.push(new ItemModel(ItemType[key], config.price, config.x, config.y));
        });

        this._availableItems = arr;
    }
}
