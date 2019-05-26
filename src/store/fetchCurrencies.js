import {fetchCurrenciesPending, fetchCurrenciesSuccess, fetchCurrenciesError} from './actions';
///Getting available currencies
function fetchCurrencies() {
    return dispatch => {
        dispatch(fetchCurrenciesPending());
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCurrenciesSuccess(res.bpi));
            return res.bpi;
        })
        .catch(error => {
            dispatch(fetchCurrenciesError(error));
        })
    }
}

export default fetchCurrencies;
