import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addImageApi} from "../../../api/entities/ImageApi";
import {useAuth} from "../../../api/auth/AuthContext";
import {getSellerByEmailApi} from "../../../api/entities/SellerApi";
import {Form, Formik} from "formik";
import ErrorField from "../../atoms/error/ErrorField";
import TextInputWithError from "../../atoms/input/TextInputWithError";
import SelectInputWithError from "../../atoms/input/SelectInputWithError";
import {getAllCategoriesApi} from "../../../api/entities/CategoryApi";
import {createProductSchema} from "../../../validators/createProductSchema";
import {createProductApi} from "../../../api/entities/ProductApi";


const CreateProductPageComponent = () => {

    const navigate = useNavigate();
    const {username} = useAuth();
    const [seller, setSeller] = useState();
    const [categories, setCategories] = useState();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState();

    const UNIT_OF_MEASURES = [
        {id: 0, name: "KILOGRAM"},
        {id: 1, name: "GRAM"},
        {id: 2, name: "ONE_UNIT"},
    ]

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddImage = () => {
        addImageApi(file)
            .then((res) => {
                console.log(res.data);
                setFileName(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const getCategoryList = () => {
        getAllCategoriesApi()
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (values) => {
        console.log("values", values)
        const selectedCategory = categories?.find(category => category.id === Number(values.categoryId));
        const selectedUnitOfMeasure = (UNIT_OF_MEASURES.find(unit => unit.id === Number(values.unitOfMeasure))).name;
        if(fileName) {
            createProductApi({
                name: values.name,
                description: values.description,
                imageName: fileName,
                price: Number(values.price),
                category: selectedCategory,
                seller: seller,
                unitOfMeasure: selectedUnitOfMeasure
            })
                .then((res) => {
                    console.log(res);
                    navigate(`/${seller?.alias}`);
                })
                .catch((err) => console.error(err));
        }

    }


    const getSellerByEmail = (email) => {
        getSellerByEmailApi(email)
            .then((res) => {
                setSeller(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getSellerByEmail(username);
        getCategoryList();
    }, []);

    const textForImageUpload = file ? "Replace image" : "Upload image";


    return (seller && categories) && (
        <div className="mx-auto mt-16 sm:mt-4 max-w-7xl px-10">
            <Link to={`/${seller?.alias}`} className="text-md font-semibold leading-6 text-inherit dark:text-inherit">
                <span aria-hidden="true">&larr;</span> Back to profile
            </Link>
            <div
                className="flex min-h-full flex-1 flex-col justify-center px-6 sm:py-6 lg:px-8 text-gray-900 dark:text-gray-100">
                <div className="mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg 2xl:max-w-xl">
                    <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight">
                        Add product
                    </h2>
                </div>

                <div className="mt-5 mx-auto w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg 2xl:max-w-xl">
                    <Formik
                        initialValues={{
                            name: "",
                            description: "",
                            price: 0,
                            categoryId: categories?.length > 0 ? categories[0].id : null,
                            unitOfMeasure: UNIT_OF_MEASURES[0].name,
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={createProductSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >

                        {({errors, validateField, setFieldTouched, setFieldValue, values}) => {

                            return (
                                <Form className="space-y-2">

                                    {Object.keys(errors).map((key, i) => (
                                        <div key={i}>
                                            <ErrorField errorName={errors[key]}/>
                                        </div>
                                    ))}

                                    <TextInputWithError fieldName={'name'}
                                                        errorName={errors.email}
                                                        labelName={'Product name'}
                                                        onBlur={() => validateField('name')}/>

                                    <TextInputWithError fieldName={'description'}
                                                        errorName={errors.description}
                                                        labelName={'Description'}
                                                        onBlur={() => validateField('description')}
                                                        fieldType={"textarea"}
                                    />
                                    <TextInputWithError fieldName={'price'}
                                                          errorName={errors.price}
                                                          labelName={'Price'}
                                                          onBlur={() => validateField('price')}/>

                                    <SelectInputWithError fieldName={'categoryId'}
                                                          errorName={errors.cateogryId}
                                                          labelName={'Category'}
                                                          onBlur={() => validateField('categoryId')}
                                                          options={categories}/>

                                    <SelectInputWithError fieldName={"unitOfMeasure"}
                                                          errorName={errors.unitOfMeasure}
                                                          labelName={"Unit of measure"}
                                                          onBlur={() => validateField("unitOfMeasure")}
                                                          options={UNIT_OF_MEASURES}
                                    />

                                    <div className="py-2 flex flex-row gap-2">
                                        {file === null && (
                                            <label
                                                className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Choose file
                                                <input
                                                    name=""
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        )}

                                        {file && (
                                            <button
                                                type="submit"
                                                className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() => handleAddImage()}
                                            >
                                                Upload
                                            </button>
                                        )}

                                        <div>
                                            {file &&
                                                <div className="flex flex-row gap-2 items-center">
                                                    <p className="mt-2">
                                                        Selected file: {file.name}
                                                    </p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth="1.5" stroke="currentColor"
                                                         className="w-6 h-6 pt-2 hover:text-indigo-600"
                                                         onClick={() => {
                                                             setFile(null)
                                                         }}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M6 18 18 6M6 6l12 12"/>
                                                    </svg>
                                                </div>

                                            }


                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add product
                                        </button>
                                    </div>
                                </Form>

                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default CreateProductPageComponent;