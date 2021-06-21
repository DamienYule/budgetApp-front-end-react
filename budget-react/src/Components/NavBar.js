import { Link } from "react-router-dom";
import { useState, useEffect } from "react"


export default function NavBar({ budget }) {
  const [backgroundColor, setBackgroundColor] = useState('');

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
        <button className="btn">
          <Link to="/transactions">Transactions</Link>
        </button>
        <button className="btn">
          <Link to="/transactions/new">New</Link>
        </button>
      </div>

    </nav>
  );
}