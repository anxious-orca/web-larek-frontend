import { IViewUserContacts, IViewUserContactsSettings, UserContactsData } from './../../types/components/view/UserContacts';
import { IEvents } from './../base/Events';
import { cloneTemplate, ensureElement } from '../../utils/utils';

export class ViewUserContacts implements IViewUserContacts {
    protected element: HTMLElement;

    protected form: HTMLFormElement;
    protected email: HTMLInputElement;
    protected phone: HTMLInputElement;
    protected messageError: HTMLElement;
    protected button: HTMLButtonElement;

    constructor(settings: IViewUserContactsSettings, events: IEvents) {
        this.element = cloneTemplate(settings.template);
        this.email = ensureElement(settings.email, this.element) as HTMLInputElement;
        this.phone = ensureElement(settings.phone, this.element) as HTMLInputElement;
        this.messageError = ensureElement(settings.messageErrorClass, this.element);
        this.button = ensureElement(settings.button, this.element) as HTMLButtonElement;

        this.element.addEventListener('submit', (evt) => {
			evt.preventDefault();
			events.emit(settings.eventSubmit, this.getValue());
		});
        this.email.addEventListener('input', () => events.emit(settings.eventInput, {email: this.email.value, phone: this.phone.value}));
        this.phone.addEventListener('input', () => events.emit(settings.eventInput, {email: this.email.value, phone: this.phone.value}));
    }

    disable() {
        this.button.disabled = true;
    };

    enable() {
        this.button.disabled = false;
    }

    setValue(data: UserContactsData) {
		this.email.value = data.email;
        this.phone.value = data.phone;
	}

	getValue() {
        if (this.email.value && this.phone.value) {
            return {email: this.email.value, phone: this.phone.value};
        } else {
            return {email: null, phone: null};
        }
	}

    clearValue() {
		this.form.reset();
	}

    setMessage(data: string) {
        this.messageError.textContent = data;
    }

    render(data?: UserContactsData) {
        if (data) {
            this.setValue(data);
        }
        return this.element;
    }
};

 