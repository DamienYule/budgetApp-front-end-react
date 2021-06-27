import React from 'react'
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { BudgetContext } from "../Contexts/BudgetContext";
import { apiURL } from "../util/apiURL"
const API = apiURL();

function Edit() {
    const { transactions } = useContext(BudgetContext);
    const history = useHistory()
    const { index } = useParams()
    const [transaction, setTransaction] = useState({
        from: "",
        date: "",
        name: "",
        amount: 0
    });

    useEffect(() => {

        setTransaction(transactions[index])

    }, [])
    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setTransaction({ ...transaction, date: dateAndTime() })
        await addtransaction(transaction)
        history.push("/transactions");
    }
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`${API}/transactions/${index}`);
            history.push("/transactions")
        } catch (err) {
            console.log(transaction(err));
        }

    }
    const addtransaction = async (newLog) => {
        try {
            await axios.put(`${API}/transactions/${index}`, newLog);
        } catch (err) {
            console.log(transaction(err));
        }
    };

    return (
        <div>
            <h1>Edit Transaction</h1>
            <div className="flex-form">
            <form onSubmit={handleSubmit} >
                <label htmlFor="from">From who: </label>
                <input
                    id="from"
                    value={transaction.from}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Name"
                    required
                /><br />
                <label htmlFor="date">Date: </label>
                <input
                    id="date"
                    value={transaction.date}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Description"
                    required
                /><br />
                <label htmlFor="name">What for: </label>
                <input
                    id="name"
                    value={transaction.name}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="Description"
                    required
                /><br />
                <label htmlFor="amount">How much: </label>
                <input
                    id="amount"
                    value={transaction.amount}
                    type="number"
                    onChange={handleTextChange}
                    required
                />
                <button>submit changes</button>
            </form>
            <div> <button className='deleteBtn' onClick={handleDelete}>Delete</button></div>
           </div>
        </div>
    )
}

export default Edit
