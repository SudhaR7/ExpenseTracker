import React from 'react';

function ExpenseSummary({ expenses, incomes, totalExpenses, budget }) {
  const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);

  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Budget: ${budget}</p>
    </div>
  );
}

export default ExpenseSummary;
