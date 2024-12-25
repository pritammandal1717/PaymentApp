import { useNavigate } from "react-router-dom"
import Profile from "./global/Profile"
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Button from "./global/Button";
import { toast } from 'sonner'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      name: 'Sign out', onClick: () => {
        localStorage.removeItem("token")
        toast.info("Logged Out")
        navigate("/")
      }
    },
  ]

  useEffect(() => {
    (async () => {
      const response = await axios.get("https://paymentapp-sqmb.onrender.com/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }).catch(() => {
        toast.info("Session Expired")
        navigate("/")
      })
      setUser(response.data)
    })()

  }, [])

  return (
    <header className="bg-black border-b-2 border-slate-600">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-4">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 text-slate-300 text-2xl font-bold">
            PayHere
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6 text-slate-400" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Button className="bg-transparent text-lg hover:text-cyan-300 hover:delay-100" children={"Dashboard"} onClick={
            () => navigate("/dashboard")
          } />
          <Button className="bg-transparent text-lg hover:text-cyan-300 hover:delay-100" children={"Send Money"} onClick={
            () => navigate("/sendmoney")
          } />
          <Button className="bg-transparent text-lg hover:text-cyan-300 hover:delay-100" children={"Set User Details"} onClick={
            () => navigate("/setuserdetails")
          } />
          <Button className="bg-transparent text-lg hover:text-cyan-300 hover:delay-100" children={"Analysis"} onClick={
            () => navigate("/analysis")
          } />
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex flex-row justify-center items-center">
            <p className="mx-1 text-slate-200 font-medium text-lg text-center font-mono">Hii, {String(user.name).split(" ")[0]}</p>
            <div className="ml-1 flex items-center md:ml-6">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs justify-center items-center rounded-full bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <Profile className='bg-slate-300 text-base' firstname={user.name} lastname={user.name} />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <button
                        onClick={item.onClick}
                        className="w-full block px-4 py-2 text-sm text-gray-100 data-[focus]:bg-gray-800 data-[focus]:outline-none"
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
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 text-slate-300 text-2xl font-bold">
              PayHere
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="flex flex-row mt-5 justify-center items-center">
                <p className="mx-1 text-slate-200 font-medium text-lg text-center font-mono">Hii, {String(user.name).split(" ")[0]}</p>
                <div className="ml-1 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs justify-center items-center rounded-full bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <Profile className='bg-slate-300 text-base' firstname={user.name} lastname={user.name} />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <button
                            onClick={item.onClick}
                            className="w-full block px-4 py-2 text-sm text-gray-200 data-[focus]:bg-gray-800 data-[focus]:outline-none"
                          >
                            {item.name}
                          </button>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="space-y-2 py-6 flex flex-col items-start">
                <Button className="bg-transparent text-lg hover:border hover:delay-100" children={"Dashboard"} onClick={
                  () => navigate("/dashboard")
                } />
                <Button className="bg-transparent text-lg hover:border hover:delay-100" children={"Send Money"} onClick={
                  () => navigate("/sendmoney")
                } />
                <Button className="bg-transparent text-lg hover:border hover:delay-100" children={"Set User Details"} onClick={
                  () => navigate("/setuserdetails")
                } />
                <Button className="bg-transparent text-lg hover:border hover:delay-100" children={"Analysis"} onClick={
                  () => navigate("/analysis")
                } />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}


export default NavBar