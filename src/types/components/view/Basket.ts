export interface BasketData {
	basketProducts: HTMLElement[];
	total: number;
}

export interface IViewBasket {
	disable(): void;
	enable(): void;
	render(data?: BasketData): HTMLElement;
}

export interface IViewBasketSettings {
	template: string;
	itemContainer: string;
	button: string;
	price: string;
	event: string;
}
