import { lego } from '@armathai/lego';
import { BoardEvents, MainGameEvents, TakeMe } from './events/MainEvents';
import { AdModelEvents, SoundModelEvents } from './events/ModelEvents';
import { SoundState } from './models/SoundModel';

export class Analytics {
    private firstInteraction = false;
    private complete = false;

    constructor() {}

    public init() {
        lego.event
            .on(AdModelEvents.Inactivity5sUpdate, this.on5sInactivity, this)
            .on(AdModelEvents.Inactivity10sUpdate, this.on10sInactivity, this)
            .on(AdModelEvents.Inactivity15sUpdate, this.on15sInactivity, this)
            .on(BoardEvents.LockClick, this.onLockClick, this)
            .on(BoardEvents.BkgClick, this.onBkgClick, this)
            .on(MainGameEvents.MainViewReady, this.onMainViewReady, this)
            .on(TakeMe.ToStore, this.onTakeMeToStore, this)
            .on(SoundModelEvents.StateUpdate, this.onSoundToggle, this);
    }

    private onMainViewReady(): void {
        window.gtag('event', 'start');
    }

    private onSoundToggle(value: SoundState): void {
        const paylaod = {
            sound: value === SoundState.On ? 'on' : 'off',
        };
        window.gtag('event', 'soundToggle', paylaod);
    }

    private onLockClick(): void {
        if (!this.firstInteraction) {
            this.firstInteraction = true;
            window.gtag('event', 'firstInteraction', { target: 'lock' });
        }
    }

    private onBkgClick(): void {
        if (!this.firstInteraction) {
            this.firstInteraction = true;
            window.gtag('event', 'firstInteraction', { target: 'background' });
        }
    }

    private onTakeMeToStore(): void {
        if (!this.complete) {
            this.complete = true;
            window.gtag('event', 'complete');
        }
    }

    private on5sInactivity(value): void {
        if (value) {
            window.gtag('event', 'inaction5s');
        }
    }

    private on10sInactivity(value): void {
        if (value) {
            window.gtag('event', 'inaction10s');
        }
    }
    private on15sInactivity(value): void {
        if (value) {
            window.gtag('event', 'inaction15s');
        }
    }
}

export const AnalyticsController = new Analytics();
