import { IEvents } from './../base/Events';
import { Product, UserData, Order } from './../../types/components/model/LarekApi';
import { IAppState, AppStateChanges, BasketProduct } from './../../types/components/model/AppState';
import { arraySum } from '../../utils/utils';

export class AppState implements IAppState {

    protected events: IEvents;
    _products: Map<string, Product> = new Map<string, Product>();
    _basket: Map<string, BasketProduct> = new Map<string, BasketProduct>();
    _userData: UserData = {
        payment: null,
        email: null,
        phone: null,
        address: null
    }
    
    constructor(events: IEvents) {
        this.events = events;
    }

    set products(data: Product[]) {
        for (const product of data) {
			this._products.set(product.id, product);
		}
		this.events.emit(AppStateChanges.products);
    }

    get products(): Product[] {
        return Array.from(this._products.values());
    }

    getProduct(id: string) {
        return this._products.get(id);
    }

    get basket(): BasketProduct[] {
        if (this._basket.size === 0) {
			return null;
		}
        return Array.from(this._basket.values());
    }

    get basketTotal(): number {
        const pricesArray = this.basket.map(item => {
            return item.price;
        })
        return arraySum(pricesArray);
    }

    get basketSize(): number {
        return this._basket.size;
    }

    formatProduct(product: Product) {
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            index: (this._basket.size + 1).toString()
        };
    }

    addProduct(id: string) {
        if (!this._basket.get(id)) {
            this._basket.set(id, this.formatProduct(this.getProduct(id)))
        };
    }

	removeProduct(id: string) {
        this._basket.delete(id);
        if (this.basket !== null) {
            let i = 0;
            const newArray = Array.from(this.basket.values()).map((product) => {
                i += 1;
                return {
                    ...product,
                    index: i.toString()
                };
            })
            this._basket.clear();
            newArray.forEach((product) => {
                this._basket.set(product.id, product);
            })
        }
    }

    clearBasket() {
        this._basket.clear();
    }

    set partialUserData(data: Partial<UserData>) {
        if (data.payment) {
            this._userData.payment = data.payment;
        }
        if (data.address) {
            this._userData.address = data.address;
        }
        if (data.email) {
            this._userData.email = data.email;
        }
        if (data.phone) {
            this._userData.phone = data.phone;
        }
    }

    validateAddress(input: string): string | null {
        if (input && !/^[А-Яа-яЁё\s,.]+, д\.\d+(\/\d+)?, кв\.\d+$/.test(input)) {
            return 'Необходимый формат: Город, улица, д.99/1, кв.195';
        }
        return null;
    }

    validateContacts(data: Partial<UserData>): string | null {
		const errors: string[] = [];
		if (!data.email || !data.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (data.email && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(data.email)) {
			errors.push('Некорректный email');
		}
		if (data.phone && !/^\+?[0-9]{10,14}$/.test(data.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}

    get isAddressReady(): boolean {
        return (
            this._basket.size > 0 
            && !!this._userData.payment 
            && !!this._userData.address 
            && !!!this.validateAddress(this._userData.address)
        );
    }

    get isOrderReady(): boolean {
		return (
			this._basket.size > 0 
            && !!this._userData.payment 
            && !!this._userData.address 
            && !!this._userData.email 
            && !!this._userData.phone
            && !!!this.validateContacts(this._userData)
		);
	}

    get order(): Order {
        if (this.isOrderReady) {
            return {
                ...this._userData,
                total: this.basketTotal,
                items: Array.from(this._basket.keys())
            };
        }
        return null;
    }
}