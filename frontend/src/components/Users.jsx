import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputBox from './global/InputBox'
import Profile from './global/Profile'
import Button from './global/Button'
import axios from 'axios'

function Users() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null)

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
        toast.info("Session Expired")
        navigate("/")
      })
      setUsers(response.data.users)
    })()

  }, [filter, selectedUser])
  return (
    <div className='w-full h-full flex flex-col mt-10 p-2 md:p-5 border-t-2 rounded-md shadow-md'>
      <div className='text-xl text-slate-100'>
        <InputBox label={"Your Knowns"} placeholder={"Search users..."} onChange={async (e) => {
          setFilter(e.target.value);
        }} />
      </div>
      <div className='overflow-y-auto mt-5 h-full pr-2 [&::-webkit-scrollbar]:w-2
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700  dark:[&::-webkit-scrollbar-track]:rounded-md
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:[&::-webkit-scrollbar-thumb]:rounded-md'>
        {users ? users.map(user => <User key={user.id} user={user} handleItemClick={handleItemClick} />) : "No user Found"}
      </div>
    </div>
  )
}

function User({ user, handleItemClick }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-5 flex flex-row items-center justify-between">
        <div className='flex flex-row items-center' onClick={() => handleItemClick(user)}>
          <Profile className='bg-slate-300' firstname={user.user.name} lastname={user.user.name} />
          <p className='ml-2 font-medium text-md text-slate-200' >{user.user.name}</p>
        </div>
        <div>
          <Button className="bg-cyan-600 font-semibold" children={"Send Money"} onClick={() => {
            navigate("/send?id=" + user.user.id + "&name=" + user.user.name)
          }} />
        </div>
      </div>
      { }
    </>
  )
}

export default Users