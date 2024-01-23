import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../../api/auth/AuthContext';
import {getAllCategoriesApi} from "../../../api/entities/CategoryApi";
import '../../../styles/Header.css'
import {Dialog, Popover, Transition} from '@headlessui/react';
import {
    Bars3Icon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    UserCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
import LogoComponent from "../../atoms/logo/LogoComponent";
import CartIcon from "../../atoms/icons/CartIcon";
import PopoverComponent from "../popover/PopoverComponent";
import PopoverFavorites from "../popover/PopoverFavorites";
import PopoverForUser from "../popover/PopoverForUser";
import DisclosureComponent from "../popover/DisclosureComponent";
import {getSellerByEmailApi} from "../../../api/entities/SellerApi";

const accountDataClient = [
    {name: 'Orders', href: '/order-history', icon: ClipboardDocumentListIcon},
    {name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon},
];

const accountDataAdmin = [
    {name: 'Orders', href: '/alias/order-history', icon: ClipboardDocumentListIcon},
    {name: 'Settings', href: '/account/settings', icon: Cog6ToothIcon},
];

const callsToAction = [
    {name: 'See all', href: '/products/categories'},
];

export default function HeaderComponent() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [sellerAlias, setSellerAlias] = useState("");

    const {isAuthenticated, username, logout} = useAuth();
    const userRole = sessionStorage.getItem("userStatus");

    const location = useLocation()
    const buttonRef = useRef();

    const navigate = useNavigate()

    const getCategoryList = () => {
        getAllCategoriesApi()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    const getSellerByEmail = (email) => {
       getSellerByEmailApi(email)
           .then((res) => {
               setSellerAlias(res.data.alias);
           })
           .catch((err) => console.log(err));
    }

    useEffect(() => {
        getCategoryList();
        if(!!isAuthenticated && userRole === "ADMIN") {
            getSellerByEmail(username);
        } else {
            setSellerAlias("null");
        }
    }, [location, username]);


    const createQueryParam = (categoryName) => {
        const queryParams = new URLSearchParams()
        queryParams.set("categoryName", categoryName);
        const newSearch = queryParams.toString();
        navigate(`/products?${newSearch}`);
    }

    return (
        <header className="bg-white dark:bg-[#0F172A] shadow-md dark:shadow-sm dark:shadow-black sticky top-0 z-[1]">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8"
                 aria-label="Global">
                <div className="flex md:flex-1 lg:flex-1 xl:flex-1 2xl:flex-1">
                    <LogoComponent/>
                </div>
                <div className="flex md:hidden lg:hidden xl:hidden 2xl:hidden">
                    {(isAuthenticated && userRole==="CLIENT") &&
                        <PopoverFavorites/>
                    }
                    {(isAuthenticated && userRole==="CLIENT") &&
                        <CartIcon/>
                    }

                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-inherit"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>

                <Popover.Group
                    className="hidden md:flex md:gap-x-12 lg:flex lg:gap-x-12 xl:flex xl:gap-x-12 2xl:flex 2xl:gap-x-12 text-gray-900 dark:text-gray-100">
                    <PopoverComponent
                        popoverName="Category"
                        popoverItems={categories}
                    />

                    <Link to="/products" className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                        Shop
                    </Link>
                    {(!isAuthenticated || (isAuthenticated && userRole==="CLIENT")) &&
                        <Link to="/sellers" className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                            Sellers
                        </Link>
                    }
                    {(isAuthenticated && userRole==="ADMIN") &&
                        <Link  to={`/${sellerAlias}/products`} className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                            Products
                        </Link>
                    }
                    {(isAuthenticated && userRole==="ADMIN") &&
                        <Link to={`/${sellerAlias}`} className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                            Profile
                        </Link>
                    }
                </Popover.Group>


                <div
                    className="hidden md:flex md:flex-1 md:justify-end lg:flex lg:flex-1 lg:justify-end xl:flex xl:flex-1 xl:justify-end 2xl:flex 2xl:flex-1 2xl:justify-end text-inherit dark:text-inherit">

                    {(isAuthenticated && userRole==="CLIENT") &&
                        <PopoverFavorites/>
                    }
                    {isAuthenticated && userRole==="CLIENT" &&
                        <CartIcon/>
                    }

                    {isAuthenticated &&
                        <Popover className="relative mr-5 ">
                            <Popover.Button ref={buttonRef}
                                            className="inline-flex items-center gap-x-0 text-sm font-semibold leading-6 text-gray-900 dark:text-inherit">
                                <UserCircleIcon className="h-6 w-6" aria-hidden="true"/>
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >

                                <Popover.Panel className="absolute -left-20 top-full z-10 mt-3 w-auto max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-gray-900/5
                                dark:bg-opacity-70 dark:backdrop-blur-md bg-opacity-70 backdrop-blur-md">
                                    {userRole==="CLIENT" && <PopoverForUser accountData={accountDataClient}/>}
                                    {userRole==="ADMIN" && <PopoverForUser accountData={accountDataAdmin}/>}
                                </Popover.Panel>

                            </Transition>
                        </Popover>
                    }

                    {!isAuthenticated &&
                        <Link to="/login" className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </Link>
                    }
                </div>
            </nav>

            {/*TODO transition now working on dialog*/}
            <Transition show={mobileMenuOpen}
                        as={Fragment}
            >
                <Dialog as="div" className="lg:hidden xl:hidden 2xl:hidden" open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10"/>
                    <Dialog.Panel className="
                        fixed inset-y-0 right-0 z-10 w-full overflow-y-auto
                        bg-white dark:bg-zinc-800 dark:bg-opacity-90 dark:backdrop-blur-md bg-opacity-90 backdrop-blur-md
                        px-6 py-6
                        sm:max-w-sm sm:ring-1 sm:ring-gray-900/10
                        text-gray-900 dark:text-gray-100">

                        <div className="flex justify-end text-inherit dark:text-inherit">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 pt-3.5 text-gray-700 dark:text-inherit"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>

                        <div className="mt-6 flow-root text-inherit dark:text-inherit">
                            <div className="-my-6 divide-y divide-gray-500/10 text-inherit dark:text-inherit">
                                <div className="space-y-2 py-6 text-inherit dark:text-inherit">
                                    <DisclosureComponent
                                        disclosureName="Category">

                                        {categories.map((item) => (
                                            <div
                                                onClick={() => {
                                                    setMobileMenuOpen(false)
                                                    createQueryParam(item.name);
                                                }}
                                                key={item.name}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                        {callsToAction.map((item) => (
                                            <Link
                                                onClick={() => setMobileMenuOpen(false)}
                                                key={item.name}
                                                to={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-blue-500 hover:bg-gray-50 dark:hover:bg-zinc-900"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </DisclosureComponent>
                                    <Link
                                        to="/products"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                    >
                                        Shop
                                    </Link>
                                    { (!isAuthenticated || (isAuthenticated && userRole==="CLIENT")) && (
                                        <Link
                                            to="/sellers"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Sellers
                                        </Link>
                                    )}
                                    { userRole==="ADMIN" && (
                                        <Link
                                            to={`/${sellerAlias}/products`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Products
                                        </Link>
                                    )}
                                    { userRole==="ADMIN" && (
                                        <Link
                                            to={`/${sellerAlias}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Profile
                                        </Link>
                                    )}


                                </div>
                                <div className="py-6">

                                    {(isAuthenticated && userRole==="CLIENT") &&
                                        <Link
                                            onClick={() => setMobileMenuOpen(false)}
                                            to="/account/favorites"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Favorites
                                        </Link>
                                    }
                                    {(isAuthenticated && userRole==="CLIENT") &&
                                        <Link
                                            onClick={() => setMobileMenuOpen(false)}
                                            to="/account/cart"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Cart
                                        </Link>
                                    }

                                    {!isAuthenticated &&
                                        <Link
                                            onClick={() => setMobileMenuOpen(false)}
                                            to="/login"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        >
                                            Log in
                                        </Link>
                                    }

                                    {isAuthenticated &&

                                        <DisclosureComponent
                                            disclosureName="Account">

                                            {userRole==="CLIENT" && accountDataClient.map((item) => (
                                                <Link
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    key={item.name}
                                                    to={item.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}

                                            {userRole==="ADMIN" && accountDataAdmin.map((item) => (
                                                <Link
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    key={item.name}
                                                    to={item.href}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}

                                            <hr
                                                className="my-1 h-0.5 border-t-0 bg-neutral-100 dark:bg-neutral-700 opacity-100 dark:opacity-50"/>

                                            <button
                                                onClick={() => {
                                                    setMobileMenuOpen(false)
                                                    logout()
                                                }}
                                                className="flex w-full rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900"
                                            >
                                                Logout
                                            </button>
                                        </DisclosureComponent>


                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </Transition>
        </header>
    )
}
