import { CardData } from './Card';
import { IView } from './../../base/View';
import { IEvents } from '../../../../components/base/events';

export interface BasketData {
	basketProducts: CardData[];
	total: string;
}

export interface IViewBusket extends IView<BasketData> {
	disable(): void;
}

export interface BasketSettings {
	template: string;
	itemContainer: string;
	button: string;
	price: string;
}

export interface IViewBusketConstructor {
	new (settings: BasketSettings, events: IEvents): IViewBusket
}
