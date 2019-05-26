///Actions for proceeding network requests

export const FETCH_CURRENCIES_PENDING = 'FETCH_CURRENCIES_PENDING';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_ERROR = 'FETCH_CURRENCIES_ERROR';

export function fetchCurrenciesPending() {
    return {
        type: FETCH_CURRENCIES_PENDING
    }
}

export function fetchCurrenciesSuccess(currencies) {
    return {
        type: FETCH_CURRENCIES_SUCCESS,
        currencies: currencies
    }
}

export function fetchCurrenciesError(error) {
    return {
        type: FETCH_CURRENCIES_ERROR,
        error: error
    }
}


export const FETCH_MONTHLY_RATES_PENDING = 'FETCH_MONTHLY_RATES_PENDING';
export const FETCH_MONTHLY_RATES_SUCCESS = 'FETCH_MONTHLY_RATES_SUCCESS';
export const FETCH_MONTHLY_RATES_ERROR = 'FETCH_MONTHLY_RATES_ERROR';

export function fetchMonthlyRatesPending() {
    return {
        type: FETCH_MONTHLY_RATES_PENDING
    }
}

export function fetchMonthlyRatesSuccess(monthlyRates, currency) {
    return {
        type: FETCH_MONTHLY_RATES_SUCCESS,
        monthlyRates: monthlyRates,
        currency: currency
    }
}

export function fetchMonthlyRatesError(error) {
    return {
        type: FETCH_MONTHLY_RATES_ERROR,
        error: error
    }
}


