import React, { useState, useEffect, useContext } from "react"
import { BudgetContext } from "../Contexts/BudgetContext";
import { Link } from "react-router-dom"
import axios from "axios";
import { apiURL } from "../util/apiURL"
const API = apiURL();

export default function Transactions() {

    const { budget, setBudget, transactions, setTransactions } = useContext(BudgetContext);
    useEffect(() => {
        const addTransactions = async (recieveTransactions) => {
            let sum = 0
            recieveTransactions.forEach(el => {
                sum += Number(el.amount)
            })
            setBudget(sum)
        }
        const getTransactions = async () => {
            try {
                const res = await axios.get(`${API}/transactions`)
                setTransactions(res.data)
                addTransactions(res.data)

            } catch (error) {
                setTransactions([])
                console.log(error)
            }
        }

        getTransactions()

    }, [setBudget])

    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transaction, index) => {
                    return <li key={index} >
                        <Link to={`/transactions/show/${index}`} className="removeStyling">
                            <div className="listItem">
                                <div>{transaction.from}</div>
                                <div> {transaction.date}</div>
                                <div> {transaction.name} </div>
                                <div>${Number(transaction.amount).toLocaleString('en-US')}</div>
                            </div>
                        </Link>
                    </li>
                })}
            </ul>
            <h3 className="total">Total: ${budget.toLocaleString('en-US')}</h3>
        </div>
    )
}
