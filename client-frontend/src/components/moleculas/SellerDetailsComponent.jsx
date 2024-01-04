import React from 'react';

const SellerDetailsComponent = ({seller, username}) => {

    return (
        <div className="col-span-2 sm:col-span-full">
            <div className=" md:block sm:block mb-6 text-center">
                <div className="font-bold text-3xl sm:text-2xl mb-2">{seller.alias}</div>
                <div className="font-bold text-xl sm:text-lg mb-3">{seller.sellerType}</div>
            </div>

            <div className="ml-6 sm:ml-0">
                <div className="font-bold text-lg mb-2">Contact details</div>
                <div><span className="font-semibold">Address Line 1:</span> {seller.addressLine1}</div>
                <div><span className="font-semibold">Address Line 2:</span> {seller.addressLine2}</div>
                <div><span className="font-semibold">City:</span> {seller.city}</div>
                <div><span className="font-semibold">State:</span> {seller.state}</div>
                <div><span className="font-semibold">Country:</span> {seller.country}</div>
                <div><span className="font-semibold">Zipcode:</span> {seller.zipCode}</div>
                <hr className="my-4" />

                <div className="font-bold text-lg mb-2">Account details</div>
                {username === seller.account.email && (
                    <>
                        <div><span className="font-semibold">First name:</span> {seller.account.firstName}</div>
                        <div><span className="font-semibold">Last name:</span> {seller.account.lastName}</div>
                    </>
                )}
                <div><span className="font-semibold">Email:</span> {seller.account.email}</div>
                <div><span className="font-semibold">Telephone:</span> {seller.account.telephone}</div>

                {(seller.sellerType === "COMPANY" || seller.sellerType === "PFA") && (
                    <>
                        <hr className="my-4" />
                        <div className="font-bold text-lg mb-2">Legal details</div>
                        <div><span className="font-semibold">Company Type:</span> {seller.sellerType}</div>
                        <div><span className="font-semibold">Company Name:</span> {seller.companyName}</div>
                        <div><span className="font-semibold">CUI:</span> {seller.cui}</div>
                        <div><span className="font-semibold">Date of registration:</span> {seller.dateOfRegistration}</div>
                    </>
                )}

            </div>
        </div>
    )
}

export default SellerDetailsComponent;