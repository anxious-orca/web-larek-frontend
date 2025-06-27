import { IViewUserOrderInfo, IViewUserOrderInfoSettings, UserOrderInfoData } from './../../types/components/view/UserOrderInfo';
import { IEvents } from './../base/Events';
import { cloneTemplate, ensureElement } from '../../utils/utils';

export class ViewUserOrderInfo implements IViewUserOrderInfo {
    protected element: HTMLElement;

    protected form: HTMLFormElement;
    protected paymentCard: HTMLButtonElement;
    protected paymentCash: HTMLButtonElement;
    protected address: HTMLInputElement;
    protected messageError: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(settings: IViewUserOrderInfoSettings, events: IEvents) {
        this.element = cloneTemplate(settings.template);
        this.paymentCard = ensureElement(settings.paymentCard, this.element) as HTMLButtonElement;
        this.paymentCash = ensureElement(settings.paymentCash, this.element) as HTMLButtonElement;
        this.address = ensureElement(settings.address, this.element) as HTMLInputElement;
        this.messageError = ensureElement(settings.messageErrorClass, this.element);
        this.button = ensureElement(settings.button, this.element) as HTMLButtonElement;

        this.element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            events.emit(settings.eventSubmit, this.getValue());
        });
        this.paymentCard.addEventListener('click', () => this.controlButton(this.paymentCard));
        this.paymentCash.addEventListener('click', () => this.controlButton(this.paymentCash));
        this.address.addEventListener('input', () => events.emit(settings.eventInput, {address: this.address.value}));
    }

    disable() {
        this.button.disabled = true;
    };

    enable() {
        this.button.disabled = false;
    }

    controlButton(button: HTMLButtonElement) {
        if (button === this.paymentCard) {
            if (this.paymentCard.classList.contains('button_alt-active')) {
                this.deactivate(this.paymentCard);
            } else {
                this.activate(this.paymentCard);
                this.deactivate(this.paymentCash);
            }
        }
        if (button === this.paymentCash) {
            if (this.paymentCash.classList.contains('button_alt-active')) {
                this.deactivate(this.paymentCash);
            } else {
                this.activate(this.paymentCash);
                this.deactivate(this.paymentCard);
            }
        }
    }

    activate(button: HTMLButtonElement) {
        button.classList.add('button_alt-active');
    }

    deactivate(button: HTMLButtonElement) {
        button.classList.remove('button_alt-active');
    }

    setValue(data: UserOrderInfoData) {
        if (data.payment === 'Card') {
            this.activate(this.paymentCard);
            this.deactivate(this.paymentCash);
        }
        if (data.payment === 'Cash') {
            this.activate(this.paymentCash);
            this.deactivate(this.paymentCard);
        }
        this.address.value = data.address;
    }

    clearValue() {
        this.deactivate(this.paymentCash);
        this.deactivate(this.paymentCard);
        this.form.reset();
    }

    getValue() {
        if (this.address.value && (this.paymentCard.classList.contains('button_alt-active') || this.paymentCash.classList.contains('button_alt-active'))) {
            if (this.paymentCard.classList.contains('button_alt-active')) {
                return {payment: 'Card', address: this.address.value};
            }
            if (this.paymentCash.classList.contains('button_alt-active')) {
                return {payment: 'Cash', address: this.address.value};
            }
        } else {
            return {payment: null, address: null};
        }
    }

    setMessage(data: string) {
        this.messageError.textContent = data;
    }

    render(data?: UserOrderInfoData) {
        if (data) {
            this.setValue(data);
        }
        return this.element;
    }
}

 