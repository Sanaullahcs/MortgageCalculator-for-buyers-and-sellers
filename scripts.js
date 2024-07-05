function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function validateInputs() {
  const inputs = document.querySelectorAll('input[type="number"], input[type="date"]');
  let isValid = true;
  inputs.forEach(input => {
    if (input.type === 'date') {
      if (input.value === '') {
        alert(`${input.previousElementSibling.innerText} is required.`);
        isValid = false;
      }
    } else if (input.type === 'number') {
      if (input.value === '' || isNaN(input.value) || input.value < 0) {
        alert(`${input.previousElementSibling.innerText} is required and must be a positive number.`);
        isValid = false;
      }
    }
  });
  return isValid;
}


function computeSellerProceeds() {
  if (!validateInputs()) return;

  const purchasePrice = parseFloat(document.getElementById('purchase-price').value);
  const totalCommission = parseFloat(document.getElementById('total-commission').value) / 100 * purchasePrice;
  const surveyCost = parseFloat(document.getElementById('survey-cost').value);
  const stateTransferTax = parseFloat(document.getElementById('state-transfer-tax').value);
  const cityTransferTax = parseFloat(document.getElementById('city-transfer-tax').value);
  const priorTaxBill = parseFloat(document.getElementById('prior-tax-bill').value);
  const attorneyFee = parseFloat(document.getElementById('attorney-fee').value);
  const propertyTaxes = parseFloat(document.getElementById('property-taxes').value) / 100 * purchasePrice;
  const mortgagePayoff = parseFloat(document.getElementById('mortgage-payoff').value);
  const miscellaneous = parseFloat(document.getElementById('miscellaneous').value);
  const closingCostCredits = parseFloat(document.getElementById('closing-cost-credits').value);

  const closingCosts = totalCommission + surveyCost + stateTransferTax + cityTransferTax + priorTaxBill + attorneyFee + propertyTaxes + mortgagePayoff + miscellaneous;

  const netProceeds = purchasePrice - closingCosts + closingCostCredits;

  document.getElementById('seller-result').innerHTML = `
    <p>Sale Price: ${formatCurrency(purchasePrice)}</p>
    <p>Closing Cost Credits: ${formatCurrency(closingCostCredits)}</p>
    <p>Closing Costs: ${formatCurrency(closingCosts)}</p>
    <p>Net Proceeds: ${formatCurrency(netProceeds)}</p>
    <button onclick="showMoreSellerDetails()">View More Detail</button>
  `;
}

function showMoreSellerDetails() {
  const purchasePrice = parseFloat(document.getElementById('purchase-price').value);
  const totalCommission = parseFloat(document.getElementById('total-commission').value) / 100 * purchasePrice;
  const surveyCost = parseFloat(document.getElementById('survey-cost').value);
  const stateTransferTax = parseFloat(document.getElementById('state-transfer-tax').value);
  const cityTransferTax = parseFloat(document.getElementById('city-transfer-tax').value);
  const priorTaxBill = parseFloat(document.getElementById('prior-tax-bill').value);
  const attorneyFee = parseFloat(document.getElementById('attorney-fee').value);
  const propertyTaxes = parseFloat(document.getElementById('property-taxes').value) / 100 * purchasePrice;
  const mortgagePayoff = parseFloat(document.getElementById('mortgage-payoff').value);
  const miscellaneous = parseFloat(document.getElementById('miscellaneous').value);
  const closingCostCredits = parseFloat(document.getElementById('closing-cost-credits').value);

  alert(`
    Detailed Breakdown:
    Purchase Price: ${formatCurrency(purchasePrice)}
    Total Commission: ${formatCurrency(totalCommission)}
    Survey Cost: ${formatCurrency(surveyCost)}
    State/County Transfer Tax: ${formatCurrency(stateTransferTax)}
    City Transfer Tax: ${formatCurrency(cityTransferTax)}
    Prior Year Full Tax Bill: ${formatCurrency(priorTaxBill)}
    Attorney Fee: ${formatCurrency(attorneyFee)}
    Property Taxes: ${formatCurrency(propertyTaxes)}
    Mortgage Payoff Amount: ${formatCurrency(mortgagePayoff)}
    Miscellaneous Costs: ${formatCurrency(miscellaneous)}
    Closing Cost Credits: ${formatCurrency(closingCostCredits)}
  `);
}


function computeBuyerCost() {
  if (!validateInputs()) return;

  const homePrice = parseFloat(document.getElementById('home-price').value);
  const downPaymentPercent = parseFloat(document.getElementById('down-payment').value);
  const downPayment = downPaymentPercent / 100;
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
  const loanTerm = parseInt(document.getElementById('loan-term').value) * 12;
  const hazardInsurance = parseFloat(document.getElementById('hazard-insurance').value);
  const propertyTaxesPercent = parseFloat(document.getElementById('property-taxes').value);
  const cityTransferTax = parseFloat(document.getElementById('city-transfer-tax').value);

  const loanAmount = homePrice * (1 - downPayment);
  const monthlyPrincipalInterest = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
  const annualPropertyTaxes = (propertyTaxesPercent / 100) * homePrice;
  const monthlyTaxes = annualPropertyTaxes / 12;
  const monthlyInsurance = hazardInsurance / 12;

  // PMI Calculation (assuming PMI rate is 0.5% of loan amount annually)
  const pmiRate = 0.005;
  const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * pmiRate) / 12 : 0;

  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance + monthlyPMI;

  document.getElementById('buyer-result').innerHTML = `
    <p>P&I: ${formatCurrency(monthlyPrincipalInterest)}</p>
    <p>Taxes: ${formatCurrency(monthlyTaxes)}</p>
    <p>Insurance: ${formatCurrency(monthlyInsurance)}</p>
    <p>PMI: ${formatCurrency(monthlyPMI)}</p>
    <p>Total Monthly Payment: ${formatCurrency(totalMonthlyPayment)}</p>
    <button onclick="showMoreBuyerDetails()">View More Detail</button>
  `;
}

function showMoreBuyerDetails() {
  const homePrice = parseFloat(document.getElementById('home-price').value);
  const downPaymentPercent = parseFloat(document.getElementById('down-payment').value);
  const downPayment = downPaymentPercent / 100;
  const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
  const loanTerm = parseInt(document.getElementById('loan-term').value) * 12;
  const hazardInsurance = parseFloat(document.getElementById('hazard-insurance').value);
  const propertyTaxesPercent = parseFloat(document.getElementById('property-taxes').value);
  const cityTransferTax = parseFloat(document.getElementById('city-transfer-tax').value);

  const loanAmount = homePrice * (1 - downPayment);
  const monthlyPrincipalInterest = loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
  const annualPropertyTaxes = (propertyTaxesPercent / 100) * homePrice;
  const monthlyTaxes = annualPropertyTaxes / 12;
  const monthlyInsurance = hazardInsurance / 12;

  // PMI Calculation (assuming PMI rate is 0.5% of loan amount annually)
  const pmiRate = 0.005;
  const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * pmiRate) / 12 : 0;

  const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance + monthlyPMI;

  alert(`
    Detailed Breakdown:
    Home Price: ${formatCurrency(homePrice)}
    Down Payment: ${formatCurrency(homePrice * downPayment)}
    Loan Amount: ${formatCurrency(loanAmount)}
    Monthly Principal & Interest (P&I): ${formatCurrency(monthlyPrincipalInterest)}
    Monthly Taxes: ${formatCurrency(monthlyTaxes)}
    Monthly Hazard Insurance: ${formatCurrency(monthlyInsurance)}
    Monthly PMI: ${formatCurrency(monthlyPMI)}
    Total Monthly Payment: ${formatCurrency(totalMonthlyPayment)}
    City Transfer Tax: ${formatCurrency(cityTransferTax)}
  `);
}