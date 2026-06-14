import "./scss/styles.scss";

import { Catalog } from "./components/models/Catalog.ts";
import { Cart } from "./components/models/Cart.ts";
import { Buyer } from "./components/models/Buyer.ts";

import { apiProducts } from "./utils/data.ts";
import { ApiData } from "./components/ApiData.ts";
import { Api } from "./components/base/Api.ts";
import { API_URL } from "./utils/constants.ts";

import { IApi, IResponseData } from "./types/index.ts";

console.log("Тестируем модель каталога товаров");
const catalogModel = new Catalog();

catalogModel.setProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", catalogModel.getProducts());
console.log("Товар по id: ", catalogModel.getProduct(apiProducts.items[2].id));
catalogModel.setCard(apiProducts.items[0]);
console.log("Выбранная карточка товара: ", catalogModel.getCard());

console.log("Тестируем модель корзины товаров");
const cartModel = new Cart();

cartModel.addCartProduct(apiProducts.items[0]);
cartModel.addCartProduct(apiProducts.items[1]);
cartModel.addCartProduct(apiProducts.items[3]);
console.log("Массив товаров из корзины: ", [...cartModel.getCartProducts()]);
console.log("Сумма товаров из корзины: ", cartModel.getTotal());
console.log("Количество товаров в корзине: ", cartModel.getCount());
console.log(
  "В корзину добавлен товар с id: ",
  cartModel.hasProduct(apiProducts.items[1].id),
);
cartModel.deleteCartProduct(apiProducts.items[3]);
console.log("Массив товаров из корзины после удаления: ", [
  ...cartModel.getCartProducts(),
]);
cartModel.removeCart();
console.log("Массив товаров из корзины после очищения: ", [
  ...cartModel.getCartProducts(),
]);

console.log("Тестируем модель покупателя");
const buyerModel = new Buyer();

console.log("Параметры покупки: ", buyerModel.getBuyerData());
buyerModel.setPayment("online");
buyerModel.setAddress("улица Пушкина, дом Колотушкина");
buyerModel.setEmail("example@yandex.ru");
buyerModel.setPhone("89012345678");
console.log("Параметры покупки после заполнения: ", buyerModel.getBuyerData());
console.log("Результат валидации: ", buyerModel.validateData());
buyerModel.removeBuyerData();
console.log(
  "Результат валидации после очистки данных: ",
  buyerModel.validateData(),
);

console.log("Получаем данные с сервера");
const catalog = new Catalog();

async function init(): Promise<void> {
  const api: IApi = new Api(API_URL);
  const apiData = new ApiData(api);
  const response: IResponseData = await apiData.getData();

  console.log("Данные полученные с сервера: ", response);

  catalog.setProducts(response.items);

  console.log("Массив товаров с сервера: ", catalog.getProducts());
  console.log(
    "Товар по id с сервера: ",
    catalog.getProduct(response.items[0].id),
  );
}

init().catch(console.error);