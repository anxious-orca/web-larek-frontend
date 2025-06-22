import { UserOrderInfoData } from '../partial/UserOrderInfo';

export interface UserOrderInfoFormData {
	contacts: UserOrderInfoData;
	isActive: boolean;
	isDisabled: boolean;
	message: string;
	total: string;
	isError: boolean;
}

export interface UserContactsFormSettings {
	onChange: (data: UserOrderInfoData) => void;
	onClose: () => void;
	onNext: () => void;
}
