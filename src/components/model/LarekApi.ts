import { Api } from './../base/Api';
import { ILarekAPI, Product, Order, OrderResult, ApiListResponse } from './../../types/components/model/LarekApi';

export class LarekApi extends Api implements ILarekAPI {
    readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProductItem(id: string): Promise<Product> {
		const data = await this.get<Product>(`/product/${id}`);
		return {
			...data,
			image: this.cdn + data.image.replace('.svg', '.png')
		};
	}

    async getProductList(): Promise<Product[]> {
		const data = await this.get<ApiListResponse<Product>>('/product');
		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image.replace('.svg', '.png')
		}));
	}

    async orderProducts(order: Order): Promise<OrderResult> {
		const data = await this.post<OrderResult>('/order', order);
		return data;
	}
}