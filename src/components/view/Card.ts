import { IEvents } from './../base/Events';
import { IViewCard, IViewCardSettings, CardData } from './../../types/components/view/Card';
import { cloneTemplate, ensureElement, formatCurrency } from '../../utils/utils';

export class ViewCard implements IViewCard {
    protected _id: string;
    protected element: HTMLElement;
    protected settings: IViewCardSettings;

    protected image: HTMLImageElement;
    protected category: HTMLElement;
    protected title: HTMLElement;
    protected description: HTMLElement;
    protected price: HTMLElement;

    protected index: HTMLElement;
    protected addBasket: HTMLButtonElement;
    protected delete: HTMLButtonElement;

    constructor(settings: IViewCardSettings, events: IEvents) {
        this.settings = settings;
        if (!settings.isCompact) {
            if (settings.isFull) {
                this.element = cloneTemplate(settings.cardPreviewTemplate);
                this.description = ensureElement(settings.description, this.element);
                this.addBasket = ensureElement(settings.buttonAddToBasket, this.element) as HTMLButtonElement;
                this.addBasket.addEventListener('click', () => events.emit(settings.event, {id: this.id}));
            }
            if (!settings.isFull) {
                this.element = cloneTemplate(settings.cardCatalogTemplate);
                this.element.addEventListener('click', () => events.emit(settings.event, {id: this.id}));
            }
            this.image = ensureElement(settings.image, this.element) as HTMLImageElement;
            this.category = ensureElement(settings.category, this.element);
        }
        if (settings.isCompact) {
            this.element = cloneTemplate(settings.basketProductTemplate);
            this.index = ensureElement(settings.index, this.element);
            this.delete = ensureElement(settings.buttonDelete, this.element) as HTMLButtonElement;
            this.delete.addEventListener('click', () => events.emit(settings.event, {id: this.id}));
        }
        this.title = ensureElement(settings.title, this.element);
        this.price = ensureElement(settings.price, this.element);
    }

    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id || '';
    }

    render(data?: Partial<CardData>) {
        this.id = data.id;
        this.title.textContent = data.title;
        if (data.price === null) {
            this.price.textContent = 'Бесценно';
        } else {
            this.price.textContent = formatCurrency(data.price);
        }
        if (this.settings.isFull) {
            this.description.textContent = data.description;
        }
        if (this.settings.isCompact) {
            this.index.textContent = data.index;
        } else {
            this.image.src = data.image;
            this.image.alt = `Изображение продукта: ${data.title}`;
            this.category.textContent = data.category;
        }
        return this.element;
    }
}
