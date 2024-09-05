<template>
  <header>
    <nav>
      <!-- Ссылки на страницы маршрутизации с помощью router-link -->
      <router-link to="/">Home</router-link> |
      <router-link to="/convert">Conversion</router-link>
    </nav>
    <label for="currency-select">Primary Currency: </label>
    <!-- Выпадающий список для выбора основной валюты -->
    <select
      id="currency-select"
      :value="selectedCurrency"
      @change="onCurrencyChange"
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    // Пропс для передачи выбранной валюты от родителя
    selectedCurrency: {
      type: String,
      required: true,
    },
  },
  methods: {
    // Метод для обработки изменения валюты
    onCurrencyChange(event) {
      // Вызываем событие "currency-changed" с новым значением валюты
      this.$emit("currency-changed", event.target.value);
    },
  },
};
</script>

<style scoped>
header {
  margin-top: 15px;
  font-size: 1.5rem;
  width: 100%;
}
</style>
