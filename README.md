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

Форматированные данные товара, которые мы храним в корзине

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

События открытия и закрытия модальных окон

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

События изменений в модели данных

```
enum AppStateChanges {
	products = 'change:product',
	basket = 'change:basket',
	order = 'change:order',
}
```

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVC:  
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

##### Хранимые данные
- products: Map<Pick<Product, 'id'>, Product>; - массив товаров
- product: Product; - геттер 1 товара
- basket: Map<string, BasketProduct>; - массив товаров в корзине
- basketTotal: number; - общая сумма товаров в корзине
- userData: UserData; - вводимые данные пользователя
- isOrderReady: boolean; - проверка готовности заказа перед отвправкой на сервер

##### Пользовательские действия
- addProduct(id: string): void; - добавить товар в корзину
- removeProduct(id: string): void; - удалить товар из корзины
- fillUserData(contacts: Partial<UserData>): void; - заполнить поля персональных данных
- isValidUserData(): boolean; - валидация заполненных полей 

### Слой представления

Все классы представления отвечают за отображение внутри контейнера (DOM - элемент) передаваемых в них данных.

#### Базовый родительский класс View

Базовый класс который предоставляет свойство для хранения отображения и обязательный метод для отрисовки контента.

```
interface IView<T> {
	element: HTMLElement;
	render(data?: Partial<T>): HTMLElement;
}

```

#### Класс отображения товара

Отвечает за создание отрисовки карточек товара в галерее, в модальном окне товара, в корзине

```
interface CardData {
	id: string; // id товара
	image: string; // изображение товара
    category: string; // категория товара
	title: string; // название товара
	description: string; // описание товара
	price: number; // цена товара
}

interface IViewCard extends IView<CardData> {
	id: string; // геттер id для обращения к конкретному продукту в модели
}

interface IViewCardSettings {
	cardCatalogTemplate: string; // темплейт для основной карточки
	cardPreviewTemplate: string; // темплейт для карточки в модалке
	basketProductTemplate: string; // темплейт для карточки в корзине
    image: string; // контейнер для изображения
    category: string; // контейнер для категории
	title: string; // контейнер для названия
    description: string; // контейнер для описания
    price: string; // контейнер для цены
	fullClass: string; // класс для отображения карточки в модалке
	compactClass: string; // класс для отображения карточки в корзине
	isFull: boolean; // какой вид карточки отображать
	isCompact: boolean; // какой вид карточки отображать
	index: string; // контейнер для
	addBusket: string; // кнопка добавить в корзину
	delete: string; // кнопка удалить из корзины
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

interface IViewPage extends IView<PageData<IViewCard[]>> {

}

interface IViewPageSettings {
	basket: string; // кнопка корзины
	counter: string; // контейнер счетчика корзины
	gallery: string; // контейнер для главного контента
}
```

#### Класс модального окна

Отвечает за контент внутри, открытие и закрытие окна

```
interface IViewModal {
	content: HTMLElement;
    open(): void;
    close(): void;
}

interface ModalSettings {
	close: string; // кнопка закрытия
	overlay: string; // оверлей для закрытия
	content: string; // контейнер контента
	activeClass: string; // класс активного окна
}
```

#### Класс экрана корзины

Отвечает за отображение модального окна корзины

```
interface BasketData {
	basketProducts: CardData[]; // данные карточек в корзине
	total: string; // сумма заказа
}

interface IViewBusket extends IView<BasketData> {
	disable(): void; // метод отключения кнопки
}

interface BasketSettings {
	template: string; // темплейт 
	itemContainer: string; // контейнер для карточке
	button: string; // кнопка оформления заказа
	price: string; // контейнер для суммы заказа
}

interface IViewBusketConstructor {
	new (settings: BasketSettings, events: IEvents): IViewBusket
} // конструктор корзины
```

#### Класс отображения формы с способом оплаты и адресом

Отвечает за отображение модального окна с формой оплаты и адреса клиента

```
interface UserOrderInfoData {
    payment: string; // метод оплаты
    address: string; // адресс доставка
}

interface IViewUserOrderInfo extends IView<UserOrderInfoData> {
    setValue(data: UserOrderInfoData): void; // метод устанавливающий value в input
    getValue(): UserOrderInfoData; // метод получающий value из input
    clearValue(): void; // метод очищающий форму
    disable(): void; // метод отключения кнопки
}

interface IViewUserOrderInfoSettings  {
    template: string; // темплейт
    form: string; // форма
    paymentCard: string; // кнопка оплаты картой
    paymentCash: string; // кнопка оплаты наличными
    address: string; // input адреса
    messageErrorClass: string; // контейнер ошибки
}

interface IViewUserOrderInfoConstructor {
    new (settings: IViewUserOrderInfoSettings, events: IEvents): IViewUserOrderInfo
} // конструктор формы оплаты и адреса клиента
```

#### Класс отображения формы с почтой и номером

Отвечает за отображение модального окна с формой почты и номера клиента

```
interface UserContactsData {
	email: string; // почта клиента
	phone: string; // телефон клиента
}

interface IViewUserContacts extends IView<UserContactsData> {
	setValue(data: UserContactsData): void; // метод устанавливающий value в input
	getValue(): UserContactsData; // метод получающий value из input
	clearValue(): void; // метод очищающий форму
	disable(): void; // метод отключения кнопки
}

interface IViewUserContactsSettings {
	template: string; // темплейт
	form: string; // форма
	email: string; // input почты
	phone: string; // input телефона
	messageErrorClass: string; // контейнер ошибки
}

interface IViewUserContactsConstructor {
	new (settings: IViewUserContactsSettings, events: IEvents): IViewUserContacts
} // конструктор формы почты и номера клиента
```

#### Класс экрана модального окна успешной оплаты

Отвечает за отображение финального модального окна с подтверждением успешной оплаты и покупки

```

interface SuccessData {
	total: string; // сумма заказа
}

interface IVIewSuccess extends IView<SuccessData> {

}

interface SuccessSettings {
	template: string; // темплейт
	description: string; // контейнер для описания
	button: string; // кнопка подтверждения
}

interface IVIewSuccessConstructor {
	new (settings: SuccessSettings, events: IEvents): IVIewSuccess
} // конструктор модального окна успешной оплаты
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

Связывание компонентов происходит при помощи презентера.  
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий.
В `index.ts` создаются экземпляры API, модели, главного экрана и модальных экранов, необходимые классы передаются в презентер для реализации логики событий и связывания модели данных и отображения.

События которые происходят в системе:

- product = 'modal:product' - открытие модального окна с товаром
- basket = 'modal:basket' - открытие модального окна с корзиной
- address = 'modal:address' - открытие модального окна с адресом
- contacts = 'modal:contacts' - открытие модального окна с почтой и телефоном
- success = 'modal:success' - открытие модального окна с подтверждением
- none = 'modal:none' - никакое модальное окно не открыто (закрытие окна)

- 'change:product' - изменение списка товаров
- 'change:basket' - изменение в составе корзины
- 'change:order' - изменение в заказе, данных клиента












