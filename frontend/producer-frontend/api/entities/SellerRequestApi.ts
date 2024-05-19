import {api} from "../ApiClient";

export const createSellerRequestApi = (sellerRequest:any) => {
    return api.post("/seller-request",
        sellerRequest
    );
}