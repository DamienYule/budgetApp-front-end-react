import { Link } from "react-router-dom";
import { useState, useEffect,useContext } from "react"
import { BudgetContext } from "../Contexts/BudgetContext";
import axios from "axios";
import { apiURL } from "../util/apiURL"
const API = apiURL();


export default function NavBar() {
  const [backgroundColor, setBackgroundColor] = useState('');
  const {budget,setBudget} = useContext(BudgetContext);
  const changeBackground = () => {

    if (budget >= 1000) {
      setBackgroundColor('green')

    } else if (budget >= 500){
      setBackgroundColor('greyHigh')
    } else if (budget >= 200){
      setBackgroundColor('greyLow')
    }else if (budget < 0) {
      setBackgroundColor('red')
    }else
    setBackgroundColor('blue')

  }
  useEffect(() => {
    getBudget()
    changeBackground()

  }, )
  const getBudget = async () => {
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
        addTransactions(res.data)
        
      } catch (error) {
        console.log(error)
      }
    }
    getTransactions()
  }
  return (
    <nav className={backgroundColor}>
      <h1>Budget ${budget.toLocaleString('en-US')}</h1>
      <div className="navButtons">
      <Link to="/transactions" className="navBtnLink">
        <button type="button" className="btn btn-outline-dark btn-lg " >
          Transactions
        </button>
        </Link>
        <Link to="/transactions/new">
        <button type="button" className="btn btn-outline-dark btn-lg ">
          New
        </button>
        </Link>
      </div>

    </nav>
  );
}