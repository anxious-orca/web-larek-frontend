export interface Settings {
	gallerySelector: string;
	gallerySettings: {
		itemClass: string;
	};
	cardSettings: {
		action: string;
		image: string;
		category: string;
		title: string;
		description: string;
		price: string;
		fullClass: string;
		compactClass: string;
		index: string;
		delete: string;
	};
	cardCatalogTemplate: string;
	cardPreviewTemplate: string;
	basketProductTemplate: string;

	pageSelector: string;
	pageSettings: {
		wrapper: string;
		counter: string;
		basket: string;
		lockedClass: string;
	};

	basketTemplate: string;
	basketSettings: {
		itemContainer: string;
		itemClass: string;
		price: string;
	};

	userOrderInfoTemplate: string;
	userOrderInfoSettings: {
		paymentCard: string;
		paymentCash: string;
		address: string;
		messageErrorClass: string;
	};

	userContactsTemplate: string;
	userContactsSettings: {
		email: string;
		phone: string;
		messageErrorClass: string;
	};

	successTemplate: string;
	successSettings: {
		title: string;
		description: string;
		action: string;
	},

	modalTemplate: string;
	modalSettings: {
		title: string;
		footer: string;
	}
}
