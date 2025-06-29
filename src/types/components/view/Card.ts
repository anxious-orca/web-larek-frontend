import { IEvents } from './../../../components/base/Events';

export interface CardData {
	id: string;
	index: string;
	image: string;
    category: string;
	title: string;
	description: string;
	price: number;
}

export interface IViewCard {
	id: string;
	render(data?: Partial<CardData>): HTMLElement;
	disable(): void;
	enable(): void;
	categoryColorControl(data: string): void;
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
	isFull: boolean;
	isCompact: boolean;
	index: string;
	buttonAddToBasket: string;
	buttonDelete: string;
	event: string;
}

export interface IViewCardConstructor {
    new (settings: IViewCardSettings, events: IEvents): IViewCard
}
