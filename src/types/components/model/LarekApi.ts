export interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface UserData {
	payment: string;
	email: string;
	phone: string;
    address: string;
}

export interface Order extends UserData {
    total: number;
    items: Pick<Product, 'id'>[];
}

export interface OrderResult {
	id: string;
	total: number;
}

export interface ILarekAPI {
	getProductList: () => Promise<Product[]>;
	getProductItem: (id: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}
