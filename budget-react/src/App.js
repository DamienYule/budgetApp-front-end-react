import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import Transactions from './Components/Transactions';
import TransactionsNew from './Components/TransactionsNew';
import BudgetProvider from "./Contexts/BudgetContext";
import TransactionEdit from "./Components/TransactionEdit";
import TransactionShow from './Components/TransactionShow';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <div className="app">
      <BudgetProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/transactions/new" >
              <TransactionsNew />
            </Route>
            <Route path="/transactions/show/:index">
              <TransactionShow />
            </Route>
            <Route path="/transactions/edit/:index">
              <TransactionEdit />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
          </Switch>
        </Router>
      </BudgetProvider>
    </div>
  );
}

export default App;
