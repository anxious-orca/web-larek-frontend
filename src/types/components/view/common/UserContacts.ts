import { IChangeable } from '../../base/View';

export interface UserContactsData {
	email: string;
	phone: string;
}

export interface UserContactsSettings extends IChangeable<UserContactsData> {
	email: string;
	phone: string;
	messageErrorClass: string;
	onNext: () => void;
}
