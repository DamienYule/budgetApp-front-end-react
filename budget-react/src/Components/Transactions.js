import { useState, useEffect } from "react"
import axios from "axios";
import { apiURL } from "../util/apiURL"
const API = apiURL();

export default function Transactions({ setBudget, budget }) {
    const [transactions, setTransactions] = useState([]);


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


    // if (sum >= 100){[]}
    return (
        <div>
            <h1>Transactions</h1>
            <ul>
                {transactions.map((transaction, index) => {
                    return <li key={index} className="listItem">
                        <div>{transaction.from}</div>
                        <div> {transaction.date}</div>  
                        <div> {transaction.name} </div>  
                        <div>${Number(transaction.amount).toLocaleString('en-US')}</div>  
                    </li>
                })}
            </ul>
                <h3 className="total">Total: ${budget.toLocaleString('en-US')}</h3>
        </div>
    )
}
