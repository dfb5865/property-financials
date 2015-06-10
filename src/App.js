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
      monthlyLandlordInsurance: 111.58,
      monthlyHoaFee: 0,
      monthlyUtilities: 0,
      monthlyLandscaping: 0,
      maintenancePercentage: 13,
      managementFeePercentage: 8,
      propertyManagementLeasingFee: 50, // n% of 1 months rent

      // Net Operating Income
      // ====================
      yearsHeldToCalculateCashFlow: 15,

      // Return on Investment
      // ====================
      annualAppreciation: 4,
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
    var monthlyMortgagePayment = loanAmount * (numerator / denominator);

    // # Gross Schedule Rents
    // ----------------------
    var monthlyVacancy = this.state.monthlyRent * (this.state.vacancyPercent / 100);
    var effectiveGrossIncome = this.state.monthlyRent - monthlyVacancy;

    // # Operating Expenses
    // --------------------
    var monthlyMaintenance = this.state.monthlyRent * (this.state.maintenancePercentage / 100);
    var managementFee = (this.state.monthlyRent - monthlyVacancy) * (this.state.managementFeePercentage / 100);
    var leasingFee = (this.state.monthlyRent / 18) * (this.state.propertyManagementLeasingFee / 100);
    var totalMonthlyExpenses = this.state.monthlyTaxes + this.state.monthlyLandlordInsurance + monthlyMaintenance + managementFee + leasingFee + this.state.monthlyHoaFee + this.state.monthlyUtilities + this.state.monthlyLandscaping;

    // # Net Operating Income
    // ----------------------
    var cashFlowBeforeMortage = effectiveGrossIncome - monthlyMortgagePayment - totalMonthlyExpenses;
    var cashFlowAfterMortgage = effectiveGrossIncome - totalMonthlyExpenses;

    // # Return On Investment
    // ----------------------
    // accumulatedCashFlow
    var newConstuction = 0;
    var underMortgage = (cashFlowBeforeMortage * 12) * this.state.yearsOwned;
    if(this.state.yearsOwned > this.state.amortization) {
      underMortgage = (cashFlowBeforeMortage * 12) * this.state.amortization;
    }
    var paidOff = (cashFlowAfterMortgage * 12) * (this.state.yearsOwned - this.state.amortization);
    if(paidOff < 0) {
      paidOff = 0;
    }
    var accumulatedCashFlow = newConstuction + underMortgage + paidOff;

    // appreciation
    var appreciation = this.state.purchasePrice * (this.state.annualAppreciation / 100) * this.state.yearsOwned;

    // principalPaydown
    var interestRateForPaydown = this.state.interestRate / 12 / 100;
    var length = Math.min(this.state.yearsOwned, this.state.amortization);
    var principalPaydown = (loanAmount - (monthlyMortgagePayment / interestRateForPaydown)) * (1 - Math.pow(1 + interestRateForPaydown, length * 12));

    // sellingExpenses
    var sellingExpenses = 0.09 * (this.state.purchasePrice + appreciation);

    // totalProjectedProfit
    var totalProjectedProfit = accumulatedCashFlow + appreciation + principalPaydown - sellingExpenses;

    // annualCashOnCashReturn
    var annualCashOnCashReturn = 100 * (accumulatedCashFlow / investmentCapitalNeeded / this.state.yearsOwned);

    // annualReturnOnInvestment
    var annualReturnOnInvestment = 100 * (totalProjectedProfit / investmentCapitalNeeded / this.state.yearsOwned);

    // # Tax Benefits
    // ----------------------
    var annualDepreciation = (this.state.purchasePrice * 0.8) / 27.5;

    // # Return On Investment
    // ----------------------
    var cashReserves = Math.max(this.state.monthsOfCashReserves * (totalMonthlyExpenses + monthlyMortgagePayment - managementFee) , 3500);

    // # Output
    // --------
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-3 inverse-bg">
          <div className="center-block logo">
            <img src="/assets/logo.png" width="80" height="80" />
          </div>
            <form className="form-horizontal">
              <div className="form-group">
                <label htmlFor="purchasePrice" className="col-sm-6 control-label">Purchase Price</label>
                <div className="col-sm-6">
                  <div className="input-group">
                    <div className="input-group-addon">$</div>
                    <input type="number" className="form-control" id="purchasePrice" onChange={this.handleChange.bind(this).bind(this)} value={this.state.purchasePrice} min="0" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="downPaymentPercent">Down Payment</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="downPaymentPercent" type="number" onChange={this.handleChange.bind(this)} value={this.state.downPaymentPercent} min="0" max="100"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="rehabCost">Rehab Cost</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="rehabCost" type="number" onChange={this.handleChange.bind(this)} value={this.state.rehabCost} min="0"/>
                  </div>
                </div>
              </div>

              <strong>Debt Service</strong>
              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="interestRate">Interest Rate</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="interestRate" type="number" onChange={this.handleChange.bind(this)} value={this.state.interestRate} min="0" max="100"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="amortization">Amortization</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="amortization" type="number" onChange={this.handleChange.bind(this)} value={this.state.amortization} min="0"/>
                  <div className="input-group-addon">Years</div>
                  </div>
                </div>
              </div>

              <strong>Gross Schedule Rents</strong>
              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyRent">Monthly Rent</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="monthlyRent" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyRent} min="0"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="vacancyPercent">Monthly Avg. Vacancy</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="vacancyPercent" type="number" onChange={this.handleChange.bind(this)} value={this.state.vacancyPercent} min="0" max="100"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <strong>Operating Expenses</strong>
              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyTaxes">Monthly Taxes</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="monthlyTaxes" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyTaxes} min="0"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyLandlordInsurance">Monthly Insurance</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="monthlyLandlordInsurance" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyLandlordInsurance} min="0"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="maintenancePercentage">Monthly Avg. Maintenance</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="maintenancePercentage" type="number" onChange={this.handleChange.bind(this)} value={this.state.maintenancePercentage} min="0" max="100"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="propertyManagementLeasingFee">Leasing Fee</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="propertyManagementLeasingFee" type="number" onChange={this.handleChange.bind(this)} value={this.state.propertyManagementLeasingFee} min="0" max="100"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyHoaFee">Monthly HOA Fee</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="monthlyHoaFee" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyHoaFee} min="0"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyUtilities">Monthly Utilities</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="monthlyUtilities" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyUtilities} min="0"/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthlyLandscaping">Monthly Landscaping</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <div className="input-group-addon">$</div>
                  <input className="form-control" id="monthlyLandscaping" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthlyLandscaping} min="0"/>
                  </div>
                </div>
              </div>

              <strong>Return on Investment</strong>
              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="annualAppreciation">Annual Appreciation</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="annualAppreciation" type="number" onChange={this.handleChange.bind(this)} value={this.state.annualAppreciation} min="0" max="100"/>
                  <div className="input-group-addon">%</div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="yearsOwned">Years of Ownership</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="yearsOwned" type="number" onChange={this.handleChange.bind(this)} value={this.state.yearsOwned} min="0"/>
                  <div className="input-group-addon">Years</div>
                  </div>
                </div>
              </div>

              <strong>Cash Reserves</strong>
              <div className="form-group">
                <label className="col-sm-6 control-label" htmlFor="monthsOfCashReserves">Cash Reserves</label>
                <div className="col-sm-6">
                <div className="input-group">
                  <input className="form-control" id="monthsOfCashReserves" type="number" onChange={this.handleChange.bind(this)} value={this.state.monthsOfCashReserves} min="0"/>
                  <div className="input-group-addon">Months</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xs-9">
            <h2>Overview</h2>
            <table>
              <tr>
                <td>Purchase Price</td>
                <td>{this.state.purchasePrice}</td>
              </tr>
              <tr>
                <td>Down Payment</td>
                <td>{downPayment}</td>
              </tr>
              <tr>
                <td>Loan Amount</td>
                <td>{loanAmount}</td>
              </tr>
              <tr>
                <td>Rehab Cost</td>
                <td>{this.state.rehabCost}</td>
              </tr>
              <tr>
                <td>Closing Cost Percentage</td>
                <td>{closingCostPercentage}</td>
              </tr>
              <tr>
                <td>Closing Costs</td>
                <td>{closingCost}</td>
              </tr>
              <tr>
                <td><strong>Investment Capital Needed</strong></td>
                <td><strong>{investmentCapitalNeeded}</strong></td>
              </tr>
            </table>

            <h2>Debt Service</h2>
            <table>
              <tr>
                <td>Loan Amount</td>
                <td>{loanAmount}</td>
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
                <td><strong>Mortgage Payment</strong></td>
                <td><strong>{monthlyMortgagePayment}</strong></td>
              </tr>
            </table>

            <h2>Gross Schedule Rents</h2>
            <table>
              <tr>
                <td>Rent</td>
                <td>{this.state.monthlyRent}</td>
              </tr>
              <tr>
                <td>Vacancy</td>
                <td>{monthlyVacancy}</td>
              </tr>
              <tr>
                <td><strong>Effective Gross Income</strong></td>
                <td><strong>{effectiveGrossIncome}</strong></td>
              </tr>
            </table>

            <h2>Operating Expenses</h2>
            <table>
              <tr>
                <td>Taxes</td>
                <td>{this.state.monthlyTaxes}</td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>{this.state.monthlyLandlordInsurance}</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>{monthlyMaintenance}</td>
              </tr>
              <tr>
                <td>Management Fee</td>
                <td>{managementFee}</td>
              </tr>
              <tr>
                <td>Leasing Fee</td>
                <td>{leasingFee}</td>
              </tr>
              <tr>
                <td>HOA Fee</td>
                <td>{this.state.monthlyHoaFee}</td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td>{this.state.monthlyUtilities}</td>
              </tr>
              <tr>
                <td>Landscaping</td>
                <td>{this.state.monthlyLandscaping}</td>
              </tr>
              <tr>
                <td><strong>Total Expenses</strong></td>
                <td><strong>{totalMonthlyExpenses}</strong></td>
              </tr>
            </table>


            <h2>Net Operating Income</h2>
            <table>
              <tr>
                <td>Effective Gross Income</td>
                <td>{effectiveGrossIncome}</td>
              </tr>
              <tr>
                <td>Mortgage Payment</td>
                <td>{monthlyMortgagePayment}</td>
              </tr>
              <tr>
                <td>Total Expenses</td>
                <td>{totalMonthlyExpenses}</td>
              </tr>
              <tr>
                <td><strong>Monthly Cash Flow Before Mortgage is Paid Off</strong></td>
                <td><strong>{cashFlowBeforeMortage}</strong></td>
              </tr>
              <tr>
                <td><strong>Monthly Cash Flow After Mortgage is Paid Off</strong></td>
                <td><strong>{cashFlowAfterMortgage}</strong></td>
              </tr>
            </table>

            <h2>Return On Investment</h2>
            <table>
              <tr>
                <td>Annual Appreciation</td>
                <td>{this.state.annualAppreciation}%</td>
              </tr>
              <tr>
                <td>Years Owned</td>
                <td>{this.state.yearsOwned}</td>
              </tr>
              <tr>
                <td>New Construction</td>
                <td>{newConstuction}</td>
              </tr>
              <tr>
                <td>Under Mortgage</td>
                <td>{underMortgage}</td>
              </tr>
              <tr>
                <td>Paid Off</td>
                <td>{paidOff}</td>
              </tr>
              <tr>
                <td>Accumulated Cash Flow</td>
                <td>{accumulatedCashFlow}</td>
              </tr>
              <tr>
                <td>Appreciation</td>
                <td>{appreciation}</td>
              </tr>
              <tr>
                <td>Principal Paydown</td>
                <td>{principalPaydown}</td>
              </tr>
              <tr>
                <td>Selling Expenses</td>
                <td>{sellingExpenses}</td>
              </tr>
              <tr>
                <td>Total Projected Profit</td>
                <td>{totalProjectedProfit}</td>
              </tr>
              <tr>
                <td>Annual Cash-on-Cash Return</td>
                <td>{annualCashOnCashReturn || 0}%</td>
              </tr>
              <tr>
                <td>Annual Return on Investment</td>
                <td>{annualReturnOnInvestment}%</td>
              </tr>
            </table>

            <h2>Tax Benefits</h2>
            <table>
              <tr>
                <td>Annual Depreciation</td>
                <td>{annualDepreciation}</td>
              </tr>
            </table>

            <h2>Cash Reserves</h2>
            <table>
              <tr>
                <td>Cash Reserves</td>
                <td>{cashReserves}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
