import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios';

export default function Select({ label, children, id, setRefresh }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-tranparent px-3 py-2 text-sm font-semibold text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300">
                    {label}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-transparent shadow-2xl ring-1 ring-white/30 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1 flex flex-row md:flex-col">
                    <MenuItem>
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                let data = `{\r\n    "recipientId" : "${id}",\r\n    "newType" : "family"\r\n}`;

                                let config = {
                                    method: 'put',
                                    maxBodyLength: Infinity,
                                    url: 'https://paymentapp-sqmb.onrender.com/api/v1/user/update-relationship-type',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer " + localStorage.getItem("token")
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then(() => {
                                        setRefresh(r => !r)
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            {children[0]}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                let data = `{\r\n    "recipientId" : "${id}",\r\n    "newType" : "friend"\r\n}`;

                                let config = {
                                    method: 'put',
                                    maxBodyLength: Infinity,
                                    url: 'https://paymentapp-sqmb.onrender.com/api/v1/user/update-relationship-type',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer " + localStorage.getItem("token")
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then(() => {
                                        setRefresh(r => !r)
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            {children[1]}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                let data = `{\r\n    "recipientId" : "${id}",\r\n    "newType" : "business"\r\n}`;

                                let config = {
                                    method: 'put',
                                    maxBodyLength: Infinity,
                                    url: 'https://paymentapp-sqmb.onrender.com/api/v1/user/update-relationship-type',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer " + localStorage.getItem("token")
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then(() => {
                                        setRefresh(r => !r)
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            {children[2]}
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button
                            type="submit"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            onClick={() => {
                                let data = `{\r\n    "recipientId" : "${id}",\r\n    "newType" : "others"\r\n}`;

                                let config = {
                                    method: 'put',
                                    maxBodyLength: Infinity,
                                    url: 'https://paymentapp-sqmb.onrender.com/api/v1/user/update-relationship-type',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': "Bearer " + localStorage.getItem("token")
                                    },
                                    data: data
                                };

                                axios.request(config)
                                    .then(() => {
                                        setRefresh(r => !r)
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}
                        >
                            {children[3]}
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
