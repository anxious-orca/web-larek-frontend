import { IView } from './../../base/View';
import { IEvents } from '../../../../components/base/events';

export interface SuccessData {
	total: string;
}

export interface IVIewSuccess extends IView<SuccessData> {

}

export interface SuccessSettings {
	template: string;
	description: string;
	button: string;
}

export interface IVIewSuccessConstructor {
	new (settings: SuccessSettings, events: IEvents): IVIewSuccess
}
