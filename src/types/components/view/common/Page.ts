export interface PageData<C> {
	content: C;
	counter: number;
	isLocked: boolean;
}

export interface PageSettings {
	wrapper: string;
	counter: string;
	basket: string;
	lockedClass: string;
	onOpenBasket: () => void;
}

