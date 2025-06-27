export interface Settings {
	cardSettings: {
		cardCatalogTemplate: string;
		cardPreviewTemplate: string;
		basketProductTemplate: string;
		image: string;
		category: string;
		title: string;
		description: string;
		price: string;
		index: string;
		buttonAddToBasket: string;
		buttonDelete: string;
	};

	pageSettings: {
		basket: string;
		counter: string;
		gallery: string;
	};

	basketSettings: {
		template: string;
		itemContainer: string;
		button: string;
		price: string;
	};

	userOrderInfoSettings: {
		template: string;
		paymentCard: string;
		paymentCash: string;
		address: string;
		button: string;
		messageErrorClass: string;
	};

	userContactsSettings: {
		template: string;
		email: string;
		phone: string;
		button: string;
		messageErrorClass: string;
	};

	successSettings: {
		template: string;
		description: string;
		button: string;
	},

	modalSettings: {
		buttonClose: string;
		overlay: string;
		content: string;
		activeClass: string;
	}
}
