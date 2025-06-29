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
        index: '.basket__item-index',
        buttonAddToBasket: '.card__button',
        buttonDelete: '.basket__item-delete',
        categorySoft: 'card__category_soft',
        categoryHard: 'card__category_hard',
        categoryOther: 'card__category_other',
        categoryAdditional: 'card__category_additional',
        categoryButton:'card__category_button'

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
        paymentCard: 'div.order__buttons button[name="card"]',
        paymentCash: 'div.order__buttons button[name="cash"]',
        address: 'label.order__field input[name="address"]',
        button: '.order__button',
        messageErrorClass: '.form__errors',
    },

    userContactsSettings: {
        template: '#contacts',
        email: 'label.order__field_email input[name="email"]',
        phone: 'label.order__field_phone input[name="phone"]',
        button: '.button',
        messageErrorClass: '.form__errors',
    },

	successSettings: {
        template: '#success',
		description: '.order-success__description',
		button: '.order-success__close',
	},

	modalSettings: {
		buttonClose: '.modal__close',
	    overlay: '.modal',
	    content: '.modal__content',
	    activeClass: 'modal_active',
    }
}
