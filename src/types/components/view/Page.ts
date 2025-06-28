export interface PageData<C> {
	content: C;
	counter: number;
}

export interface IViewPage {
	addContent(data: PageData<HTMLElement[]>): void;
	changeCounter(counter: number): void;
}

export interface IViewPageSettings {
	basket: string;
	counter: string;
	gallery: string;
	event: string;
}

