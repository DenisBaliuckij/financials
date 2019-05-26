import {fetchMonthlyRatesPending, fetchMonthlyRatesSuccess, fetchMonthlyRatesError} from './actions';
import moment from 'moment'
///Getting monthly currency rates
function fetchMonthlyRates(currency) {
    var periodBeginning = moment().subtract(30,'d').format('YYYY-MM-DD');
    var periodEnding = moment().format('YYYY-MM-DD');
    return dispatch => {
        dispatch(fetchMonthlyRatesPending());
        fetch('https://api.coindesk.com/v1/bpi/historical/close.json?currency='+currency+'&startDate='+periodBeginning+'&endDate='+periodEnding)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchMonthlyRatesSuccess(res.bpi, currency));
            return res.bpi;
        })
        .catch(error => {
            dispatch(fetchMonthlyRatesError(error));
        })
    }
}

export default fetchMonthlyRates;
