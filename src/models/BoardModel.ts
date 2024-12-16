import { ObservableModel } from './ObservableModel';

export enum BoardState {
    Intro,
    ClickOnRoom,
}

export class BoardModel extends ObservableModel {
    constructor() {
        super('BoardModel');

        this.makeObservable();
    }

    public initialize(): void {
        //
    }
}
