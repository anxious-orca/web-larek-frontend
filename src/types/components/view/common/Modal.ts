export interface ModalData<C> {
	content: C;
	isActive: boolean;
}

export interface ModalSettings<C> {
	close: string;
	overlay: string;
	container: string;
	activeClass: string;
	renderContent: () => void;
	onOpen: () => void;
	onClose: () => void;
}
