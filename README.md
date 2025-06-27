# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами (реализация проекта) Модели данных и АПИ
- src/components/base/ — папка с базовым кодом
- src/components/model/ - модель данных и АПИ
- src/components/view/ - отображения


Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/ — папка с типами
- src/index.ts — точка входа приложения
- src/components/base/Presenter.ts - презентер
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
    items: string[];
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
interface ILarekAPI extends Api {
	getProductList: () => Promise<Product[]>;
	getProductItem: (id: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}
```

Данные товара, которые мы храним в корзине

```
type BasketProduct = Pick<Product, 'id' | 'title' | 'price'> & {index: string};
```

События открытия модальных окон

```
enum AppStateModals {
	product = 'modal:product', 
	basket = 'modal:basket',
	address = 'modal:address',
	contacts = 'modal:contacts',
	success = 'modal:success'
}
```

События изменений данных

```
enum AppStateChanges {
	products = 'change:product',
	order = 'change:order',
	basket = 'change:basket',
	addToBasket = 'change:addToBasket',
	removeFromBasket = 'change:removeFromBasket',
	address = 'change:inputAddress',
	contacts = 'change:inputContacts'
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:  
-слой данных(Model), отвечает за хранение и изменение данных  
-слой представления(View), отвечает за отображение данных на странице  
-слой презентера(Presenter), связывает данные и представление  

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
Модель уведомляет об изменениях данных через EventEmitter экземпляр которого передается ей в конструкторе.

##### Свойства и методы товаров
- _products: Map<string, Product>; - Map объект товаров
- products: Product[]; - сеттер и геттер товаров

- getProduct(id: string): Product; - метод получения 1 товара

##### Свойства и методы коризины
- _basket: Map<string, BasketProduct>; - Map объект товаров в корзине
- basket: BasketProduct[]; - геттер товаров в корзине
- basketTotal: number; - геттер суммы товаров в корзине
- basketSize: number; - геттер количества товаров в корзине

- formatProduct(product: Product): BasketProduct; - метод форматирования товара в товар корзины
- addProduct(id: string): void; - метод добавления товара в корзину
- removeProduct(id: string): void; - метод удаления товара из корзины
- clearBasket(): void; - метод очищения корзины

##### Свойства и методы заказа и валидации форм
- _userData: UserData; - объект контактных данных пользователя
- partialUserData: Partial<UserData>; - сеттер контактных данных пользователя

- validateAddress(data: Partial<UserData>): string | null - метод валидации input адреса
- validateContacts(data: Partial<UserData>): string | null - метод валидации input почты и телефона

- isAddressReady: boolean; - проверка готовности адреса
- isOrderReady: boolean; - проверка готовности заказа перед отвправкой на сервер
- order: Order; - геттер заказа

### Слой представления

Все классы представления отвечают за отображение внутри контейнера (DOM - элемент) передаваемых в них данных.

#### Класс отображения товара

Отвечает за создание отрисовки карточек товара в галерее, в модальном окне товара, в корзине

```
interface CardData {
	id: string; // id товара
	index: string; // позиция товара в корзине
	image: string; // изображение товара
    category: string; // категория товара
	title: string; // название товара
	description: string; // описание товара
	price: number; // цена товара
}

interface IViewCard {
	id: string; // геттер id для обращения к конкретному продукту в модели
	render(data?: Partial<CardData>): HTMLElement; // метод рендера разметки
}

interface IViewCardSettings {
	cardCatalogTemplate: string; // темплейт для карточки в галерее
	cardPreviewTemplate: string; // темплейт для карточки в модалке
	basketProductTemplate: string; // темплейт для карточки в корзине
    image: string; // контейнер для изображения
    category: string; // контейнер для категории
	title: string; // контейнер для названия
    description: string; // контейнер для описания
    price: string; // контейнер для цены
	isFull: boolean; // какой вид карточки отображать
	isCompact: boolean; // какой вид карточки отображать
	index: string; // контейнер для индекса в корзине
	buttonAddToBasket: string; // кнопка добавить в корзину
	buttonDelete: string; // кнопка удалить из корзины
	event: string; // событие которое происходит при клике на карточку/кнопку
}

interface IViewCardConstructor {
    new (settings: IViewCardSettings, events: IEvents): IViewCard
} // конструктор карточки
```

#### Класс главной страницы

Отвечает за отрисовку главной страницы, каталога товаров, кнопки корзины

```
interface PageData<C> {
	content: C; // отображаемый контент
	counter: number; // число в корзине
}

interface IViewPage {
	addContent(data: PageData<HTMLElement[]>): void; // добавление контента на страницу
	changeCounter(counter: number): void; // изменение счетчика корзины
}

interface IViewPageSettings {
	basket: string; // кнопка корзины
	counter: string; // контейнер счетчика корзины
	gallery: string; // контейнер для главного контента
	event: string; // событие которое происходит при клике на корзину
}
```

#### Класс модального окна

Отвечает за контент внутри, открытие и закрытие окна

```
interface IViewModal {
	content: HTMLElement; // сеттер контента
    open(): void; // метод открытия 
    close(): void; // метод закрытия
}

interface IViewModalSettings {
	buttonClose: string; // кнопка закрытия
	overlay: string; // оверлей
	content: string; // контейнер контента
	activeClass: string; // класс активного окна
}
```

#### Класс корзины

Отвечает за отображение модального окна корзины

```
interface BasketData {
	basketProducts: HTMLElement[]; // отображения карточек в корзине
	total: number; // сумма заказа
}

interface IViewBasket {
	disable(): void; // метод отключения кнопки
	enable(): void; // метод включения кнопки
	render(data?: BasketData): HTMLElement; // метод отрисовки корзины
}

interface IViewBasketSettings {
	template: string; // темплейт 
	itemContainer: string; // контейнер для карточке
	button: string; // кнопка оформления заказа
	price: string; // контейнер для суммы заказа
	event: string; // событие которое происходит при клике на кнопку
}
```

#### Класс отображения формы с способом оплаты и адресом

Отвечает за отображение модального окна с формой оплаты и адреса клиента

```
interface UserOrderInfoData {
    payment: string; // метод оплаты
    address: string; // адресс доставка
}

interface IViewUserOrderInfo {
	disable(): void; // метод отключения кнопки
	enable(): void; // метод включения кнопки
	controlButton(button: HTMLButtonElement): void; // метод контролирующий активацию кнопок оплаты
    activate(button: HTMLButtonElement): void; // метод активирования кнопки
    deactivate(button: HTMLButtonElement): void; // метод деактивирования кнопки
    setValue(data: UserOrderInfoData): void; // метод устанавливающий value в input
    getValue(): UserOrderInfoData; // метод получающий value из input
    clearValue(): void; // метод очищающий форму
    setMessage(data: string): void; // метод устанавливающий текст ошибки
    render(data?: UserOrderInfoData): HTMLElement; // метод рендера разметки
}

interface IViewUserOrderInfoSettings  {
    template: string; // темплейт
    paymentCard: string; // кнопка оплаты картой
    paymentCash: string; // кнопка оплаты наличными
    address: string; // input адреса
    messageErrorClass: string; // контейнер ошибки
	button: string; // кнопка submit
	eventSubmit: string; // событие которое происходит при submit формы
    eventInput: string; // событие которое происходит при изменении input
}
```

#### Класс отображения формы с почтой и номером

Отвечает за отображение модального окна с формой почты и номера клиента

```
interface UserContactsData {
	email: string; // почта клиента
	phone: string; // телефон клиента
}

interface IViewUserContacts {
	disable(): void; // метод отключения кнопки
	enable(): void; // метод включения кнопки
	setValue(data: UserContactsData): void; // метод устанавливающий value в input
	getValue(): UserContactsData; // метод получающий value из input
	clearValue(): void; // метод очищающий форму
	setMessage(data: string): void; // метод устанавливающий текст ошибки
	render(data?: UserContactsData): HTMLElement; // метод рендера разметки
}

interface IViewUserContactsSettings {
	template: string; // темплейт
	email: string; // input почты
	phone: string; // input телефона
	messageErrorClass: string; // контейнер ошибки
	button: string; // кнопка submit
	eventSubmit: string; // событие которое происходит при submit формы
    eventInput: string; // событие которое происходит при изменении input
}
```

#### Класс экрана модального окна успешной оплаты

Отвечает за отображение финального модального окна с подтверждением успешной оплаты и покупки

```

interface SuccessData {
	total: number; // сумма заказа
}

interface IViewSuccess {
	render(data: SuccessData): HTMLElement; // метод рендера разметки
}

interface IViewSuccessSettings {
	template: string; // темплейт
	description: string; // контейнер для описания
	button: string; // кнопка подтверждения
	event: string; // событие которое происходит при закрытии окна
}
```

### Слой коммуникации

#### Класс LarekAPI

Класс LarekAPI - дочерний класс базового класса api

```
interface ILarekAPI extends Api {
	getProductList: () => Promise<Product[]>;
	getProductItem: (id: string) => Promise<Product>;
	orderProducts: (order: Order) => Promise<OrderResult>;
}
```

## Взаимодействие компонентов

Связывание компонентов происходит при помощи презентера `Presenter.ts`.  
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий.  
В `index.ts` создаются экземпляры API, модели, главного экрана и модальных экранов, необходимые классы передаются в презентер для реализации логики событий и связывания модели данных и отображения.

События которые происходят в системе:

- 'modal:product' - открытие модального окна с товаром
- 'modal:basket' - открытие модального окна с корзиной
- 'modal:address' - открытие модального окна с адресом
- 'modal:contacts' - открытие модального окна с почтой и телефоном
- 'modal:success' - открытие модального окна с подтверждением

- 'change:product' - изменение списка товаров
- 'change:order' - изменение в заказе, данных клиента
- 'change:basket' - изменение в составе корзины
- 'change:addToBasket' - добавление товара в корзину
- 'change:removeFromBasket' - удаление товара из корзины
- 'change:inputAddress' - изменение в input адреса
- 'change:inputContacts' - изменение в input контактов













