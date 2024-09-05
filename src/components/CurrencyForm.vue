<template>
  <div v-if="exchangeRates">
    <div class="conversion-row">
      <!-- <label for="from-currency"></label> -->
      <select
        id="from-currency"
        v-model="fromCurrency"
        @change="convertCurrencyFromAmount"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
      <input
        class="from-currency"
        type="number"
        v-model.number="fromAmount"
        @input="convertCurrencyFromAmount"
        placeholder="Amount"
      />
    </div>

    <div class="conversion-row">
      <!-- <label for="to-currency">To:</label> -->
      <select
        id="to-currency"
        v-model="toCurrency"
        @change="convertCurrencyToAmount"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="RUB">RUB</option>
      </select>
      <input
        type="number"
        v-model.number="toAmount"
        @input="convertCurrencyToAmount"
        placeholder="Converted Amount"
      />
    </div>
  </div>
  <div v-else>
    <p>Loading exchange rates...</p>
  </div>
</template>

<script>
export default {
  name: "CurrencyForm",
  props: {
    exchangeRates: Object, // Принимаем объект exchangeRates как пропс от родительского компонента
  },
  data() {
    return {
      fromCurrency: "USD", // Валюта по умолчанию для исходной конверсии
      toCurrency: "RUB", // Валюта по умолчанию для конверсии в
      fromAmount: 1, // Входное значение по умолчанию
      toAmount: 93.37, // Конвертированная сумма по умолчанию
    };
  },
  methods: {
    // Логика конверсии для "fromAmount" (верхнее поле ввода)
    convertCurrencyFromAmount() {
      if (this.exchangeRates) {
        const conversionKey = `${this.fromCurrency.toLowerCase()}-${this.toCurrency.toLowerCase()}`;
        const reverseConversionKey = `${this.toCurrency.toLowerCase()}-${this.fromCurrency.toLowerCase()}`;
        // Проверяем, существует ли курс для прямого или обратного конверсии
        if (this.exchangeRates[conversionKey]) {
          this.toAmount = (
            this.fromAmount * this.exchangeRates[conversionKey]
          ).toFixed(2); // Рассчитываем сумму и округляем до 2 знаков после запятой
        } else if (this.exchangeRates[reverseConversionKey]) {
          this.toAmount = (
            this.fromAmount / this.exchangeRates[reverseConversionKey]
          ).toFixed(2);
        }
      }
    },
    // Логика конверсии для "toAmount" (нижнее поле ввода)
    convertCurrencyToAmount() {
      if (this.exchangeRates) {
        const conversionKey = `${this.toCurrency.toLowerCase()}-${this.fromCurrency.toLowerCase()}`;
        const reverseConversionKey = `${this.fromCurrency.toLowerCase()}-${this.toCurrency.toLowerCase()}`;

        if (this.exchangeRates[conversionKey]) {
          this.fromAmount = (
            this.toAmount * this.exchangeRates[conversionKey]
          ).toFixed(2);
        } else if (this.exchangeRates[reverseConversionKey]) {
          this.fromAmount = (
            this.toAmount / this.exchangeRates[reverseConversionKey]
          ).toFixed(2);
        }
      }
    },
  },
  mounted() {
    // Выполняем конверсию при монтировании компонента
    this.convertCurrencyFromAmount();
  },
};
</script>

<style scoped>
.conversion-row {
  margin: 2px;
  height: fit-content;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  justify-content: center;
}
#from-currency,
#to-currency {
  height: 29px;
  border-radius: 0;
  margin: 0 2px 2px 0;
}
input {
  height: 30px;
  padding-left: 15px;
  font-size: large;
  font-weight: bold;
  width: 200px;
}
@media (max-width: 600px) {
  .conversion-row {
    height: fit-content;
  }
  #from-currency,
  #to-currency {
    height: 38px;
  }
  input {
    height: 38px;
    width: 70%;
  }
}
</style>
