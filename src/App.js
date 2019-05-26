import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchCurrenciesAction from './store/fetchCurrencies';
import fetchMonthlyRatesAction from './store/fetchMonthlyRates'
import {getCurrenciesError, getCurrencies, getCurrenciesPending, getCurrenciesMonthlyRates} from './store/reducer';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.state = {
      enteredCurrency:""
    }
  }

  componentWillMount() {
    const {fetchCurrencies} = this.props;
    fetchCurrencies();
  }


  handleInputChange(e){
      this.setState({
        enteredCurrency:e.target.value
      })
  }

  currencyItems(){
    if(this.props.currencies!==undefined){
      return Object.keys(this.props.currencies).map((currency) =>
        <option key={this.props.currencies[currency].code}>{this.props.currencies[currency].symbol} {this.props.currencies[currency].code}</option>
     );

    }
    return null;
  }

  autocomplete(){
    if(this.props.currencies!==undefined){
      return Object.keys(this.props.currencies).map((currency) =>
        {
          if(currency.toLowerCase().indexOf(this.state.enteredCurrency.toLowerCase())!==-1){
            return (<table><tr><td class="currency-item" onClick={(e) => {this.loadCurrency(currency)}}>{currency}</td></tr></table>)
          }
          return null
        }
     );

    }
    return null;
  }
  shouldComponentRender(){

  }
  loadCurrency(currency){
    const {fetchMonthlyRates} = this.props;
    this.setState({selectedCurrency:currency})
    fetchMonthlyRates(currency);
  }

  clearRates(){
    this.setState({selectedCurrency:undefined})
  }
  displayMonthlyRates(){
    if(this.props.monthlyRates!==undefined && this.state.selectedCurrency!==undefined){
      return (<div class="centered"><br/><br/><h2>The value of Bitcoin in {this.props.monthlyRates.currency} for the last month</h2><table class="table">{Object.entries(this.props.monthlyRates.rates).map(([key,value]) => {
        return (<tr><td class="date">{key}</td><td class="value">{value}</td></tr>);
      })}</table><button class="clear-rates-button" onClick={(e)=>{this.clearRates()}}>Clear rates</button></div>)
    }
  }

  displayCurrentRate(){
    if(this.props.currencies!==undefined && this.state.selectedCurrency!==undefined){
      return Object.keys(this.props.currencies).map((currency) =>
        {
          if(currency.toLowerCase() === this.state.selectedCurrency.toLowerCase()){
            return (<div>Selected currency: {currency}<br/>
            Bitcoin current rate for selected currency: {this.props.currencies[currency].rate}</div>)
          }
          return null
        }
     )
  }
}
displaySpinner(){
  if(this.props.pending){
    return (<div class="spinner"></div>)
  }
}
  render() {
    return (
    <div className="App">
    <header className="App-header">
      <input type="text" class="currency-box" placeholder="Search the currency..." onChange={(e)=>{this.handleInputChange(e)}} value={this.state.enteredCurrency}/>
      <br/>
      Currencies available (Click in order to load the rates):
      {this.autocomplete()}
      <br/>
      <br/>
      {this.displayCurrentRate()}
      {this.displayMonthlyRates()}
      {this.displaySpinner()}
      </header>
  </div>)
  }
}

const mapStateToProps = state => ({
  error: getCurrenciesError(state),
  currencies: getCurrencies(state),
  pending: getCurrenciesPending(state),
  monthlyRates: getCurrenciesMonthlyRates(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCurrencies: fetchCurrenciesAction,
  fetchMonthlyRates: fetchMonthlyRatesAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);