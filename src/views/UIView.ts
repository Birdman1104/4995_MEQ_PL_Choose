import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import anime from 'animejs';
import { getUIGridConfig } from '../configs/gridConfigs/UIViewGC';
import { BoardModelEvents } from '../events/ModelEvents';
import { BoardState } from '../models/BoardModel';
import { ZoneModel } from '../models/ZoneModel';
import { Carousel } from './Carousel';
export class UIView extends PixiGrid {
    private selectedZoneNumber: number;
    private selectedZone: string;
    private carousel: Carousel;

    constructor() {
        super();

        lego.event
            .on(BoardModelEvents.StateUpdate, this.onBoardStateUpdate, this)
            .on(BoardModelEvents.SelectedZoneNumberUpdate, this.onSelectedZoneNumberUpdate, this)
            .on(BoardModelEvents.SelectedZoneUpdate, this.onSelectedZoneUpdate, this);

        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getUIGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.carousel = new Carousel();
        this.carousel.alpha = 0;
        this.setChild('slider_hide', this.carousel);
    }

    private onSelectedZoneNumberUpdate(zoneNumber: number): void {
        this.selectedZoneNumber = zoneNumber;
    }

    private onBoardStateUpdate(state: BoardState): void {
        switch (state) {
            case BoardState.Zone1:
            case BoardState.Zone2:
            case BoardState.Zone3:
            case BoardState.Zone4:
            case BoardState.Zone5:
                // this.sho
                break;

            default:
                break;
        }
    }

    private onSelectedZoneUpdate(zone: ZoneModel): void {
        if (zone) {
            const data = zone.availableItems.map((item) => {
                const img = `interior/zone_${this.selectedZoneNumber}_${item.type}`;
                const { uuid, price } = item;
                return { img, price, uuid };
            });

            this.carousel.updateItemsData(data);

            customTweenToCell(this, this.carousel, 'slider_show', false);
        } else {
            customTweenToCell(this, this.carousel, 'slider_hide', true);
        }
    }
}

const customTweenToCell = (
    grid,
    child,
    cellName,
    isHiding: boolean,
    duration = 300,
    easing = 'easeInOutSine',
): void => {
    const { x: fromScaleX, y: fromScaleY } = child.scale;
    const { x: fromPositionX, y: fromPositionY } = child.position;
    grid.rebuildChild(child, cellName);
    anime({
        targets: child,
        x: [fromPositionX, child.x],
        y: [fromPositionY, child.y],
        duration,
        easing,
    });
    anime({
        targets: child.scale,
        x: [fromScaleX, child.scale.x],
        y: [fromScaleY, child.scale.y],
        duration,
        easing,
    });
    anime({
        targets: child,
        alpha: isHiding ? 0 : 1,
        easing: 'easeInCubic',
        duration,
    });
};
