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
        price: '.basket__price'
    },

    userOrderInfoTemplate: '#order',
    userOrderInfoSettings: {
        paymentCard: 'button[name=card]',
        paymentCash: 'button[name=cash]',
        address: 'input[name=address]',
        messageErrorClass: '.form__errors',
    },

    userContactsTemplate: '#contacts',
    userContactsSettings: {
        email: 'input[name=email]',
        phone: 'input[name=phone]',
        messageErrorClass: '.form__errors',
    },

    successTemplate: '#success',
	successSettings: {
		title: '.order-success__title',
		description: '.order-success__description',
		action: '.order-success__close',
	},

    modalTemplate: '#modal',
	modalSettings: {
		title: '.modal__content',
		footer: '.modal__footer',
    }
}
