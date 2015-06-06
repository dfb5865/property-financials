import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // overview
      purchasePrice: 89000,
      downPaymentPercent: 20,
      rehabCost: 0,

      // debt service
      interestRate: 4.375,
      amortization: 30,

      // gross schedule rents
      monthlyRent: 1050,
      vacancyPercent: 13,

      // operating expenses
      monthlyTaxes: 89,
      monthlyLandlordInsurance: 112,
      monthlyHoaFee: 0,
      monthlyUtilities: 0,
      monthlyLandscaping: 0,
      maintenanceFeePercentage: 13,
      managementFeePercentage: 8,

      // net operating income
      yearsHeldToCalculateCashFlow: 15,

      // return on investment
      yearsOwned: 15,

      // cash reserves
      monthsOfCashReserves: 6
    };
  }

  handleChange(event) {
    var state = {};
    state[event.target.id] = parseInt(event.target.value, 10) || 0;
    this.setState(state);
  }

  render() {
    // # Configuration
    var currency = { style: 'currency', currency: 'USD' };

    // # Overview
    var downPayment = (this.state.purchasePrice * (this.state.downPaymentPercent / 100));

    var purchasePrice = this.state.purchasePrice;
    var closingCostPercentage = 0;
    if(purchasePrice <= 75000) {
      closingCostPercentage = 7;
    }
    if(purchasePrice > 75000 && purchasePrice <= 87500) {
      console.log(1);
      closingCostPercentage = 6.5
    }
    if(purchasePrice > 87500 && purchasePrice <= 100000) {
      console.log(2);
      closingCostPercentage = 6;
    }
    if(purchasePrice > 100000 && purchasePrice <= 112500) {
      console.log(3);
      closingCostPercentage = 5.5;
    }
    if(purchasePrice > 112500 && purchasePrice <= 125000) {
      console.log(4);
      closingCostPercentage = 5;
    }
    if(purchasePrice > 125000 && purchasePrice <= 137500) {
      console.log(5);
      closingCostPercentage = 4.5
    }
    if(purchasePrice > 137500 && purchasePrice <= 300000) {
      console.log(6);
      closingCostPercentage = 4;
    }
    if(purchasePrice > 300000) {
      console.log(7);
      closingCostPercentage = 3.5
    }

    var loanAmount = this.state.purchasePrice - downPayment;
    var closingCost = loanAmount * (closingCostPercentage / 100);

    var investmentCapitalNeeded = downPayment + this.state.rehabCost + closingCost;

    return (
      <div className="table">
        <div className="table-cell">
          <form>
            <div>
              <label htmlFor="purchasePrice">Purchase Price</label>
              <input id="purchasePrice" type="number" onChange={this.handleChange.bind(this).bind(this)} value={this.state.purchasePrice} min="0" />
            </div>

            <div>
              <label htmlFor="downPaymentPercent">Down Payment</label>
              <input id="downPaymentPercent" type="number" onChange={this.handleChange.bind(this)} value={this.state.downPaymentPercent} min="0"/>%
            </div>

            <div>
              <label htmlFor="rehabCost">Rehab Cost</label>
              <input id="rehabCost" type="number" onChange={this.handleChange.bind(this)} value={this.state.rehabCost} min="0"/>
            </div>

            <div>
              <label htmlFor="interestRate">Interest Rate</label>
              <input id="interestRate" type="number" onChange={this.handleChange.bind(this)} value={this.state.interestRate} min="0"/>
            </div>

            <div>
              <label htmlFor="amortization">Amortization</label>
              <input id="amortization" type="number" onChange={this.handleChange.bind(this)} value={this.state.amortization} min="0"/>
            </div>

            <hr />

            <div>
              <label htmlFor="monthlyRent">Monthly Rent</label>
              <input id="monthlyRent" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyRent} min="0"/>
            </div>

            <div>
              <label htmlFor="monthlyTaxes">Monthly Taxes</label>
              <input id="monthlyTaxes" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyTaxes} min="0"/>
            </div>

            <div>
              <label htmlFor="monthlyLandlordInsurance">Monthly Landlord Insurance</label>
              <input id="monthlyLandlordInsurance" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyLandlordInsurance} min="0"/>
            </div>

            <div>
              <label htmlFor="monthlyHoaFee">Monthly HOA Fee</label>
              <input id="monthlyHoaFee" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyHoaFee} min="0"/>
            </div>

            <div>
              <label htmlFor="monthlyUtilities">Monthly Utilities</label>
              <input id="monthlyUtilities" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyUtilities} min="0"/>
            </div>

            <div>
              <label htmlFor="monthlyLandscaping">Monthly Landscaping</label>
              <input id="monthlyLandscaping" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyLandscaping} min="0"/>
            </div>

            <hr />

            <div>
              <label htmlFor="yearsOwned">Years of Ownership</label>
              <input id="yearsOwned" type="number" onChange={this.handleChange.bind(this)} value={this.state.yearsOwned} min="0"/>
            </div>

            <hr />

            <div>
              <label htmlFor="monthsOfCashReserves">Months of Cash Reserves</label>
              <input id="monthsOfCashReserves" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthsOfCashReserves} min="0"/>
            </div>
          </form>
        </div>
        <div className="table-cell">
          <form>
            <h2>Overview</h2>
            <div>
              <label>Purchase Price</label>
              <input type="text" value={this.state.purchasePrice.toLocaleString('en-US', currency)} disabled/>
            </div>
            <div>
              <label>Down Payment</label>
              <input type="text" value={downPayment.toLocaleString('en-US', currency)} disabled/>
            </div>
            <div>
              <label>Loan Amount</label>
              <input type="text" value={loanAmount.toLocaleString('en-US', currency)} disabled/>
            </div>
            <div>
              <label>Rehab Cost</label>
              <input type="text" value={this.state.rehabCost.toLocaleString('en-US', currency)} disabled/>
            </div>
            <div>
              <label>Closing Cost</label>
              <input type="text" value={closingCost.toLocaleString('en-US', currency)} disabled/>
            </div>
            <div>
              <label><strong>Investment Capital Needed</strong></label>
              <input type="text" value={investmentCapitalNeeded.toLocaleString('en-US', currency)} disabled/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
