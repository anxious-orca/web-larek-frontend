import { Settings } from './../../types/components/settings';
import { IEvents } from './Events';
import { ILarekAPI } from './../../types/components/model/LarekApi';
import { IAppState, AppStateModals, AppStateChanges } from './../../types/components/model/AppState';
import { IViewPage } from './../../types/components/view/Page';
import { IViewModal } from './../../types/components/view/Modal';
import { IViewCardConstructor, IViewCardSettings } from './../../types/components/view/Card';
import { IViewBasket } from './../../types/components/view/Basket';
import { IViewUserOrderInfo, UserOrderInfoData } from './../../types/components/view/UserOrderInfo';
import { IViewUserContacts, UserContactsData } from './../../types/components/view/UserContacts';
import { IViewSuccess } from './../../types/components/view/Success';

export class Presenter {
    protected cardCatalogSettings: IViewCardSettings;
    protected cardPreviewSettings: IViewCardSettings;
    protected cardBasketSettings: IViewCardSettings;
    protected basketRendered: HTMLElement;

	constructor(
        protected settings: Settings,
        protected events: IEvents,
        protected api: ILarekAPI,
        protected model: IAppState,
        protected page: IViewPage,
		protected modal: IViewModal,
        protected cardConstructor: IViewCardConstructor,
        protected basket: IViewBasket,
        protected userOrderInfo: IViewUserOrderInfo,
        protected userContacts: IViewUserContacts,
        protected success: IViewSuccess
        ) {
            this.cardCatalogSettings = {...this.settings.cardSettings, isCompact: false, isFull: false, event: AppStateModals.product};
            this.cardPreviewSettings = {...this.settings.cardSettings, isCompact: false, isFull: true, event: AppStateChanges.addToBasket};
            this.cardBasketSettings = {...this.settings.cardSettings, isCompact: true, isFull: false, event: AppStateChanges.removeFromBasket};
        }

    init() {
        // загрузка карточек на страницу
        const renderedCards = this.model.products.map(product => {
            const cardCatalogView = new this.cardConstructor(this.cardCatalogSettings, this.events);
            return cardCatalogView.render(product);
        })
        this.page.addContent({content: renderedCards, counter: this.model.basketSize});
        this.basketRendered = this.basket.render();

        // событие открытия модалки с карточкой
        this.events.on<{id: string}>(AppStateModals.product, (data) => {
            const product = this.model.getProduct(data.id);
            const cardFullView = new this.cardConstructor(this.cardPreviewSettings, this.events);
            if (this.model.isProductInBasket(data.id)) {
                cardFullView.disable();
            } else {
                cardFullView.enable();
            }
            this.modal.content = cardFullView.render(product);
            this.modal.open();
        })

        // событие изменения контента корзины
        this.events.on(AppStateChanges.basket, () => {
            this.page.changeCounter(this.model.basketSize);
            if (this.model.basket !== null) {
                const renderedCards = this.model.basket.map(product => {
                    const cardCompactView = new this.cardConstructor(this.cardBasketSettings, this.events);
                    return cardCompactView.render(product);
                });
                this.basketRendered = this.basket.render({basketProducts: renderedCards, total: this.model.basketTotal});
                this.basket.enable();
            } else {
                this.basketRendered = this.basket.render();
                this.basket.disable();
            }
        })

        // событие добавления в корзину
        this.events.on<{id: string}>(AppStateChanges.addToBasket, (data) => {
            this.model.addProduct(data.id);
            this.events.emit(AppStateChanges.basket);
            this.modal.close();
        })
        
        // событие удаления из корзины
        this.events.on<{id: string}>(AppStateChanges.removeFromBasket, (data) => {
            this.model.removeProduct(data.id);
            this.events.emit(AppStateChanges.basket);
        })

        // событие открытия корзины
        this.events.on(AppStateModals.basket, () => {
            this.modal.content = this.basketRendered;
            this.modal.open();
        })

        // событие открытия формы адреса
        this.events.on(AppStateModals.address, () => {
            this.modal.content = this.userOrderInfo.render();
            this.userOrderInfo.disable();
        })

        // событие изменения input адреса
        this.events.on<UserOrderInfoData>(AppStateChanges.address, (data) => {
            this.model.partialUserData = this.userOrderInfo.getValue();
            const error = this.model.validateAddress(data);
            if (error) {
                this.userOrderInfo.setMessage(error);
                this.userOrderInfo.disable();
            } else {
                this.userOrderInfo.setMessage('');
                if (this.model.isAddressReady) {
                    this.userOrderInfo.enable();
                }
            }
        })

        // событие открытия формы контактов
        this.events.on(AppStateModals.contacts, () => {
            this.modal.content = this.userContacts.render();
            this.userContacts.disable();
        })

        // событие изменения input контактов
        this.events.on<UserContactsData>(AppStateChanges.contacts, (data) => {
            this.model.partialUserData = this.userContacts.getValue();
            const error = this.model.validateContacts(data);
            if (error) {
                this.userContacts.setMessage(error);
                this.userContacts.disable();
            } else {
                this.userContacts.setMessage('');
                if (this.model.isOrderReady) {
                    this.userContacts.enable();
                }
            }
        })

        // событие открытия окна успеха
        this.events.on(AppStateChanges.order , () => {
            this.api.orderProducts(this.model.order)
            .then(data => {
                this.modal.content = this.success.render({total: data.total});
                this.model.clearBasket();
                this.events.emit(AppStateChanges.basket);
            })
            .catch(error => {
                console.error("Error sending order:", error);
            });
        })

        // событие закрытия окна успеха
        this.events.on(AppStateModals.success, () => {
            this.modal.close();
        })
    }

}