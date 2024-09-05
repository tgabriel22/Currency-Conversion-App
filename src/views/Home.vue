<template>
  <div class="homePage">
    <!-- Компонент HeaderComponent для выбора основной валюты, передаем текущую валюту как пропс -->
    <!-- Обработка события изменения валюты с помощью метода updateCurrency -->
    <HeaderComponent
      :selectedCurrency="primaryCurrency"
      @currency-changed="updateCurrency"
    />
    <div v-if="exchangeRates" class="exchange-rates">
      <!-- Отображение курсов валют для выбранной основной валюты -->
      <h3>Exchange Rates for {{ primaryCurrency }}</h3>
      <!-- Курсы для RUB: отображаем USD и EUR в рублях -->
      <p v-if="primaryCurrency === 'RUB'">
        1 USD = {{ exchangeRates["usd-rub"].toFixed(2) }} RUB
      </p>
      <p v-if="primaryCurrency === 'RUB'">
        1 EUR = {{ exchangeRates["eur-rub"].toFixed(2) }} RUB
      </p>

      <!-- Курсы для USD: отображаем RUB и EUR в долларах -->
      <p v-if="primaryCurrency === 'USD'">
        1 RUB = {{ exchangeRates["rub-usd"].toFixed(2) }} USD
      </p>
      <p v-if="primaryCurrency === 'USD'">
        1 EUR = {{ exchangeRates["eur-usd"].toFixed(2) }} USD
      </p>

      <!-- Курсы для EUR: отображаем USD и RUB в евро -->
      <p v-if="primaryCurrency === 'EUR'">
        1 USD = {{ exchangeRates["usd-eur"].toFixed(2) }} EUR
      </p>
      <p v-if="primaryCurrency === 'EUR'">
        1 RUB = {{ exchangeRates["rub-eur"].toFixed(2) }} EUR
      </p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      primaryCurrency: "RUB", // Основная валюта по умолчанию (рубли)
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
    },

    // Метод для обновления основной валюты при изменении
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

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
}
.exchange-rates {
  border-radius: 5%;
  font-size: 1.5rem;
  max-width: 90%;
  height: 200px;
  align-content: center;
  background-color: rgb(234, 235, 241);
  box-sizing: border-box;
}
h3 {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
  .exchange-rates {
    /* max-width: 80%; */
    font-size: 1.2rem;
  }
}
</style>
