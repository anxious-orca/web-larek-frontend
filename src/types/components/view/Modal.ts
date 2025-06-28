export interface IViewModal {
	content: HTMLElement;
    open(): void;
    close(): void;
}

export interface IViewModalSettings {
	buttonClose: string;
	overlay: string;
	content: string;
	activeClass: string;
}
