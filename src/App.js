import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Overview
      // ========
      purchasePrice: 89000,
      downPaymentPercent: 25,
      rehabCost: 0,

      // Debt Service
      // ============
      interestRate: 4.375,
      amortization: 30,

      // Gross Schedule Rents
      // ====================
      monthlyRent: 1050,
      vacancyPercent: 13,

      // Operating Expenses
      // ==================
      monthlyTaxes: 89,
      monthlyLandlordInsurance: 112,
      monthlyHoaFee: 0,
      monthlyUtilities: 0,
      monthlyLandscaping: 0,
      maintenanceFeePercentage: 13,
      managementFeePercentage: 8,

      // Net Operating Income
      // ====================
      yearsHeldToCalculateCashFlow: 15,

      // Return on Investment
      // ====================
      yearsOwned: 15,

      // Cash Reserves
      // =============
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
    // ---------------
    var currency = { style: 'currency', currency: 'USD', maximumFractionDigits: 0};

    // # Overview
    // ----------
    var downPayment = (this.state.purchasePrice * (this.state.downPaymentPercent / 100));

    var loanAmount = this.state.purchasePrice - downPayment;
    var closingCostPercentage = 0;
    if(loanAmount <= 75000) {
      closingCostPercentage = 7;
    }
    if(loanAmount > 75000 && loanAmount <= 87500) {
      closingCostPercentage = 6.5
    }
    if(loanAmount > 87500 && loanAmount <= 100000) {
      closingCostPercentage = 6;
    }
    if(loanAmount > 100000 && loanAmount <= 112500) {
      closingCostPercentage = 5.5;
    }
    if(loanAmount > 112500 && loanAmount <= 125000) {
      closingCostPercentage = 5;
    }
    if(loanAmount > 125000 && loanAmount <= 137500) {
      closingCostPercentage = 4.5
    }
    if(loanAmount > 137500 && loanAmount <= 300000) {
      closingCostPercentage = 4;
    }
    if(loanAmount > 300000) {
      closingCostPercentage = 3.5
    }

    var closingCost = loanAmount * (closingCostPercentage / 100);
    var investmentCapitalNeeded = downPayment + this.state.rehabCost + closingCost;

    // # Debt Service
    // --------------
    var i = this.state.interestRate / 12 / 100;
    var n = this.state.amortization * 12;

    var numerator = i * Math.pow(1 + i, n);
    var denominator = Math.pow(1 + i, n) - 1;
    var mortgagePayment = loanAmount * (numerator / denominator);

    // # Output
    // --------
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
          <h2>Overview</h2>
          <table>
            <tr>
              <td>Purchase Price</td>
              <td>{this.state.purchasePrice.toLocaleString('en-US', currency)}</td>
            </tr>
            <tr>
              <td>Down Payment</td>
              <td>{downPayment.toLocaleString('en-US', currency)}</td>
            </tr>
            <tr>
              <td>Closing Cost Percentage</td>
              <td>{closingCostPercentage}</td>
            </tr>
            <tr>
              <td>Rehab Cost</td>
              <td>{this.state.rehabCost.toLocaleString('en-US', currency)}</td>
            </tr>
            <tr>
              <td>Closing Costs</td>
              <td>{closingCost.toLocaleString('en-US', currency)}</td>
            </tr>
            <tr>
              <td><strong>Investment Capital Needed</strong></td>
              <td>{investmentCapitalNeeded.toLocaleString('en-US', currency)}</td>
            </tr>
          </table>

          <h2>Debt Service</h2>
          <table>
            <tr>
              <td>Loan Amount</td>
              <td>{loanAmount.toLocaleString('en-US', currency)}</td>
            </tr>
            <tr>
              <td>Interest Rate</td>
              <td>{this.state.interestRate}%</td>
            </tr>
            <tr>
              <td>Amortization</td>
              <td>{this.state.amortization}</td>
            </tr>
            <tr>
              <td>Mortgage Payment</td>
              <td>{mortgagePayment.toLocaleString('en-US', currency)}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
