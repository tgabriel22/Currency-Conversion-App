import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Conversion from "../views/Conversion.vue";

const routes = [
  {
    path: "/", // Маршрут для главной страницы
    name: "Home", // Имя маршрута
    component: Home, // Компонент, который будет отображаться при переходе по этому маршруту
  },
  {
    path: "/convert", // Маршрут для страницы конверсии валют
    name: "Conversion", // Имя маршрута
    component: Conversion, // Компонент, который будет отображаться на странице конверсии
  },
];

const router = createRouter({
  // Используем историю браузера для навигации
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Передаем массив маршрутов
});

export default router;
