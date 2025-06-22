import { CardData } from './Card';

export interface BasketData {
	basketProducts: CardData[];
	total: string;
}

export interface BasketSettings {
	itemContainer: string;
	itemClass: string;
	price: string;
	onRemove: (id: string) => void;
	onNext: () => void;
}
