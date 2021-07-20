import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// import { BudgetContext } from "../Contexts/BudgetContext";
import { apiURL } from "../util/apiURL"
const API = apiURL();

function TransactionShow() {
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
        getTransaction()

    }, [])
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

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`${API}/transactions/${index}`);
            history.push("/transactions")
        } catch (err) {
            console.log(transaction(err));
        }
    }

    return (
        <div className="marginShow">
            <h1>Show Transaction</h1>
            <div className="card" >
                <div className="card-body">
                <h5 className="card-title">Transaction</h5>
               < h6 className="card-subtitle mb-2 text-muted">From who: {transaction.from}</h6>
               <p className="card-text">On {transaction.date} this transaction for {transaction.name} was made in the amount of {transaction.amount} dollars. </p>
             
                    <Link to={`/transactions/edit/${index}`}> <button className="btn btn-outline-success">Edit</button></Link>

                    <button type="button" onClick={handleDelete} class="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TransactionShow
