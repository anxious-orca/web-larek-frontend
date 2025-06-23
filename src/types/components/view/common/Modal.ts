export interface IViewModal {
	content: HTMLElement;
    open(): void;
    close(): void;
}

export interface ModalSettings {
	close: string;
	overlay: string;
	content: string;
	activeClass: string;
}
