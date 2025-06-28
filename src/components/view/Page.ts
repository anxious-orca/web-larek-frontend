import { IEvents } from './../base/Events';
import { ensureElement } from '../../utils/utils';
import { IViewPage, IViewPageSettings, PageData } from '../../types/components/view/Page';

export class ViewPage implements IViewPage {
    protected basket: HTMLButtonElement;
	protected counter: HTMLElement;
	protected gallery: HTMLElement;

    constructor(settings: IViewPageSettings, events: IEvents) {
        this.basket = ensureElement(settings.basket) as HTMLButtonElement;
        this.counter = ensureElement(settings.counter);
        this.gallery = ensureElement(settings.gallery);
        this.basket.addEventListener('click', () => events.emit(settings.event));
    }

    addContent(data: PageData<HTMLElement[]>) {
        this.counter.textContent = data.counter.toString();
        data.content.forEach(item => {
            this.gallery.append(item);
        })
    }

    changeCounter(counter: number) {
        this.counter.textContent = counter.toString();
    }
};

 