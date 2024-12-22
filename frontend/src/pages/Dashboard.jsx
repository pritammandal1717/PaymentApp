import NavBar from "../components/NavBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import Transaction from "../components/Transaction"
import Footer from "../components/global/Footer"

function Dashboard() {

  return (
    <>
    <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
    <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col">
      <NavBar />
      <div className="w-full flex flex-col md:flex-row justify-between flex-grow">
        <div className="md:w-2/4 px-10 md:px-20 flex flex-col space-y-6">
          <Balance />
          <Users />
        </div>
        <div className="md:w-3/5 px-10 md:px-20 h-full flex">
          <Transaction className="flex-grow" />
        </div>
      </div>
      <Footer />
    </div>
  </>
  )
}

export default Dashboard