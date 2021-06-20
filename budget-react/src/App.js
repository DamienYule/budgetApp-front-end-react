import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Transactions from './Components/Transactions';
import TransactionsNew from './Components/TransactionsNew';
import { useState } from "react"

function App() {
  const [budget, setBudget] = useState(0)
  
  return (
    <>
      <Router>
        <NavBar  budget={budget}/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/transactions/new"  budget={budget}>
            <TransactionsNew />
          </Route>
          <Route  path="/transactions">
            <Transactions setBudget={setBudget}  budget={budget}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
