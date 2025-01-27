import React, { useState, useEffect } from 'react';

function IncomeForm({ addIncome, updateIncome, categories, editingIncome }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingIncome) {
      setAmount(editingIncome.amount);
      setCategory(editingIncome.category);
      setDescription(editingIncome.description);
    }
  }, [editingIncome]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && category && description) {
      const income = { id: Date.now(), amount, category, description };
      editingIncome ? updateIncome(income) : addIncome(income);
      setAmount('');
      setCategory('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingIncome ? 'Edit Income' : 'Add Income'}</h2>
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
      <button type="submit">{editingIncome ? 'Update Income' : 'Add Income'}</button>
    </form>
  );
}

export default IncomeForm;
