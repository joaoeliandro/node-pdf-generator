import areIntlLocalesSupported from 'intl-locales-supported';

const localesMyAppSupports = [
  'pt-BR'
];

if (global.Intl) {
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    const IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  global.Intl = require('intl');
}

export function formatPrice(price: any): string {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}