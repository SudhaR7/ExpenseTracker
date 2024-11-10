import React,{useState,useEffect} from "react";
const ExpenseForm=({addExpense,updateExpense,categories,editingExpense})=>{
    const [name,setName]=useState('')
    const [amount,setAmount]=useState('')
    const [category,setCategory]=useState(categories[0])
    const [date,setDate]=useState('')
useEffect(()=>{
    if(editingExpense){
        setName(editingExpense.name)
        setAmount(editingExpense.amount)
        setCategory(editingExpense.category)
        setDate(editingExpense.date)
    }else{
        setName('')
        setAmount('')
        setCategory(categories[0])
        setDate('')
    }
},[editingExpense,categories]);
const handleAdd=(e)=>{
    e.preventDefault();
    const expense={id:Date.now(),name,amount,category,date};
    addExpense(expense)
    setName('')
    setAmount('')
    setCategory(categories[0])
    setDate('')
};
const handleUpdate=(e)=>{
    e.preventDefault()
    const expense = {id:editingExpense.id,name,amount,category,date}
updateExpense(expense)
};
return(
    <form onSubmit={editingExpense? handleUpdate:handleAdd} className="expense-form">
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Expense Name"required/>
        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter Amount"required/>
        <select value={category} onChange={(e)=>setCategory(e.target.value)} name="" id="">
            {categories.map((cat)=>(<option key={cat} value={cat}>{cat}</option>))}
        </select>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} required />
        {
            editingExpense?(<button type="submit">Update Expense</button>)
            :
            (<button type="submit">Add Expense</button>)
        }
    </form>
);
};
export default ExpenseForm;