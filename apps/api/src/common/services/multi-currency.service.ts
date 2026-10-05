import { Injectable } from '@nestjs/common';
import { CurrencyService } from './currency.service';

export interface MonetaryValue {
  amount: number;
  currency: string;
  baseUsdAmount?: number;
  exchangeRate?: number;
}

@Injectable()
export class MultiCurrencyService {
  constructor(private currencyService: CurrencyService) {}

  async normalizeToBaseCurrency(
    monetaryValue: MonetaryValue,
    baseCurrency: string = 'USD',
  ): Promise<MonetaryValue> {
    if (monetaryValue.currency === baseCurrency) {
      return {
        ...monetaryValue,
        baseUsdAmount: monetaryValue.amount,
        exchangeRate: 1,
      };
    }

    const conversion = await this.currencyService.convertAmount(
      monetaryValue.amount,
      monetaryValue.currency,
      baseCurrency,
    );

    return {
      amount: monetaryValue.amount,
      currency: monetaryValue.currency,
      baseUsdAmount: conversion.amount,
      exchangeRate: conversion.rate,
    };
  }

  async convertFromBaseCurrency(
    baseAmount: number,
    targetCurrency: string,
    baseCurrency: string = 'USD',
  ): Promise<MonetaryValue> {
    if (baseCurrency === targetCurrency) {
      return {
        amount: baseAmount,
        currency: targetCurrency,
        baseUsdAmount: baseAmount,
        exchangeRate: 1,
      };
    }

    const conversion = await this.currencyService.convertAmount(
      baseAmount,
      baseCurrency,
      targetCurrency,
    );

    return {
      amount: conversion.amount,
      currency: targetCurrency,
      baseUsdAmount: baseAmount,
      exchangeRate: conversion.rate,
    };
  }

  async sumMonetaryValues(
    values: MonetaryValue[],
    targetCurrency: string,
  ): Promise<MonetaryValue> {
    const normalizedValues = await Promise.all(
      values.map((v) => this.normalizeToBaseCurrency(v, targetCurrency)),
    );

    const totalBaseAmount = normalizedValues.reduce(
      (sum, v) => sum + (v.baseUsdAmount || 0),
      0,
    );

    return this.convertFromBaseCurrency(totalBaseAmount, targetCurrency);
  }

  formatMonetaryValue(monetaryValue: MonetaryValue, locale: string = 'en-US'): string {
    return this.currencyService.formatCurrency(
      monetaryValue.amount,
      monetaryValue.currency,
      locale,
    );
  }
}
