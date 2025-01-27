import './App.css';
import React, { useState, useEffect } from 'react';
import IncomeForm from './components/IncomeForm';
import IncomeList from './components/IncomeList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [budget, setBudget] = useState(0);
  const [showNotification, setShowNotification] = useState(false);  // Notification state
  const [categories] = useState([
    'Food & Groceries',
    'Transport & Fuel',
    'Housing & Rent',
    'Utilities',
    'Entertainment & Leisure',
    'Health & Fitness',
    'Shopping',
    'Education',
    'Travel & Vacations',
    'Insurance',
    'Personal Care',
    'Debt Payments',
    'Gifts & Donations',
    'Savings & Investments',
    'Miscellaneous',
  ]);
  const [incomeCategories] = useState([
    'Salary',
    'Business Income',
    'Freelancing',
    'Investments',
    'Rental Income',
    'Other',
  ]);

  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIncome, setEditingIncome] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) setExpenses(storedExpenses);

    const storedIncomes = JSON.parse(localStorage.getItem('incomes'));
    if (storedIncomes) setIncomes(storedIncomes);

    const storedBudget = JSON.parse(localStorage.getItem('budget'));
    if (storedBudget) setBudget(storedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [expenses, incomes, budget]);

  const addExpense = (expense) => setExpenses([...expenses, expense]);
  const updateExpense = (expense) => {
    setExpenses(expenses.map((item) => (item.id === expense.id ? expense : item)));
    setEditingExpense(null);
  };
  const deleteExpense = (id) => setExpenses(expenses.filter((expense) => expense.id !== id));
  const editExpense = (expense) => setEditingExpense(expense);

  const addIncome = (income) => setIncomes([...incomes, income]);
  const updateIncome = (income) => {
    setIncomes(incomes.map((item) => (item.id === income.id ? income : item)));
    setEditingIncome(null);
  };
  const deleteIncome = (id) => setIncomes(incomes.filter((income) => income.id !== id));
  const editIncome = (income) => setEditingIncome(income);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

  // Budget status (within budget or exceeded)
  const budgetStatus = totalExpenses > budget ? 'Exceeded Budget' : 'Within Budget';

  // Trigger notification if budget is exceeded
  useEffect(() => {
    if (totalExpenses > budget) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [totalExpenses, budget]);

  return (
    <div className="App">
      <h1>Expense & Income Tracker</h1>

      {/* Show Notification when Budget Exceeds */}
      {showNotification && (
        <div className="notification">
          <p style={{ margin: '0', color: '#fff' }}>
            <strong>Warning!</strong> Your expenses have exceeded your budget.
          </p>
        </div>
      )}

      {/* Set Budget Section */}
      <div className="budget-section">
        <h2>Set Your Budget</h2>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          placeholder="Enter your budget"
        />
        <p>Budget Status: {budgetStatus}</p>
      </div>

      {/* Income Form and List */}
      <IncomeForm
        addIncome={addIncome}
        updateIncome={updateIncome}
        categories={incomeCategories}
        editingIncome={editingIncome}
      />
      <IncomeList incomes={incomes} deleteIncome={deleteIncome} editIncome={editIncome} />

      {/* Expense Form and List */}
      <ExpenseForm
        addExpense={addExpense}
        updateExpense={updateExpense}
        categories={categories}
        editingExpense={editingExpense}
      />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} />

      {/* Expense and Income Summary */}
      <ExpenseSummary expenses={expenses} incomes={incomes} totalExpenses={totalExpenses} budget={budget} />
    </div>
  );
}

export default App;
