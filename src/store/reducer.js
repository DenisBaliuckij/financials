///Reducer for wirking with the store
import {FETCH_CURRENCIES_PENDING, FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_ERROR, FETCH_MONTHLY_RATES_SUCCESS, FETCH_MONTHLY_RATES_PENDING, FETCH_MONTHLY_RATES_ERROR} from './actions';

const initialState = {
    pending: false,
    currencies: [],
    monthlyRates: [],
    error: null
}

export function currenciesReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_CURRENCIES_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_CURRENCIES_SUCCESS:
            return {
                ...state,
                pending: false,
                currencies: action.currencies
            }
        case FETCH_CURRENCIES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case FETCH_MONTHLY_RATES_PENDING:
            return {
                ...state,
                pending: true,
            }
        case FETCH_MONTHLY_RATES_SUCCESS:
            return {
                ...state,
                pending: false,
                monthlyRates: {currency:action.currency, rates:action.monthlyRates}
            }
        case FETCH_MONTHLY_RATES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getCurrencies = state => state.currencies;
export const getCurrenciesPending = state => state.pending;
export const getCurrenciesError = state => state.error;
export const getCurrenciesMonthlyRates = state => state.monthlyRates;