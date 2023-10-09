import React from 'react'
import {useNavigate} from "react-router-dom";

const NoEntityMessageComponent = ({header, paragraph}) => {

    const navigate = useNavigate();

    return (
        <div>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 lg:px-8 dark:bg-[#0F172A]">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-xl dark:text-zinc-100">{header}</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-zinc-300">{paragraph}</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => navigate("/")}
                        >
                            Go back home
                        </button>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default NoEntityMessageComponent;