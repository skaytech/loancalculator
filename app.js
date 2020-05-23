document.querySelector('#loan-form').addEventListener('submit', function(e) {
    showSpinner();
    hideResults();
    setTimeout(calculate, 2000);
    e.preventDefault();
});

function calculate() {
    const loanAmount = document.querySelector('#amount');
    const loanInterest = document.querySelector('#interest');
    const yrsOfRepay = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(loanAmount.value);
    const calcInterest = parseFloat(loanInterest.value / 100 / 12);
    const calcPayment = parseFloat(yrsOfRepay.value) * 12;

    //Calculate Monthly Payment
    const x = Math.pow(1 + calcInterest, calcPayment);
    const monPayment = (principal * x * calcInterest) / (x - 1);

    if (isFinite(monPayment)) {
        hideSpinner();
        showResults();
        monthlyPayment.value = monPayment.toFixed(2);
        totalPayment.value = (monPayment * calcPayment).toFixed(2);
        totalInterest.value = ((monPayment * calcPayment) - principal).toFixed(2);
    } else {
        showError('Check the input values and try again');
    }
}

function showError(error) {
    hideResults();
    hideSpinner();
    const card = document.querySelector('.card');
    const heading = document.querySelector('.display-5');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    //InsertBefore takes in the argument (elementToBeInserted, elementBeforeIt)
    card.insertBefore(errorDiv, heading);

    //Clear Error
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function showResults() {
    document.querySelector('#results').style.display = 'block';
}

function hideResults() {
    document.querySelector('#results').style.display = 'none';
}

function showSpinner() {
    document.querySelector('#loading').style.display = 'block';
}

function hideSpinner() {
    document.querySelector('#loading').style.display = 'none';
}