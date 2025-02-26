import React, { useState, useEffect } from 'react';

function ExpenseForm({ addExpense, updateExpense, categories, editingExpense }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category && description) {
      const expense = { id: Date.now(), amount, category, description };
      editingExpense ? updateExpense(expense) : addExpense(expense);
      setAmount('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editingExpense ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
}

export default ExpenseForm;
