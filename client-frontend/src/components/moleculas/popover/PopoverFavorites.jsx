import React, {Fragment} from "react";
import {Popover, Transition} from "@headlessui/react";
import {HeartIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {baseURL} from "../../../auth/ApiClient";
import {useFavorite} from "../../../contexts/FavoriteContext";

const PopoverFavorites = () => {

    const {allFavorites, numberOfFavorites, removeFromFavorite} = useFavorite();
    const favoriteDeleteButton = (productId) => {
        removeFromFavorite(productId)
    }
    return (
        <Popover className="relative mr-6">
            <Popover.Button
                className="inline-flex items-center gap-x-0 text-sm font-semibold leading-6 text-gray-900 dark:text-inherit"
            >
                <HeartIcon strokeWidth="2" className="h-6 w-6 text-gray-900 dark:text-inherit" aria-disabled="true"/>
                {numberOfFavorites!==0 &&
                    <div className="absolute inline-flex items-center justify-center
                                             w-4 h-4
                                             text-xxs font-bold text-white bg-red-500 border-0 border-white rounded-full
                                             -top-2 -right-2
                                             dark:border-gray-900">
                        {numberOfFavorites}
                    </div>
                }
            </Popover.Button>

            {numberOfFavorites!==0 &&
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-900"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                >

                    <Popover.Panel className="
                                       absolute -left-20 mt-2 top-full z-10 rounded-3xl bg-white
                                       dark:bg-zinc-800 shadow-lg ring-1 ring-gray-900/5
                                        dark:bg-opacity-70 dark:backdrop-blur-md bg-opacity-70 backdrop-blur-md"
                    >
                        <div className="p-2">
                            {allFavorites.map((item) => (

                                /**
                                 * @param {{
                                 *     seller:{
                                 *         alias
                                 *     },
                                 *     name,
                                 *     imageName
                                 * }} item
                                 */

                                <div
                                    key={item.id}
                                    className="relative flex items-center justify-between gap-x-2 rounded-lg text-sm leading-6"
                                >
                                    <Link to={`/${item.seller.alias}/products/${item.name}`}
                                          className="flex items-center gap-x-6 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg p-2">
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-transparent dark:bg-zinc-800">
                                            <img className="h-6 w-6"
                                                 alt=""
                                                 src={`${baseURL}${item.imageName}`}
                                            />
                                        </div>

                                        <div className="flex-auto max-w-[118px] w-max">
                                            <div className="block font-semibold text-gray-900 dark:text-inherit truncate">
                                                {item.name}
                                                <div>{item.price} RON</div>
                                            </div>
                                        </div>
                                    </Link>

                                    <button className="flex h-11 w-11 flex-none items-center justify-center rounded-lg
                                                            text-gray-600 transition hover:text-red-600 hover:bg-gray-50 dark:hover:bg-zinc-900"
                                            onClick={()=>favoriteDeleteButton(item.id)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>

                            ))}
                        </div>
                    </Popover.Panel>

                </Transition>
            }
        </Popover>
    )
}

export default PopoverFavorites;