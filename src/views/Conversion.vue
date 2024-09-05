<template>
  <div>
    <!-- Компонент HeaderComponent для выбора основной валюты, передаем текущую валюту как пропс -->
    <!-- Обработка события изменения валюты с помощью метода updateCurrency -->
    <HeaderComponent
      :selectedCurrency="primaryCurrency"
      @currency-changed="updateCurrency"
    />
    <!-- Компонент CurrencyForm для отображения формы конверсии валют, передаем курсы валют как пропс -->
    <CurrencyForm :exchangeRates="exchangeRates" class="currencyform" />
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import CurrencyForm from "../components/CurrencyForm.vue";
import axios from "axios";

export default {
  name: "Conversion",
  components: {
    HeaderComponent,
    CurrencyForm,
  },
  data() {
    return {
      primaryCurrency: "USD", // Основная валюта по умолчанию
      exchangeRates: null, // Данные о курсах валют
    };
  },
  methods: {
    // Метод для получения данных о курсах валют с сервера
    fetchRates() {
      axios
        .get("https://status.neuralgeneration.com/api/currency")
        .then((response) => {
          this.exchangeRates = response.data; // Присваиваем полученные данные переменной exchangeRates
        })
        .catch((error) => {
          console.log(error); // Логируем ошибку в случае неудачи
        });
    }, // Метод для обновления основной валюты при изменении
    updateCurrency(newCurrency) {
      this.primaryCurrency = newCurrency; // Обновляем значение основной валюты
    },
  },
  mounted() {
    // Вызываем метод получения курсов валют при монтировании компонента
    this.fetchRates();
  },
};
</script>

<style>
.currencyform {
  margin-top: 130px;
}
</style>
