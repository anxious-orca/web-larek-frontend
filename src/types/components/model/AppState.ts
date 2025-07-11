import {
	Product,
	UserData,
	Order
} from './LarekApi';

export type BasketProduct = Pick<Product, 'id' | 'title' | 'price'> & {index: string};

export enum AppStateModals {
	product = 'modal:product', 
	basket = 'modal:basket',
	address = 'modal:address',
	contacts = 'modal:contacts',
	success = 'modal:success'
}

export enum AppStateChanges {
	products = 'change:product',
	basket = 'change:basket',
	addToBasket = 'change:addToBasket',
	removeFromBasket = 'change:removeFromBasket',
	address = 'change:inputAddress',
	contacts = 'change:inputContacts',
	order = 'change:order'
}

export interface IAppState {
	_products: Map<string, Product>;
	products: Product[];
	getProduct(id: string): Product;

	_basket: Map<string, BasketProduct>;
	basket: BasketProduct[];
	basketTotal: number;
	basketSize: number;
	formatProduct(product: Product): BasketProduct;
	isProductInBasket(id: string): boolean;
	addProduct(id: string): void;
	removeProduct(id: string): void;
	clearBasket(): void;

	_userData: UserData;
	partialUserData: Partial<UserData>;
	validateAddress(data: Partial<UserData>): string | null;
	validateContacts(data: Partial<UserData>): string | null;

	isAddressReady: boolean;
	isOrderReady: boolean;
	order: Order;
}
