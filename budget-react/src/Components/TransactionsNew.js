import { useState } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom"
import { apiURL } from "../util/apiURL"
const API = apiURL();

export default function TransactionsNew({ budget }) {
    const history = useHistory()

    const [transaction, setTransaction] = useState({
        from: "",
        date: "",
        name: "",
        amount: 0
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        setTransaction({ ...transaction, date: dateAndTime() })
        await addtransaction(transaction)
        history.push("/transactions");
    }
    const handleTextChange = (event) => {
        setTransaction({ ...transaction, [event.target.id]: event.target.value });
    };
    const addtransaction = async (newLog) => {
        try {
            await axios.post(`${API}/transactions`, newLog);
        } catch (err) {
            console.log(transaction(err));
        }
    };
    const dateAndTime = () => {
        let dateObj = new Date()
        let dayIndex = dateObj.getDay()
        let weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let day = weekArray[dayIndex]
        let monthIndex = dateObj.getMonth()
        let monthArray = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"]
        let month = monthArray[monthIndex]
        let date = dateObj.getDate()
        let prefix = ""
        if (date === 1 || date === 21 || date === 31) {
            prefix = "st"
        } else if (date === 2 || date === 22) {
            prefix = "nd"
        } else if (date === 3 || date === 23) {
            prefix = "rd"
        } else {
            prefix = "th"
        }
        let hoursFromObj = dateObj.getHours()
        let hour = ""
        let amPm = "am"
        if (hoursFromObj === 0) {
            hour = "12"
        } else if (hoursFromObj === 12) {
            hour = "12"
            amPm = "pm"
        } else if (hoursFromObj > 12) {
            hour = hoursFromObj - 12
            amPm = "pm"
        } else {
            hour = hoursFromObj
        }
        let minFromObj = dateObj.getMinutes()
        let min = ""
        if (minFromObj === 0) {
            min = "00"
        } else if (minFromObj < 10) {
            min = "0" + minFromObj.toString()
        } else {
            min = minFromObj
        }
        transaction.date = `${day}, ${month} ${date + prefix} at ${hour}:${min + amPm} `
    }
  

    return (
        <div>
            <h1>New Transaction</h1>
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
                <button>submit</button>
            </form>
            {/* {(budget>10)? <h1>This is an error</h1>:<h1>This is an error</h1>}  */}
        </div>
    )
}
