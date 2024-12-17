import { useEffect, useState } from "react"
import ChartArea from "../components/ChartArea"
import NavBar from "../components/NavBar"
import axios from "axios"

function Analysis() {
  const [transactions, setTransactions] = useState([])
  const [chartData, setChartData] = useState([])
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
  }, [])

  useEffect(() => {
    if (transactions.length > 0) {
      const chartData = transactions.reduce((acc, user) => {
        const date = user.createdAt.slice(8, 10)

        if (!acc[date]) {
          acc[date] = []
        }
        if (user.status === "transferred") {
          acc[date].push(-Number(user.amount))
        } else {
          acc[date].push(Number(user.amount))
        }
        return acc
      }, {})
      setChartData(chartData)
    }
  }, [transactions])
  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
      <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col">
        <NavBar />
        <div className="w-full flex flex-col md:flex-row justify-between flex-grow h-full overflow-y-auto">
          <div className="md:w-2/4 flex flex-col mx-10 mt-10 p-5 border-t-2 rounded-md shadow-md">
            <ChartArea chartData={chartData}/>
          </div>
          <div className="md:w-3/5 px-10 md:px-20 h-full flex">

          </div>
        </div>
      </div>
    </>
  )
}

export default Analysis