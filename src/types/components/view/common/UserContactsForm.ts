import { IView } from './../../base/View';
import { IEvents } from '../../../../components/base/events';

export interface UserContactsData {
	email: string;
	phone: string;
}

export interface IViewUserContacts extends IView<UserContactsData> {
	setValue(data: UserContactsData): void;
	getValue(): UserContactsData;
	clearValue(): void;
	disable(): void;
}

export interface IViewUserContactsSettings {
	template: string;
	form: string;
	email: string;
	phone: string;
	messageErrorClass: string;
}

export interface IViewUserContactsConstructor {
	new (settings: IViewUserContactsSettings, events: IEvents): IViewUserContacts
}

