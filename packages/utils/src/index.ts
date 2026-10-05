export function generateBeneficiaryCode(
  countryCode: string,
  officeCode: string,
  year: number,
  sequence: number,
): string {
  const paddedSequence = sequence.toString().padStart(4, '0');
  return `${countryCode}-${officeCode}-${year}-${paddedSequence}`;
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: Record<string, number>,
): number {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = exchangeRates[fromCurrency] || 1;
  const toRate = exchangeRates[toCurrency] || 1;
  
  return (amount / fromRate) * toRate;
}

export function formatDate(date: Date, locale: string = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function hashPassword(password: string): string {
  // This is a placeholder - actual implementation should use bcrypt in the backend
  return password;
}

export function comparePassword(password: string, hash: string): boolean {
  // This is a placeholder - actual implementation should use bcrypt in the backend
  return password === hash;
}
