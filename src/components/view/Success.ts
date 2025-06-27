import { IViewSuccessSettings, IViewSuccess, SuccessData } from './../../types/components/view/Success';
import { IEvents } from './../base/Events';
import { cloneTemplate, ensureElement, formatCurrency } from '../../utils/utils';

export class ViewSuccess implements IViewSuccess {
    protected element: HTMLElement;

    protected description: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(settings: IViewSuccessSettings, events: IEvents) {
        this.element =  cloneTemplate(settings.template);
        this.description = ensureElement(settings.description, this.element);
        this.button = ensureElement(settings.button, this.element) as HTMLButtonElement;
        
        this.button.addEventListener('click', () => events.emit(settings.event))
    }

    render(data: SuccessData) {
        this.description.textContent = formatCurrency(data.total);
        return this.element;
    }
}
