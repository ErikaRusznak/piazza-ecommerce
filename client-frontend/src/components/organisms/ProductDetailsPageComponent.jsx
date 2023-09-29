import React, {useEffect, useState} from 'react'
import ProductInformation from "../moleculas/productInformation/ProductInformation";
import useBreakpoint from "../../hooks/useBreakpoint";
import '../../styles/ProductDetailsComponent.css'
import StarReviewsReadOnly from "../atoms/starReviews/StarReviewsReadOnly";
import ProductHistorySteps from "../atoms/products/ProductHistorySteps";
import image from "../moleculas/mango.jpg";
import ReviewsList from "../moleculas/ReviewsList";
import {getProductByIdApi} from "../../api/ProductApi";
import {useParams} from "react-router-dom";

const ProductDetailsPageComponent = () => {

    const breakpoint = useBreakpoint()
    const {productId} = useParams();
    const [product, setProduct] = useState(null);

    const getProduct = (productId) => {
        getProductByIdApi(productId)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getProduct(productId);
    }, []);

    return (
        product && (<div className="mx-auto mt-16 max-w-7xl px-10">
            <div className={`flex justify-center items-center ${breakpoint === 'sm' ? 'sm:flex-col' : ''} gap-8`}>

                <div className="w-full items-center grid-wrapper">

                    <div className="grid-header">
                        <p className="font-normal leading-4 text-zinc-600 dark:text-zinc-300">
                            <ProductHistorySteps
                                categoryName={product.category.name}
                                productName={product.name}
                            />
                        </p>
                        <h2 className="font-semibold text-3xl leading-7 text-zinc-800 mt-4 dark:text-zinc-100">
                            Wooden Stool
                        </h2>
                    </div>

                    <div className="mt-4 block grid-reviews ">
                        <StarReviewsReadOnly/>
                    </div>


                    <div className={`${breakpoint === 'sm' ? 'grid-details' : 'flex'} mt-4`}>
                        <div className={` ${breakpoint === 'sm' ? 'mb-4' : 'flex-shrink-0'}`}>
                            <div className="flex justify-center items-center w-full h-full pr-2 border-r sm:border-none sm:mt-4">
                                <img
                                    src={image}
                                    alt="Apple"
                                    className="w-[30rem] md:w-[22rem]"/>
                            </div>
                        </div>

                        <div className={` ${breakpoint === 'sm' ? 'ml-0' : 'flex-grow ml-8'}`}>
                            <ProductInformation/>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center w-full">
                <div
                    className="w-full mt-10">
                    <ReviewsList />
                </div>
            </div>
        </div>)
    );
};

export default ProductDetailsPageComponent;