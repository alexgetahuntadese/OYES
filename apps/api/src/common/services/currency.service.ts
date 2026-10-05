import { Injectable } from '@nestjs/common';

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: Date;
}

@Injectable()
export class CurrencyService {
  private exchangeRates: Map<string, ExchangeRate> = new Map();

  constructor() {
    this.initializeDefaultRates();
  }

  private initializeDefaultRates() {
    const defaultRates: ExchangeRate[] = [
      { fromCurrency: 'USD', toCurrency: 'ETB', rate: 56.5, lastUpdated: new Date() },
      { fromCurrency: 'USD', toCurrency: 'KES', rate: 153.2, lastUpdated: new Date() },
      { fromCurrency: 'USD', toCurrency: 'EUR', rate: 0.92, lastUpdated: new Date() },
      { fromCurrency: 'USD', toCurrency: 'GBP', rate: 0.79, lastUpdated: new Date() },
      { fromCurrency: 'ETB', toCurrency: 'USD', rate: 0.0177, lastUpdated: new Date() },
      { fromCurrency: 'KES', toCurrency: 'USD', rate: 0.0065, lastUpdated: new Date() },
      { fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.09, lastUpdated: new Date() },
      { fromCurrency: 'GBP', toCurrency: 'USD', rate: 1.27, lastUpdated: new Date() },
    ];

    defaultRates.forEach((rate) => {
      const key = `${rate.fromCurrency}_${rate.toCurrency}`;
      this.exchangeRates.set(key, rate);
    });
  }

  async convertAmount(
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ): Promise<{ amount: number; rate: number; fromCurrency: string; toCurrency: string }> {
    if (fromCurrency === toCurrency) {
      return { amount, rate: 1, fromCurrency, toCurrency };
    }

    const key = `${fromCurrency}_${toCurrency}`;
    const rate = this.exchangeRates.get(key);

    if (!rate) {
      throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
    }

    const convertedAmount = amount * rate.rate;

    return {
      amount: Math.round(convertedAmount * 100) / 100,
      rate: rate.rate,
      fromCurrency,
      toCurrency,
    };
  }

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<ExchangeRate> {
    const key = `${fromCurrency}_${toCurrency}`;
    const rate = this.exchangeRates.get(key);

    if (!rate) {
      throw new Error(`Exchange rate not available for ${fromCurrency} to ${toCurrency}`);
    }

    return rate;
  }

  async updateExchangeRate(rate: ExchangeRate): Promise<void> {
    const key = `${rate.fromCurrency}_${rate.toCurrency}`;
    this.exchangeRates.set(key, {
      ...rate,
      lastUpdated: new Date(),
    });
  }

  async getAllExchangeRates(): Promise<ExchangeRate[]> {
    return Array.from(this.exchangeRates.values());
  }

  formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }
}
