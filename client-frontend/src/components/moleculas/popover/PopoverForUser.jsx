import React, {useRef} from "react";
import {Link} from "react-router-dom";
import {ArrowLeftOnRectangleIcon, ClipboardDocumentListIcon, Cog6ToothIcon} from "@heroicons/react/24/outline";
import {useAuth} from "../../../api/auth/AuthContext";


const accountData = [
    { name: 'Orders', href: '/account/orders', icon: ClipboardDocumentListIcon },
    { name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon },
];

const PopoverForUser = () => {

    const buttonRef = useRef();
    const { logout } = useAuth();

    return (
        <div className="p-2">
            {accountData.map((item) => (
                <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-zinc-900"
                >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-transparent dark:bg-zinc-800">
                        <item.icon className="h-6 w-6 text-gray-600 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-100" aria-hidden="true" />
                    </div>
                    <div className="flex-auto">
                        <Link onClick={() => buttonRef.current?.click()}
                              to={item.href}
                              className="block font-semibold text-gray-900 dark:text-inherit">
                            {item.name}
                            <span className="absolute inset-0" />
                        </Link>
                    </div>
                </div>
            ))}

            <hr
                className="my-1 h-0.5 border-t-0 bg-neutral-100 dark:bg-neutral-700 opacity-100 dark:opacity-50" />

            <div
                className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-transparent group-hover:bg-transparent dark:bg-zinc-800">
                    <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-600 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-100" aria-hidden="true" />
                </div>
                <div className="flex-auto">
                    <button
                        onClick={() => {
                            buttonRef.current?.click()
                            logout()
                        }}
                        className="block font-semibold text-gray-900 dark:text-inherit">
                        Log out
                        <span className="absolute inset-0" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopoverForUser;