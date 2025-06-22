import {
	Product,
	UserData,
	Order,
	OrderResult,
	ILarekAPI,
} from './LarekApi';

export type BasketProduct = Pick<Product, 'id' | 'title' | 'price'>

export type ProductCard = Pick<Product, 'image' | 'title' | 'category' | 'price'>

export type UserOrderInfo = Pick<UserData, 'payment'| 'address'>

export type UserContacts = Pick<UserData, 'email' | 'phone'>

export enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
	address = 'modal:address',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

export enum AppStateChanges {
	products = 'change:product',
	selectedProduct = 'change:selectedProduct',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	basket = 'change:basket',
	order = 'change:order',
}

export type PersistedState = {
	products: BasketProduct[];
	userData: UserData;
};

export interface AppState {
	products: Map<string, Product>;

	selectedProduct: Product | null;
	basket: Map<string, BasketProduct>;
	basketTotal: number;
	userData: UserData;
	order: Order;

	openedModal: AppStateModals;
	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

	loadProductList(): Promise<void>;
	loadProductItem(id: string): Promise<void>;
	orderTickets(): Promise<OrderResult>;

	restoreState(): void;
	persistState(): void;

	addProduct(id: string): void;
	removeProduct(id: string): void;
	fillUserData(contacts: Partial<UserData>): void;
	isValidUserData(): boolean;

	formatProducts(products: Product[]): ProductCard[];
	formatCurrency(value: number): string;

	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}

export interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	onChange: (changed: AppStateChanges) => void;
}

export interface AppStateConstructor {
	new (api: ILarekAPI, settings: AppStateSettings): AppState;
}
