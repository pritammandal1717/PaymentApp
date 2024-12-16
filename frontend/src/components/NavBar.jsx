import { useNavigate } from "react-router-dom"
import Profile from "./Profile"
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Button from "./Button";

function NavBar() {
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const userNavigation = [
    {
      name: 'Your Profile', onClick: () => {
        localStorage.removeItem("token")
        navigate("/")
      }
    },
    {
      name: 'Settings', onClick: () => {
        localStorage.removeItem("token")
        navigate("/")
      }
    },
    {
      name: 'Sign out', onClick: () => {
        localStorage.removeItem("token")
        navigate("/")
      }
    },
  ]
  useEffect(() => {
    (async () => {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).catch(() => {
        navigate("/signin")
      })
      setUser(response.data)
    })()

  }, [])
  return (
    <div className="top-0 flex flex-row justify-between px-5 md:px-20 items-center bg-black border-b-2 border-b-gray-600">
      <p className="text-slate-300 font-semibold text-2xl my-5">PAYHere</p>
      <div className="">
        <Button className="bg-transparent text-lg mx-10" children={"Dashboard"} onClick={
          () => navigate("/dashboard")
        } />
        <Button className="bg-transparent text-lg mx-10" children={"Send Money"} onClick={
          () => navigate("/sendmoney")
        } />
        <Button className="bg-transparent text-lg mx-10" children={"Set User Details"} onClick={
          () => navigate("/setuserdetails")
        }/>
        <Button className="bg-transparent text-lg mx-10" children={"Analysis"} onClick={
          () => navigate("/analysis")
        }/>
      </div>
      <div className="flex flex-row mr-5 justify-center items-center">
        <p className="mx-1 text-slate-300 font-medium text-lg text-center font-mono">Hii, {String(user.name).split(" ")[0]}</p>
        <div className="ml-1 flex items-center md:ml-6">
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Profile className='bg-slate-200 rounded-full' firstname={user.name} lastname={user.name} />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {userNavigation.map((item) => (
                <MenuItem key={item.name}>
                  <button
                    onClick={item.onClick}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    {item.name}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default NavBar