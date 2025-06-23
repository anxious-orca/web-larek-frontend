import { IView } from './../../base/View';
import { IEvents } from './../../../../components/base/events';

export interface CardData {
	id: string;
	image: string;
    category: string;
	title: string;
	description: string;
	price: number;
}

export interface IViewCard extends IView<CardData> {
	id: string;
}

export interface IViewCardSettings {
	cardCatalogTemplate: string;
	cardPreviewTemplate: string;
	basketProductTemplate: string;
    image: string;
    category: string;
	title: string;
    description: string;
    price: string;
	fullClass: string;
	compactClass: string;
	isFull: boolean;
	isCompact: boolean;
	index: string;
	addBusket: string;
	delete: string;
}

export interface IViewCardConstructor {
    new (settings: IViewCardSettings, events: IEvents): IViewCard
}
