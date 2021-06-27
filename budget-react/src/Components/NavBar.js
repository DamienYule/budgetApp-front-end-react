import { Link } from "react-router-dom";
import { useState, useEffect,useContext } from "react"
import { BudgetContext } from "../Contexts/BudgetContext";


export default function NavBar() {
  const [backgroundColor, setBackgroundColor] = useState('');
  const {budget} = useContext(BudgetContext);
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
    changeBackground()
  }, )

  return (
    <nav className={backgroundColor}>
      <h1>Budget ${budget.toLocaleString('en-US')}</h1>
      <div className="navButtons">
        <button>
          <Link to="/transactions" className="btn">Transactions</Link>
        </button>
        <button >
          <Link to="/transactions/new" className="btn">New</Link>
        </button>
      </div>

    </nav>
  );
}