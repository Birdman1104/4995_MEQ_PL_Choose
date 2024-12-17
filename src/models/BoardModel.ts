import { ObservableModel } from './ObservableModel';

export enum BoardState {
    Intro,
    ClickOnRoom,
    ZoomIn,
    Zone1,
    ShowZoneVFX,
    ShowFinalVFX,
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
