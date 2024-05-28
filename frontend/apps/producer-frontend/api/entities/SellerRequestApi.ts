import {api} from "components";

export const createSellerRequestApi = (sellerRequest:any) => {
    return api.post("/seller-request",
        sellerRequest
    );
}