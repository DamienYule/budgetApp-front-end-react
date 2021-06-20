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

    }, [ setBudget])


    // if (sum >= 100){[]}
    return (
        <div>
            <h2>Transactions</h2>
            <h3>total: {budget}</h3>
            <ul>
                {transactions.map((transaction, index) => {
                    return <li key={index} className="listItem">
                        <div><strong>From:</strong> {transaction.from}<br /></div>
                        <div></div>  <strong>Date: </strong> {transaction.date}<br />
                        <div></div>  <strong>Name: </strong> {transaction.name} <br />
                        <div></div>  <strong>Amount: </strong>{transaction.amount}
                    </li>
                })}
            </ul>
        </div>
    )
}
