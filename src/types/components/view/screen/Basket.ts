import { BasketProductData } from './../partial/BasketProduct';

export interface BasketData {
	basketProducts: BasketProductData[];
	isActive: boolean;
	isDisabled: boolean;
	total: string;
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}
