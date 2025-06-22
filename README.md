# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в приложении

Товар

```
interface Product {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}
```

Данные пользователя

```
interface UserData {
	payment: string;
	email: string;
	phone: string;
    address: string;
}
```

Данные заказа

```
interface Order extends UserData {
    total: number;
    items: Pick<Product, 'id'>[];
}
```

Ответ сервера по заказу

```
interface OrderResult {
	id: string;
	total: number;
}
```

Интерфейс API приложения

```
interface ILarekAPI {
	getProductList: () => Promise<Product[]>;
	getProductItem: (id: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}
```

Форматированные данные товара, которые мы храним в корзине и в localStorage

```
type BasketProduct = Pick<Product, 'id' | 'title' | 'price'>
```

Форматированные данные товара, для отображения карточек на главной странице

```
type ProductCard = Pick<Product, 'image' | 'title' | 'category' | 'price'>
```

Форматированные данные пользователя, в 1 попапе оплаты и адреса

```
type UserOrderInfo = Pick<UserData, 'payment'| 'address'>
```

Форматированные данные пользователя, в 2 попапе email и номера телефона

```
type UserContacts = Pick<UserData, 'email' | 'phone'>
```

Какие модальные окна у нас есть

```
enum AppStateModals {
	product = 'modal:product',
	basket = 'modal:basket',
	address = 'modal:address',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}
```

Какие изменения состояния приложения могут происходить

```
enum AppStateChanges {
	products = 'change:product',
	selectedProduct = 'change:selectedProduct',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
	basket = 'change:basket',
	order = 'change:order',
}
```

Состояние приложения, которое мы будем хранить в localStorage

```
type PersistedState = {
	products: BasketProduct[];
	userData: UserData;
};
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVC:  
-слой данных, отвечает за хранение и изменение данных  
-слой представления, отвечает за отображение данных на странице  
-слой контроллера, связывает данные и представление  

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:
-   'get' - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
-   'post' - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется "POST" запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется  для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом 'IEvents’:
-   'on' - подписка на событие
-   'emit' - инициализация события
-   'trigger' - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс AppState

Модель в проекте представлена классом `AppState`, который содержит в себе все данные и логику работы с ними. 
Модель уведомляет об изменениях данных через метод `onChange(changes: AppStateChanges)`.
Конструктор класса принимает Api и объект настроек с функцией брокера событий

##### Загружаемые с сервера данные
- products: Map<string, Product>; - массив товаров

##### Заполняемые пользователем данные
- selectedProduct: Product | null; - выбранный товар для открытия в модальном окне
- basket: Map<string, BasketProduct>; - массив товаров в корзине
- basketTotal: number; - общая сумма товаров в корзине
- userData: UserData; - вводимые данные пользователя
- order: Order; - заказ пользователя для отправки на сервер

##### Состояние интерфейса
- openedModal: AppStateModals; - открытое модальное окно
- isOrderReady: boolean; - проверка готовности заказа перед отвправкой на сервер
- modalMessage: string | null; - сообщение об ошибке
- isError: boolean; - есть ли ошибка
- events: IEvents - экземпляр класса `EventEmitter` для инициализации событий при изменении данных

##### Действия с API
- loadProductList(): Promise<void>; - загрузка массива товаров с сервера
- loadProductItem(id: string): Promise<void>; - загрузка одного товара с сервера
- orderTickets(): Promise<OrderResult>; - отправка заказа на сервер

##### Действия с localStorage
- restoreState(): void; - восстановить корзину и данные пользователя из localStorage
- persistState(): void; - загрузить в localStorage

##### Пользовательские действия
- addProduct(id: string): void; - добавить товар в корзину
- removeProduct(id: string): void; - удалить товар из корзины
- fillUserData(contacts: Partial<UserData>): void; - заполнить поля персональных данных
- isValidUserData(): boolean; - валидация заполненных полей

##### Вспомогательные методы
- formatProducts(products: Product[]): ProductCard[]; - форматирование массива для главной страницы
- formatCurrency(value: number): string; - изменение валюты 

##### Методы для работы с модальными окнами
- openModal(modal: AppStateModals): void; - открытие модального окна
- setMessage(message: string | null, isError: boolean): void; - установка сообщения об ошибке

##### Настройки модели данных

```
interface AppStateSettings {
	formatCurrency: (value: number) => string;
	storageKey: string;
	onChange: (changed: AppStateChanges) => void;
}
```

##### Конструктор модели данных

```
interface AppStateConstructor {
	new (api: ILarekAPI, settings: AppStateSettings): AppState;
}
```

### Слой представления

Отображения в проекте разделены на три типа:
- `common` — общие компоненты, не зависящие от доменной области проекта
- `partial` — частичные компоненты, реализующие доменную область проекта
- `screen` — верхнеуровневые компоненты, которые являются экранами приложения

#### Базовый родительский класс View

```
interface IView<T, S = object> {
	element: HTMLElement;  // элемент разметки
	copy(settings?: S): IView<T>; // копирующий конструктор
	render(data?: Partial<T>): HTMLElement; // метод рендера
}
```

##### Конструктор класса View

```
interface IViewConstructor<T, S> {
	new (root: HTMLElement, settings: S): IView<T>;
}
```

#### Типы и классы для интерактивных элементов

```
type IClickableEvent<T> = { event: MouseEvent; item?: T };
interface IClickable<T> {
	onClick: (args: IClickableEvent<T>) => void;
}
```

```
type IChangeableEvent<T> = { event: Event; value?: T };
interface IChangeable<T> {
	onChange: (args: IChangeableEvent<T>) => void;
}
```

```
type ISelectableEvent<T> = { event: Event; value?: T };
interface ISelectable<T> {
	onSelect: (args: ISelectableEvent<T>) => void;
}
```

#### Класс модального окна

```
interface ModalData<C> {
	content: C; // контент
	message?: string; // сообщение напр. об ошибке
	isActive: boolean; // открытие и закрытие модального окна
	isError?: boolean; // есть ли ошибка
}

interface ModalSettings<C> {
	close: string; // кнопка закрытия
	content: string; // контейнер контента
	footer: string; // контейнер подвала
	message: string; // контейнер сообщения
	contentView: IView<C>; // отображение контента для рендера
	actions: HTMLElement[]; // кнопка подтверждения
	activeClass: string; // класс активации
	messageErrorClass: string; // класс ошибки
	onOpen?: () => void; // метод срабатывающий при открытии
	onClose?: () => void; // метод срабатывающий при закритии
}
```

##### Класс экрана модального окна

```
interface ModalScreenSettings {
	onClose: () => void; // метод закрытия
	onNext: () => void; // метод открытия
}
```

#### Класс главной страницы

```
interface PageData {
	counter: number; // номер количества товаров в корзине
	isLocked: boolean; // блокировка/разблокировка прокрутки страницы
}

interface PageSettings extends IClickable<never> {
	wrapper: string; // контейнер общей обертки
	counter: string; // контейнер счетчика корзины
	basket: string; // кнопка корзины
	lockedClass: string; // класс блокировки прокрутки
}
```

##### Класс экрана главной страницы

```
interface MainData {
	counter: number; // счетчик корзины
	items: CardData[]; // контент галереи
}

interface MainSettings {
	onOpenBasket: () => void; // метод открытия корзины
	onOpenProduct: (id: string) => void; // метод открытия товара
}
```

#### Класс отображения товара

```
interface CardData {
	id: string; // id товара
	image: string; // изображение товара
    category: string; // категория товара
	title: string; // название товара
	description: string; // описание товара
	price: number; // цена товара
}

interface CardSettings extends IClickable<string> {
	action: string; // кнопка добавления в корзину
    image: string; // контейнер для изображения
    category: string; // контейнер для категории
	title: string; // контейнер для названия
    description: string; // контейнер для описания
    price: string; // контейнер для цены
	fullClass: string; // класс большой карточки для модального окна
	compactClass: string; // класс компактной карточки для корзины
	isFull: boolean;
	isCompact: boolean;
	index: string; // порядковый номер в корзине
	delete: string; // кнопка удаления
}
```

#### Класс экрана корзины

```
interface BasketData {
	basketProducts: BasketProductData[]; // товары в корзине
	isActive: boolean; // открытие и закрытие модального окна
	isDisabled: boolean; // блокировка кнопки
	total: string; // сумма заказа
}

interface BasketSettings {
	onRemove: (id: string) => void; // удаления товара из корзины
	onClose: () => void; // метод закрытия
	onNext: () => void; // метод перейти к оформлению
}
```

#### Класс экрана модального окна с способом оплаты и адресом

```
interface UserOrderInfoFormData {
	contacts: UserOrderInfoData; // данные клиента
	isActive: boolean; // открытие и закрытие модального окна
	isDisabled: boolean; // блокировка кнопки
	message: string; // сообщение
	total: string; // сумма заказа
	isError: boolean; // есть ли ошибка
}

interface UserContactsFormSettings {
	onChange: (data: UserOrderInfoData) => void;
	onClose: () => void;
	onNext: () => void;
}
```

##### Класс отображения формы с способом оплаты и адресом

```
export interface UserOrderInfoData {
    payment: string; // способ оплаты
    address: string; // адрес клиента
}

export interface UserOrderInfoSettings extends IChangeable<UserOrderInfoData> {
    paymentCard: string; // кнопка оплаты картой
    paymentCash: string; // кнопка оплаты наличными
    address: string; // input адреса
}
```

#### Класс экрана модального окна с почтой и номером

```
interface UserContactsFormData {
	contacts: UserContactsData; // данные клиента
	isActive: boolean; // открытие и закрытие модального окна
	isDisabled: boolean; // блокировка кнопки
	message: string; // сообщение
	total: string; // сумма заказа
	isError: boolean; // есть ли ошибка
}

iterface UserContactsFormSettings {
	onChange: (data: UserContactsData) => void;
	onClose: () => void;
	onNext: () => void;
}
```

##### Класс отображения формы с почтой и номером

```
interface UserContactsData {
	email: string; // почта клиента
	phone: string; // телефон клиента
}

interface UserContactsSettings extends IChangeable<UserContactsData> {
	email: string; // input почты
	phone: string; // input телефона
}
```

#### Класс экрана модального окна успешной оплаты

```
interface SuccessData {
	isActive: boolean; // открытие и закрытие модального окна
}

interface SuccessSettings {
	onClose: () => void;
}
```

### Слой коммуникации

#### Класс LarekAPI

Класс LarekAPI - дочерний класс базового класса api

```
interface ILarekAPI {
	getProductList: () => Promise<Product[]>;
	getProductItem: (id: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}
```

## Взаимодействие компонентов

Связывание компонентов происходит при помощи контроллеров. Контроллеры в проекте представлены классами унаследованными от `Controller`, и являются обработчиками пользовательских действий и обновляют состояние модели через ее методы. 

Контроллеры принимают в себя экземпляр модели и обрабатывают события, вызывая методы модели для изменения данных.
```
class Controller<T> {
	constructor(protected model: T) {}

	метод = () => {
		this.model.метод модели(data);
	};
}
```

Код создающий экземпляры API, модели, главного экрана и модальных экранов расположен в файле `index.ts`.  
В нем же происходит гланая подписка на события:

- 'change:product' - изменение списка товаров
- 'change:selectedProduct' - изменение выбранного продукта
- 'change:modal' - изменение открытого модального окна
- 'change:modalMessage' - изменение соообщения в модальном окне
- 'change:basket' - изменение в составе корзины
- 'change:order' - изменение в заказе

Окна генерируют следующие события:

- product = 'modal:product' - открытие модального окна с товаром
- basket = 'modal:basket' - открытие модального окна с корзиной
- address = 'modal:address' - открытие модального окна с адресом
- contacts = 'modal:contacts' - открытие модального окна с почтой и телефоном
- success = 'modal:success' - открытие модального окна с подтверждением
- none = 'modal:none' - никакое модальное окно не открыто












