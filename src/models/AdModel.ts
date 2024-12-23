import { GAME_CONFIG } from '../configs/GameConfig';
import { delayRunnable, removeRunnable } from '../utils';
import { CtaModel } from './CtaModel';
import { HintModel } from './HintModel';
import { ObservableModel } from './ObservableModel';
import { SoundModel } from './SoundModel';

export const enum AdStatus {
    Unknown,
    Game,
    PreCta,
    Cta,
}

export class AdModel extends ObservableModel {
    private _cta: CtaModel | null = null;
    private _sound: SoundModel | null = null;
    private _hint: HintModel | null = null;
    private _status: AdStatus = AdStatus.Unknown;

    private idleTimer: any;

    private _inactivity5s: boolean = false;
    private _inactivity10s: boolean = false;
    private _inactivity15s: boolean = false;

    private _inactivityTimer5s: any;
    private _inactivityTimer10s: any;
    private _inactivityTimer15s: any;

    public constructor() {
        super('AdModel');

        this.makeObservable();
    }

    get status(): AdStatus {
        return this._status;
    }

    set status(value: AdStatus) {
        this._status = value;
    }

    get cta(): CtaModel | null {
        return this._cta;
    }

    set cta(value: CtaModel | null) {
        this._cta = value;
    }

    get sound(): SoundModel | null {
        return this._sound;
    }

    set sound(value: SoundModel | null) {
        this._sound = value;
    }

    get hint(): HintModel | null {
        return this._hint;
    }

    set hint(value: HintModel | null) {
        this._hint = value;
    }

    public setAdStatus(status: AdStatus): void {
        this._status = status;
    }

    // CTA
    public initializeCtaModel(): void {
        this._cta = new CtaModel();
        this._cta.initialize();
    }

    public destroyCtaModel(): void {
        this._cta?.destroy();
        this._cta = null;
    }

    // HINT
    public initializeHintModel(): void {
        this._hint = new HintModel();
        this._hint.initialize();
    }

    public destroyHintModel(): void {
        this._hint?.destroy();
        this._hint = null;
    }

    // SOUND;
    public initializeSoundModel(): void {
        this._sound = new SoundModel();
        this._sound.initialize();
    }

    public destroySoundModel(): void {
        this._sound?.destroy();
        this._sound = null;
    }

    public startIdleTimer(): void {
        if (GAME_CONFIG.IdleTime <= 0) return;

        this.idleTimer = delayRunnable(
            GAME_CONFIG.IdleTime,
            () => {
                this._status = AdStatus.Cta;
            },
            this,
        );
    }

    public stopIdleTimer(): void {
        removeRunnable(this.idleTimer);
        this.idleTimer = null;
    }

    // INACTIVITY

    get inactivity5s(): boolean {
        return this._inactivity5s;
    }

    set inactivity5s(value: boolean) {
        this._inactivity5s = value;
    }

    get inactivity10s(): boolean {
        return this._inactivity10s;
    }

    set inactivity10s(value: boolean) {
        this._inactivity10s = value;
    }

    get inactivity15s(): boolean {
        return this._inactivity15s;
    }

    set inactivity15s(value: boolean) {
        this._inactivity15s = value;
    }

    public startInactivityTimers(): void {
        this._inactivityTimer5s = delayRunnable(5, () => (this._inactivity5s = true), this);
        this._inactivityTimer10s = delayRunnable(10, () => (this._inactivity10s = true), this);
        this._inactivityTimer15s = delayRunnable(15, () => (this._inactivity15s = true), this);
    }

    public stopInactivityTimers(): void {
        removeRunnable(this._inactivityTimer5s);
        removeRunnable(this._inactivityTimer10s);
        removeRunnable(this._inactivityTimer15s);

        this._inactivityTimer5s = null;
        this._inactivityTimer10s = null;
        this._inactivityTimer15s = null;
    }
}
