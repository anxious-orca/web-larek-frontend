export interface SuccessData {
	total: number;
}

export interface IViewSuccess {
	render(data: SuccessData): HTMLElement;
}

export interface IViewSuccessSettings {
	template: string;
	description: string;
	button: string;
	event: string;
}
