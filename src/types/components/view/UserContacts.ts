export interface UserContactsData {
	email: string;
	phone: string;
}

export interface IViewUserContacts {
	disable(): void;
	enable(): void;
	setValue(data: UserContactsData): void;
	getValue(): UserContactsData;
	clearValue(): void;
	setMessage(data: string): void; 
	render(data?: UserContactsData): HTMLElement;
}

export interface IViewUserContactsSettings {
	template: string;
	email: string;
	phone: string;
	messageErrorClass: string;
	button: string;
	eventSubmit: string;
    eventInput: string;
}

