export interface UserOrderInfoData {
    payment: string;
    address: string;
}

export interface IViewUserOrderInfo {
    disable(): void;
	enable(): void;
    controlButton(button: HTMLButtonElement): void;
    activate(button: HTMLButtonElement): void;
    deactivate(button: HTMLButtonElement): void;
    setValue(data: UserOrderInfoData): void;
    getValue(): UserOrderInfoData;
    clearValue(): void;
    setMessage(data: string): void;
    render(data?: UserOrderInfoData): HTMLElement;
}

export interface IViewUserOrderInfoSettings  {
    template: string;
    paymentCard: string;
    paymentCash: string;
    address: string;
    messageErrorClass: string;
    button: string;
	eventSubmit: string;
    eventInput: string;
}

