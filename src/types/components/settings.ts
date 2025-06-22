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
		action: string;
		price: string;
	};

	userOrderInfoTemplate: string;
	userOrderInfoSettings: {
		form: string;
		paymentCard: string;
		paymentCash: string;
		address: string;
	};

	userContactsTemplate: string;
	userContactsSettings: {
		form: string;
		email: string;
		phone: string;
	};

	successTemplate: string;
	successSettings: {
		title: string;
		description: string;
		action: string;
	},

	modalTemplate: string;
	modalSettings: {
		close: string;
		content: string;
		footer: string;
		message: string;
		activeClass: string;
		messageErrorClass: string;
	};

	appState: {
		formatCurrency: (value: number) => string;
		storageKey: string;
	};
}
