import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { LuRefreshCcw } from "react-icons/lu"
import Profile from "./global/Profile"

function Transaction() {
    const [refresh, setRefresh] = useState(false)
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        (async () => {
            const response = await axios.get("http://localhost:3000/api/v1/account/transaction-details", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).catch(() => {
                navigate("/")
            })
            setTransactions(response.data);
        })()
    }, [refresh])

    transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
        <div className="w-full flex flex-col justify-center mt-10 p-5 rounded-md border-t-2 shadow-2xl h-[520px]">
            <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-bold font-mono text-slate-200">Transactions</p>
                <button onClick={() => {
                    setRefresh(refresh => !refresh)
                }}><LuRefreshCcw className="text-slate-200" /></button>
            </div>
            <div className="overflow-y-auto mt-5 h-full pr-2 [&::-webkit-scrollbar]:w-2
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-track]:rounded-md
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:[&::-webkit-scrollbar-thumb]:rounded-md">
                {transactions ? transactions.map(transaction => <TransactionDetails key={transaction.id} transaction={transaction} />) : "No Transaction Found"}
            </div>
        </div>
    )
}

const TransactionDetails = ({ transaction }) => {
    return (
        <div className="mt-5 py-2 flex flex-row items-center justify-between px-5 md:px-10">
            <div className=''>
                <div className="flex flex-row justify-start items-center">
                    <Profile className='bg-slate-300' firstname={transaction.account.user.name} lastname={transaction.account.user.name} />
                    <p className="pl-3 text-lg font-semibold text-slate-200">
                        {transaction.account.user.name}
                    </p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm text-teal-500">
                        {transaction.status == "transferred" ? "Sent on " + transaction.createdAt.split("T")[0] + " at " + transaction.createdAt.split("T")[1].split(":", 2).join(":") : "Received on " + transaction.createdAt.split("T")[0] + " at " + transaction.createdAt.split("T")[1].split(":", 2).join(":")}
                    </p>
                </div>
            </div>
            <div>
                {
                    transaction.status == "transferred" ? <p className="text-lg font-bold text-red-500">{"-" + transaction.amount}</p> : <p className="text-lg font-bold text-green-500">{"+" + transaction.amount}</p>
                }
            </div>
        </div>
    )
}

export default Transaction