import { Link } from "react-router-dom";
import { useState, useEffect } from "react"


export default function NavBar({ budget }) {
  const [backgroundColor, setBackgroundColor] = useState('');

  const changeBackground = () => {
    console.log("can you see me")
    
    if (budget >= 1000) {
      setBackgroundColor('green')
    } else if (budget < 0) {
      setBackgroundColor('red')
    }
  }

  useEffect(() => {
    changeBackground()
  }, [])

  return (
    <nav style={{
      backgroundColor: { backgroundColor }
    }}>
      <h1>Budget Calculator</h1>
      <div className="navButtons">
        <button>
          <Link to="/transactions">All Transactions</Link>
        </button>
        <button>
          <Link to="/transactions/new">New Transaction</Link>
        </button>
      </div>

    </nav>
  );
}