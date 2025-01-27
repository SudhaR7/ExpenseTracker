import React from 'react';

function ExpenseList({ expenses, deleteExpense, editExpense }) {
  return (
    <div>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.category} - ${expense.amount} ({expense.description})</span>
              <button onClick={() => editExpense(expense)}>Edit</button>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
