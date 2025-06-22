import { IView } from '../../base/View';

export interface ModalData<C> {
	content: C;
	message?: string;
	isActive: boolean;
	isError?: boolean;
}

export interface ModalSettings<C> {
	close: string;
	content: string;
	footer: string;
	message: string;
	contentView: IView<C>;
	actions: HTMLElement[];
	activeClass: string;
	messageErrorClass: string;
	onOpen?: () => void;
	onClose?: () => void;
}
