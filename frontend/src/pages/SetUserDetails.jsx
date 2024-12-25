import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom";
import InputBox from "../components/global/InputBox";
import axios from "axios";
import Profile from "../components/global/Profile";
import Select from "../components/Select";
import CategoryCount from "../components/CategoryCount";
import Footer from "../components/global/Footer";

function SetUserDetails() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const handleItemClick = (user) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    (async () => {
      const response = await axios.get("https://paymentapp-sqmb.onrender.com/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).catch(() => {
        navigate("/")
      })
      setUsers(response.data.users)
    })()
  }, [filter, selectedUser, refresh])

  return (
    <>
      <div className="z-0 w-screen h-screen bg-[url(/bg-auth.jpg)] bg-repeat-y bg-cover"></div>
      <div className="absolute top-0 backdrop-blur-2xl w-screen h-screen flex flex-col justify-between">
        <NavBar />
        <div className="w-full md:px-20 flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="md:w-2/5 md:h-[520px] mt-5 md:mt-0">
            <div className='w-full flex flex-col md:mt-10 p-3 md:p-5 border-t-2 rounded-md shadow-md'>
              <div className='text-xl text-slate-100'>
                <InputBox label={"Your Knowns"} placeholder={"Search users..."} onChange={async (e) => {
                  setFilter(e.target.value);
                }} />
              </div>
              <div className='overflow-y-auto mt-3 md:mt-5 h-full pr-2 [&::-webkit-scrollbar]:w-2
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-track]:rounded-md
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:[&::-webkit-scrollbar-thumb]:rounded-md'>
                {users ? users.map(user => <User key={user.user.id} user={user} handleItemClick={handleItemClick} />) : "No user Found"}
              </div>
            </div>
          </div>
          <div className="w-5/6 md:w-2/4 flex flex-col justify-center items-center">
            <CategoryCount refresh={refresh} setRefresh= {setRefresh}/>
            <div className="md:w-full flex flex-row justify-center md:items-center p-2 md:p-5 mt-10 border-t-2 rounded-md backdrop-blur-2xl shadow-2xl">
              {
                selectedUser ?
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col justify-center items-center">
                      <Profile className='bg-slate-300' firstname={selectedUser.user.name} lastname={selectedUser.user.name} />
                      <p className="mt-5 text-slate-100 text-2xl font-mono">{selectedUser.user.name}</p>
                      <p className="mt-2 text-slate-200 font-mono">+91 {selectedUser.user.phone}</p>
                      <p className="mt-2 text-slate-200 font-mono">{selectedUser.user.email}</p>
                    </div>
                    <hr  className="border border-slate-800 rounded-md w-full md:w-0 md:h-40 my-4 md:my-0 mx-10"/>
                    <div className="flex flex-row items-center ">
                      <p className="text-slate-100 font-mono text-lg mr-5">Change Category to </p>
                      <Select label={"Category"} children={["Family", "Friends", "Business", "Others"]} id={selectedUser.user.id} setRefresh={setRefresh}/>
                    </div>
                  </div>
                  : <div className="w-full text-center">
                    <p className="text-slate-200 text-lg font-mono">Please select a user to see the details and edit category</p>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className="h-[300px] md:h-0"></div>
        <Footer />
      </div>
    </>
  )
}

function User({ user, handleItemClick }) {
  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-between cursor-pointer">
        <div className='flex flex-row items-center' onClick={() => handleItemClick(user)}>
          <Profile className='bg-slate-300' firstname={user.user.name} lastname={user.user.name} />
          <p className='ml-2 font-medium text-md text-slate-200' >{user.user.name}</p>
        </div>
        <div className='flex flex-row items-center justify-center ml-7'>
          <p className='text-slate-300 font-mono'>Category :</p>
          <p className='ml-1 text-cyan-500 font-mono'>{user.type.toUpperCase()}</p>
        </div>
      </div>
      { }
    </>
  )
}

export default SetUserDetails