import BigContainer from "../atoms/containers/BigContainer";
import {useParams} from "react-router-dom";

function OrderSuccessfulPageComponent() {

    const {fullOrderId} = useParams();
    return (
        <BigContainer>
            <div className="border border-blue-50 w-[500px] h-[500px] flex justify-center">
                <div className="w-full">

                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth="1"
                             stroke="currentColor" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>

                    </div>

                    <div className="flex justify-center">
                        Order successful!
                    </div>
                </div>
            </div>

         </BigContainer>
    )
}

export default OrderSuccessfulPageComponent