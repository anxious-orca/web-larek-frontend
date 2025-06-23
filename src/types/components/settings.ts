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
		fullClass: string;
		compactClass: string;
		index: string;
		addBusket: string;
		delete: string;
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
		form: string;
		paymentCard: string;
		paymentCash: string;
		address: string;
		messageErrorClass: string;
	};

	userContactsSettings: {
		template: string;
		form: string;
		email: string;
		phone: string;
		messageErrorClass: string;
	};

	successSettings: {
		template: string;
		description: string;
		button: string;
	},

	modalSettings: {
		close: string;
		overlay: string;
		content: string;
		activeClass: string;
	}
}
