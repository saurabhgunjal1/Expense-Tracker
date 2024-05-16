import React, { useState } from 'react';
import "./tracker.css";
import Form from './first component/form';
import Transaction from './transaction/transaction';

export default function Tracker(props) {
    const [transaction, setTransaction] = useState(null);
    const [expense, setExpense] = useState(0);
    const [categoryTotals, setCategoryTotals] = useState({}); // Local state for categoryTotals

    const updateexpenseBalance = (total) => {
        setExpense(total);
    };

    return (
        <div className='topdiv'>
            <h1 className='h1'>Expense Tracker</h1>
            <Form
                transaction={transaction}
                setTransaction={setTransaction}
                expense={expense}
                categoryTotals={categoryTotals} // Pass categoryTotals to Form
            />
            <Transaction
                transaction={transaction}
                setTransaction={setTransaction}
                updateexpenseBalance={updateexpenseBalance}
                setCategoryTotals={setCategoryTotals} // Pass setCategoryTotals to Transaction
            />
        </div>
    );
}
