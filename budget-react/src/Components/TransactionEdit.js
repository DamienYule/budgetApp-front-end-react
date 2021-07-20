import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
// import { BudgetContext } from "../Contexts/BudgetContext";
import { apiURL } from "../util/apiURL"
const API = apiURL();

function TransactionEdit() {
    // const { transactions } = useContext(BudgetContext);
    const history = useHistory()
    const { index } = useParams()
    const [transaction, setTransaction] = useState({
        from: "",
        date: "",
        name: "",
        amount: 0
    });

    useEffect(() => {
        const getTransaction = async () => {
            try {
                const res = await axios.get(`${API}/transactions/${index}`)
                setTransaction(res.data)
                console.log(res.data)
            } catch (error) {
                setTransaction([])
                console.log(error)
            }
        }
        getTransaction()
    }, [])


    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateTransaction(transaction)
        history.push("/transactions");
    }

    const updateTransaction = async (newLog) => {
        try {
            await axios.put(`${API}/transactions/${index}`, newLog);
        } catch (err) {
            console.log(transaction(err));
        }
    };

    return (
        <div className="margin-around-edit" >
            <h1>Edit Transaction</h1>
            <div className="form-control">
                <form onSubmit={handleSubmit} >
                    <div class="input-group mb-3">
                        <span className="input-group-text margin-label" htmlFor="from" id="inputGroup-sizing-default">From who</span>
                        <input className="form-control"
                            id="from"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={transaction.from}
                            type="text"
                            onChange={handleTextChange}
                            placeholder="Name"
                            required />
                    </div>
                    <div class="input-group mb-3">
                        <span className="input-group-text margin-label" htmlFor="date" id="inputGroup-sizing-default">Date</span>
                        <input className="form-control"
                            id="date"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            value={transaction.date}
                            type="text"
                            onChange={handleTextChange}
                            placeholder="Description"
                            required />
                    </div>
                    <div class="input-group mb-3">
                        <span className="input-group-text margin-label" htmlFor="name" id="inputGroup-sizing-default">What for</span>
                        <input className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="name"
                            value={transaction.name}
                            type="text"
                            onChange={handleTextChange}
                            placeholder="Description"
                            required />
                    </div>
                    <div class="input-group mb-3">
                        <span className="input-group-text margin-label" htmlFor="amount" id="inputGroup-sizing-default">How much</span>
                        <input className="form-control"
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                            id="amount"
                            value={transaction.amount}
                            type="number"
                            onChange={handleTextChange}
                            required />
                    </div>
                    <button className="btn btn-primary">Submit Changes</button>
                </form>
            </div>

        </div>
    )
}

export default TransactionEdit
