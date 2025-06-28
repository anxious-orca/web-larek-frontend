import { AppStateModals, AppStateChanges } from './types/components/model/AppState';
import './scss/styles.scss';
import { API_URL, CDN_URL, SETTINGS } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { LarekApi } from './components/model/LarekApi';
import { AppState } from './components/model/AppState';

import { Presenter } from './components/base/Presenter';

import { ViewPage } from './components/view/Page';
import { ViewModal } from './components/view/Modal';
import { ViewCard } from './components/view/Card';
import { ViewBasket } from './components/view/Basket';
import { ViewUserOrderInfo } from './components/view/UserOrderInfo';
import { ViewUserContacts } from './components/view/UserContacts';
import { ViewSuccess } from './components/view/Success';

const pageSettings = { ...SETTINGS.pageSettings, event: AppStateModals.basket }
const basketSettings = {...SETTINGS.basketSettings, event: AppStateModals.address}
const userOrderInfoSettings = {...SETTINGS.userOrderInfoSettings, eventSubmit: AppStateModals.contacts, eventInput: AppStateChanges.address}
const userContactsSettings = {...SETTINGS.userContactsSettings, eventSubmit: AppStateModals.success, eventInput: AppStateChanges.contacts}
const successSettings = {...SETTINGS.successSettings, event: AppStateChanges.order}

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);
const model = new AppState(events);

const page = new ViewPage(pageSettings, events);
const modal = new ViewModal(SETTINGS.modalSettings);
const basket = new ViewBasket(basketSettings, events);
const userOrderInfo = new ViewUserOrderInfo(userOrderInfoSettings, events);
const contacts = new ViewUserContacts(userContactsSettings, events);
const success = new ViewSuccess(successSettings, events);


const presenter = new Presenter(SETTINGS, events, api, model, page, modal, ViewCard, basket, userOrderInfo, contacts, success);

api.getProductList()
.then(res => {
    model.products = res
})
.catch(error => {
    console.error("Error fetching products:", error);
});

events.on(AppStateChanges.products, () => {
    presenter.init();
});
