import React from "react";
const ExpenseSummary=({expenses})=>{
const total=expenses.reduce((acc,expense)=>acc+parseFloat(expense.amount,0),0)
const dateTotals=expenses.reduce((acc,expense)=>{
    const date=expense.date;
    acc[date]=(acc[date]||0)+parseFloat(expense.amount||0);
    return acc
},{})
const categoryTotals=expenses.reduce((acc,expense)=>{
    acc[expense.category]=(acc[expense.category]||0)+parseFloat(expense.amount||0)
    return acc
},{})
return(
    <div className="expense-summary">
        <h2>Summary</h2>
        <p>Total Expenses : Rs.{total.toFixed(2)}</p>
        <h3>By Date</h3>
        <ul>
            {Object.entries(dateTotals).map(([date,total])=>(
               <li key={date}>{date}:Rs.{total.toFixed(2)}</li> 
            ))}
        </ul>
        <h3>By Category</h3>
        <ul>
            {Object.entries(categoryTotals).map(([category,total])=>(
               <li key={category}>{category}:Rs.{total.toFixed(2)}</li> 
            ))}
        </ul>
    </div>
)
}
export default ExpenseSummary;