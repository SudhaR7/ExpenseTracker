import React from 'react';

function IncomeList({ incomes, deleteIncome, editIncome }) {
  return (
    <div>
      <h2>Incomes</h2>
      {incomes.length === 0 ? (
        <p>No incomes added yet.</p>
      ) : (
        <ul>
          {incomes.map((income) => (
            <li key={income.id}>
              <span>{income.category} - ${income.amount} ({income.description})</span>
              <button onClick={() => editIncome(income)}>Edit</button>
              <button onClick={() => deleteIncome(income.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IncomeList;
