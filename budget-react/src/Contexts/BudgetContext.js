import { createContext,useState } from 'react';


export const BudgetContext = createContext({});

const BudgetProvider = ({ children }) => {
    const [budget, setBudget] = useState(0)
    const [transactions, setTransactions] = useState([])
    return (
        <BudgetContext.Provider value={{ budget, setBudget,transactions, setTransactions }}>
            {children}
        </BudgetContext.Provider>
    )
}
export default BudgetProvider