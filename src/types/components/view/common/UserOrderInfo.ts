import { IView } from './../../base/View';
import { IEvents } from '../../../../components/base/events';

export interface UserOrderInfoData {
    payment: string;
    address: string;
}

export interface IViewUserOrderInfo extends IView<UserOrderInfoData> {
    setValue(data: UserOrderInfoData): void;
    getValue(): UserOrderInfoData;
    clearValue(): void;
    disable(): void;
}

export interface IViewUserOrderInfoSettings  {
    template: string;
    form: string;
    paymentCard: string;
    paymentCash: string;
    address: string;
    messageErrorClass: string;
}

export interface IViewUserOrderInfoConstructor {
    new (settings: IViewUserOrderInfoSettings, events: IEvents): IViewUserOrderInfo
}

