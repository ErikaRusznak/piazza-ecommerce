import React from 'react'
import {useNavigate} from "react-router-dom";

const ProductSpecificInfo = ({label, information}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="font-bold text-base leading-4 text-zinc-600 dark:text-zinc-100">{label}</p>
                <div className={label === 'Producer' ? 'cursor-pointer hover:underline' : ''}
                     onClick={() => {
                         if (label === "Producer") {
                             navigate(`/${information}`)
                         }
                     }}>
                    {information}
                </div>
            </div>
            <hr className="bg-gray-200 w-full my-4"/>
        </div>
    )
}

export default ProductSpecificInfo;