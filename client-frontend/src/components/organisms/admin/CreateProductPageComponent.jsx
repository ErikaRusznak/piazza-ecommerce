import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addImageApi} from "../../../api/entities/ImageApi";
import {useAuth} from "../../../api/auth/AuthContext";
import {getSellerByEmailApi} from "../../../api/entities/SellerApi";

const CreateProductPageComponent = () => {

    const navigate = useNavigate();
    const { username } = useAuth();
    const [sellerAlias, setSellerAlias] = useState();

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    console.log('file', file)
    const handleSubmit = () => {
        console.log('file inside', file)
        addImageApi(file)
            .then((res) => {
                console.log(res.data);
                navigate(`/${sellerAlias}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getSellerByEmail = (email) => {
        getSellerByEmailApi(email)
            .then((res) => {
                setSellerAlias(res.data.alias);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getSellerByEmail(username);
    }, []);

    return(
        <div className="mx-auto mt-16 max-w-7xl px-10">
            <Link to={`/${sellerAlias}`} className="text-md font-semibold leading-6 text-inherit dark:text-inherit">
                <span aria-hidden="true">&larr;</span> Back to profile
            </Link>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 sm:py-6 lg:px-8 text-gray-900 dark:text-gray-100">
                <div className="mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg 2xl:max-w-xl">
                    <h2 className="mt-20 text-center text-2xl font-bold leading-9 tracking-tight">
                        Add product
                    </h2>
                </div>

                <div className="mt-5 mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg 2xl:max-w-xl">
                    <form className="space-y-6" action="#" method="POST">
                        <label>
                            Choose Image:
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <button type="submit">Upload</button>

                        <div>
                            <button
                                type="button"
                                name="login"
                                onClick={handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>


                </div>
            </div>


        </div>
    )
}

export default CreateProductPageComponent;