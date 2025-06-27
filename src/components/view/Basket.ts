import { IEvents } from '../base/Events';
import { cloneTemplate, ensureElement, formatCurrency } from '../../utils/utils';
import { IViewBasketSettings, IViewBasket, BasketData } from '../../types/components/view/Basket';

export class ViewBasket implements IViewBasket {
    protected element: HTMLElement;

    protected itemContainer: HTMLElement;
    protected button: HTMLButtonElement;
    protected price: HTMLElement;

    constructor(settings: IViewBasketSettings, events: IEvents) {
        this.element = cloneTemplate(settings.template);

        this.itemContainer = ensureElement(settings.itemContainer, this.element);
        this.button = ensureElement(settings.button, this.element) as HTMLButtonElement;
        this.price = ensureElement(settings.price, this.element);

        this.button.addEventListener('click', () => events.emit(settings.event));
    }

    disable() {
        this.button.disabled = true;
    };

    enable() {
        this.button.disabled = false;
    }

    render(data?: BasketData) {
        this.itemContainer.textContent = '';
        if (data) {
            data.basketProducts.forEach(item => {
                this.itemContainer.append(item);
            })
            this.price.textContent = formatCurrency(data.total);
        } else {
            this.price.textContent = formatCurrency(0);
        }
        return this.element;
    }
};

 