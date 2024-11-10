import React from "react";
const ExpenseList=({expenses,deleteExpense,editExpense})=>{
    return(
        <div className="expense-list">
            <h2>Expenses</h2>
            <ul>
                {
                    expenses.map((expense)=>(
                        <li key={expense.id}>{expense.name}-Rs.{expense.amount}-{expense.category}-{expense.date}
                        <div>
                            <button onClick={()=>editExpense(expense)}>Edit</button>
                            <button onClick={()=>deleteExpense(expense.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ExpenseList;