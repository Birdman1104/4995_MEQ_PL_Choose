import { ObservableModel } from './ObservableModel';

export class ItemModel extends ObservableModel {
    constructor(private _type: number, private _price: number, private _x: number, private _y: number) {
        super('ItemModel');
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get type(): number {
        return this._type;
    }

    public get price(): number {
        return this._price;
    }
}
