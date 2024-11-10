import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import ExpenseForm  from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
function App() {
  const [expenses,setExpenses]=useState([]);
  const [categories]=useState([
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
    'Miscellaneous'
  ]);
const [editingExpense,setEditingExpense]=useState(null)
useEffect(()=>{
  const storedExpenses=JSON.parse(localStorage.getItem('expenses'))
  if(storedExpenses) setExpenses(storedExpenses)
},[])
useEffect(()=>{
  localStorage.setItem('expenses',JSON.stringify(expenses))
},[expenses])
const addExpense=(expense)=>{
  setExpenses([...expenses,expense])
}
const updateExpense=(expense)=>{
  setExpenses(expenses.map((item)=>(item.id==expense.id?expense:item)))
  setEditingExpense(null)
}
const deleteExpense=(id)=>{
  setExpenses(expenses.filter((expense)=>expense.id!=id))
}
const editExpense=(expense)=>{
  setEditingExpense(expense)
}
return(
  <div className='App'>
     <h1>Expense Tracker</h1>
  <ExpenseForm
  addExpense={addExpense}
  updateExpense={updateExpense}
  categories={categories}
  editingExpense={editingExpense}
  />
  <ExpenseSummary expenses={expenses}/>
  <ExpenseList expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense}/>
  </div>
)
}
export default App;
