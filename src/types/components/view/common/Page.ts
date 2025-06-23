import { IView } from './../../base/View';
import { IViewCard } from './Card';

export interface PageData<C> {
	content: C;
	counter: number;
}

export interface IViewPage extends IView<PageData<IViewCard[]>> {

}

export interface IViewPageSettings {
	basket: string;
	counter: string;
	gallery: string;
}

