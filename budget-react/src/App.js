import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Transactions from './Components/Transactions';
import TransactionsNew from './Components/TransactionsNew';
import BudgetProvider from "./Contexts/BudgetContext"
import Edit from "./Components/Edit"
function App() {

  return (
    <>
      <BudgetProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/transactions/new" >
              <TransactionsNew />
            </Route>
            <Route path="/transactions/:index">
              <Edit />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
          </Switch>
        </Router>
      </BudgetProvider>
    </>
  );
}

export default App;
