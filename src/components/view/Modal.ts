import { IViewModal, IViewModalSettings } from './../../types/components/view/Modal';
import { ensureElement } from '../../utils/utils';

export class ViewModal implements IViewModal {
    protected settings: IViewModalSettings;

    protected _close: HTMLButtonElement;
    protected overlay: HTMLElement;
    protected _content: HTMLElement;

    constructor(settings: IViewModalSettings) {
        this.settings = settings;
        this.overlay = ensureElement(settings.overlay);
        this._close = ensureElement(settings.buttonClose, this.overlay) as HTMLButtonElement;
        this._content = ensureElement(settings.content, this.overlay);

        this._close.addEventListener('click', this.close.bind(this));
        this.overlay.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(data: HTMLElement) {
		this._content.replaceChildren(data);
	}

    open() {
        this.overlay.classList.add(this.settings.activeClass);
    }

    close() {
        this.overlay.classList.remove(this.settings.activeClass);
		this.content = null;
    }
};

 