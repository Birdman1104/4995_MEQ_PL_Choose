import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardModelEvents, GameModelEvents, HintModelEvents } from '../events/ModelEvents';
import { BoardModel, BoardState } from '../models/BoardModel';
import { HintState } from '../models/HintModel';
import { tweenToCell } from '../utils';
import { BoardView } from './BoardView';

export class GameView extends PixiGrid {
    private board: BoardView;

    constructor() {
        super();

        lego.event
            .on(GameModelEvents.BoardUpdate, this.onBoardUpdate, this)
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this)
            .on(BoardModelEvents.SelectedZoneNumberUpdate, this.onSelectedZoneNumberUpdate, this)
            .on(HintModelEvents.StateUpdate, this.onHintStateUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public update(): void {
        //
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        //
    }

    private onHintStateUpdate(state: HintState): void {
        //
    }

    private onBoardUpdate(board: BoardModel | null): void {
        board ? this.buildBoard() : this.destroyBoard();
    }

    private buildBoard() {
        this.board = new BoardView();
        this.setChild('board', this.board);
    }

    private destroyBoard(): void {
        this.board.destroy();
    }

    private onBoardStateUpdate(state: BoardState): void {
        switch (state) {
            case BoardState.Idle:
            case BoardState.ClickOnRoom:
            case BoardState.Complete:
                tweenToCell(this, this.board, 'board');
                break;
            case BoardState.Intro:
                tweenToCell(this, this.board, 'intro');
                break;

            default:
                break;
        }
    }

    private onSelectedZoneNumberUpdate(zoneNumber: number): void {
        const cell = zoneNumber === -1 ? 'board' : `zone_${zoneNumber}`;

        tweenToCell(this, this.board, cell);
    }
}
