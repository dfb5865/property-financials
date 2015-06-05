import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasePrice: 8900000,
      rehabCost: 0,
      interestRate: 4.375,
      amortization: 30,
      monthlyRent: 105000,
      monthlyTaxes: 8900,
      monthlyInsurance: 1115800,
      monthlyHoaFee: 0,
      monthlyLandscaping: 0,
      yearsHeld: 15,
      monthsOfCashReserves: 6
    };
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" />
        </form>
      </div>
    );
  }
}
