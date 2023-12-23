import React from "react";
import {Link} from "react-router-dom";

const AdminLandingPageComponent = () => {
    return (
        <div className="bg-transparent dark:bg-transparent">
            <div className="px-6 pt-14 lg:px-8 xl:px-10 2xl:px-12 sm:pt-0 text-gray-900 dark:text-gray-100">
                <div className="mx-auto max-w-2xl py-32 lg:py-32 md:py-32 lg:max-w-2xl md:max-w-xl">
                    <div className="text-center bg-transparent text-inherit dark:text-inherit">
                        <h1 className="text-4xl font-bold tracking-tight text-inherit dark:text-inherit">
                            Welcome, Admin!
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
                            Manage your online store efficiently with our admin tools.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                to="/products/:sellerAlias"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Manage products
                            </Link>
                            <Link to="/orders/:sellerAlias" className="text-sm font-semibold leading-6 text-inherit dark:text-inherit">
                                Check orders <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminLandingPageComponent;