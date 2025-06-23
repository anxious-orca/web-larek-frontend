import { Settings } from "../types/components/settings";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
    cardSettings: {
        cardCatalogTemplate: '#card-catalog',
        cardPreviewTemplate: '#card-preview',
        basketProductTemplate: '#card-basket',
        image: '.card__image',
		category: '.card__category',
		title: '.card__title',
		description: '.card__text',
		price: '.card__price',
        fullClass: 'card_full',
        compactClass: 'card_compact',
        index: '.basket__item-index',
        addBusket: '.card__button',
        delete: '.basket__item-delete',
    },

    pageSettings: {
        basket: '.header__basket',
        counter: '.header__basket-counter',
        gallery: '.gallery',
    },

    basketSettings: {
        template: '#basket',
        itemContainer: '.basket__list',
        button: '.basket__button',
        price: '.basket__price',
    },

    userOrderInfoSettings: {
        template: '#order',
        form: 'order',
        paymentCard: 'card',
        paymentCash: 'cash',
        address: 'address',
        messageErrorClass: '.form__errors',
    },

    userContactsSettings: {
        template: '#contacts',
        form: 'contacts',
        email: 'email',
        phone: 'phone',
        messageErrorClass: '.form__errors',
    },

	successSettings: {
        template: '#success',
		description: '.order-success__description',
		button: '.order-success__close',
	},

	modalSettings: {
		close: '.modal__close',
	    overlay: '.modal',
	    content: '.modal__content',
	    activeClass: '.modal_active',
    }
}
