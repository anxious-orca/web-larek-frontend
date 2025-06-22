import {
	Product,
	UserData,
	Order,
	ILarekAPI
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

export interface AppState {
	products: Map<Pick<Product, 'id'>, Product>;

	selectedProduct: Product | null;
	basket: Map<string, BasketProduct>;
	basketTotal: number;
	userData: UserData;
	order: Order;

	isOrderReady: boolean;
	modalMessage: string | null;
	isError: boolean;

	addProduct(id: string): void;
	removeProduct(id: string): void;
	fillUserData(contacts: Partial<UserData>): void;
	isValidUserData(): boolean;
}

export interface AppStateSettings {
	onChange: (changed: AppStateChanges) => void;
}

export interface AppStateConstructor {
	new (api: ILarekAPI, settings: AppStateSettings): AppState;
}
