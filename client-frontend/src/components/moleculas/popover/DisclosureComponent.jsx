import React from "react";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const DisclosureComponent = ({disclosureName, children}) => {

    return (
        <Disclosure as="div" className="-mx-3">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-inherit dark:text-inherit hover:bg-gray-50 dark:hover:bg-zinc-900">
                        {disclosureName}
                        <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 space-y-2 text-inherit dark:text-inherit">
                        {children}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default DisclosureComponent;