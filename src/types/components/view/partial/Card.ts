import { IClickable } from '../../base/View';

export interface CardData {
	id: string;
	image: string;
    category: string;
	title: string;
	description: string;
	price: number;
}

export interface CardSettings extends IClickable<string> {
	action: string;
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
	delete: string;
}
