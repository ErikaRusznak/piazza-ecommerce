import React from "react";
import {Field} from "formik";

const UserStatusRadio = ({errorName, labelName, radioItems, onBlur, onChange}) => {

    return (
        <div className="mt-2">
            <label className={` ${errorName ? 'text-red-600' : 'text-inherit'} block text-sm font-medium leading-6`}>
                {labelName}
            </label>


            <div className="flex justify-stretch">
                {radioItems && radioItems.map((radioItem, index) => (
                    <div key={index} className="flex items-center pe-4">
                        <label>
                            <Field type="radio" name="userStatus" value={radioItem.radioLabel}
                                   onBlur={onBlur}
                                   onChange={() => onChange(radioItem.radioLabel)}
                                   className="w-4 h-4 text-indigo-600 bg-zinc-100 border-zinc-300 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                            />
                            <span className="w-full py-2 ms-1 text-sm font-medium text-inherit">
                                {radioItem.radioLabel}
                            </span>
                        </label>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default UserStatusRadio;