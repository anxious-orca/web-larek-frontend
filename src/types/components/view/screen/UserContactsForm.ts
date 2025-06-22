import { UserContactsData } from '../partial/UserContacts';

export interface UserContactsFormData {
	contacts: UserContactsData;
	isActive: boolean;
	isDisabled: boolean;
	message: string;
	total: string;
	isError: boolean;
}

export interface UserContactsFormSettings {
	onChange: (data: UserContactsData) => void;
	onClose: () => void;
	onNext: () => void;
}
