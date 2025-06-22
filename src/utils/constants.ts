import { Settings } from "../types/components/settings";

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS: Settings = {
	gallerySelector: '.gallery',
    gallerySettings: {
        itemClass: 'gallery__item'
    },
    cardSettings: {
        action: '.card__button',
        image: '.card__image',
		category: '.card__category',
		title: '.card__title',
		description: '.card__text',
		price: '.card__price',
        fullClass: 'card_full',
        compactClass: 'card_compact',
        index: '.basket__item-index',
        delete: '.basket__item-delete',
    },
    cardCatalogTemplate: '#card-catalog',
    cardPreviewTemplate: '#card-preview',
    basketProductTemplate: '#card-basket',

    pageSelector: '.page',
    pageSettings: {
        wrapper: '.page__wrapper',
        counter: '.header__basket-counter',
        basket: '.header__basket',
        lockedClass: 'page__wrapper_locked',
    },

    basketTemplate: '#basket',
    basketSettings: {
        itemContainer: '.basket__list',
        itemClass: '.basket__item',
        action: '.basket__button',
        price: '.basket__price'
    },

    userOrderInfoTemplate: '#order',
    userOrderInfoSettings: {
        form: 'button[name=order]',
        paymentCard: 'button[name=card]',
        paymentCash: 'button[name=cash]',
        address: 'input[name=address]',
    },

    userContactsTemplate: '#contacts',
    userContactsSettings: {
        form: 'button[name=contacts]',
        email: 'input[name=email]',
        phone: 'input[name=phone]',
    },

    successTemplate: '#success',
	successSettings: {
		title: '.order-success__title',
		description: '.order-success__description',
		action: '.order-success__close',
	},

    modalTemplate: '#modal',
	modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		footer: '.modal__footer',
		message: '.modal__message',
		activeClass: 'modal_active',
		messageErrorClass: 'modal__message_error',
	},

    appState: {
        formatCurrency: (value: number) => `${value} синапсов`,
        storageKey: '__basketProducts',
    },
};
