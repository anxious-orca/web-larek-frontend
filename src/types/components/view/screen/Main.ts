import { CardData } from '../partial/Card';

export interface MainData {
	counter: number;
	items: CardData[];
}

export interface MainSettings {
	onOpenBasket: () => void;
	onOpenProduct: (id: string) => void;
}
