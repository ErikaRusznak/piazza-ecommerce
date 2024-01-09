import React from "react";
import { Field } from "formik";

const SelectInputWithError = ({ fieldName, errorName, labelName, onBlur, options }) => {
    return (
        <div>
            <label className={` block text-sm font-medium leading-6`}>
                {labelName}
            </label>
            <div className="mt-2">
                <Field
                    as="select"
                    name={fieldName}
                    className={` ${errorName ? 'ring-red-500 dark:ring-red-500' : 'ring-gray-300 dark:ring-gray-800'} 
                    dark:bg-[#192235] block w-full rounded-md 
                    border-0 py-1.5 shadow-sm 
                    ring-1 ring-inset
                    placeholder:text-gray-400  
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                    sm:text-sm sm:leading-6
                  `}
                    onBlur={onBlur}
                >
                    {options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </Field>
            </div>
        </div>
    );
};

export default SelectInputWithError;
