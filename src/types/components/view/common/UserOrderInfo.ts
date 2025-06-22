import { IChangeable } from '../../base/View';

export interface UserOrderInfoData {
    payment: string;
    address: string;
}

export interface UserOrderInfoSettings extends IChangeable<UserOrderInfoData> {
    paymentCard: string;
    paymentCash: string;
    address: string;
    messageErrorClass: string;
	onNext: () => void;
}

