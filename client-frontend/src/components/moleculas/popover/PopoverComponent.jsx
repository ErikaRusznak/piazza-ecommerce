import React, {Fragment, useRef} from "react";
import {Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {baseURL} from "../../../api/ApiClient";
import {Link, useNavigate} from "react-router-dom";

const PopoverComponent = ({popoverName, popoverItems}) => {

    const navigate = useNavigate();
    const callsToAction = [
        { name: 'See all', href: '/products/categories' },
    ];
    const buttonRef2 = useRef();

    const createQueryParam = (categoryName) => {
        const queryParams = new URLSearchParams()
        queryParams.set("categoryName", categoryName);
        const newSearch = queryParams.toString();
        navigate(`/products?${newSearch}`);
    }

    return (
        <Popover className="relative">
            <Popover.Button ref={buttonRef2} className="flex items-center gap-x-1 text-sm font-semibold leading-6">
                {popoverName}
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400 dark:text-inherit" aria-hidden="true" />
            </Popover.Button>

            <Transition
                className="text-inherit dark:text-inherit"
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-auto max-w-md overflow-hidden rounded-3xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-gray-900/5 dark:bg-opacity-70 dark:backdrop-blur-md bg-opacity-70 backdrop-blur-md">
                    <div className="p-2">
                        {popoverItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex items-center gap-x-4 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-zinc-900"
                            >
                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-transparent dark:group-hover:bg-transparent dark:bg-zinc-800">
                                    <img
                                        src={`${baseURL}${item.imageName}`}
                                        alt={item.name}
                                        className="h-6 w-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-100 dark:invert" aria-hidden="true"
                                    />
                                </div>
                                <div className="flex-auto">
                                    <div
                                        onClick={() => {
                                            buttonRef2.current?.click();
                                            createQueryParam(item.name);
                                        }}
                                        className="block font-semibold text-inherit dark:text-inherit"
                                    >
                                        {item.name}
                                        <span className="absolute inset-0" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols divide-gray-900/5 bg-gray-50 dark:bg-zinc-800">
                        {callsToAction.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center justify-center gap-x-2.5 p-3 text-xs font-semibold leading-6 text-blue-500 hover:bg-gray-100 dark:hover:bg-zinc-900"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default PopoverComponent;