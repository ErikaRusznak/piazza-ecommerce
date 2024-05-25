// api
import {api, baseURL} from "./api/ApiClient";
export { api, baseURL };

import { getAllCategoriesApi } from "./api/entities/CategoryApi";
export { getAllCategoriesApi };

import { addImageApi } from "./api/entities/ImageApi";
export { addImageApi };

import { getProductsApi, getProductByIdApi } from "./api/entities/ProductApi";
export { getProductsApi, getProductByIdApi };

import { getUserAccountByEmail, getUserRoleByEmail, updateUserAccountApi } from "./api/entities/UserAccount";
export { getUserAccountByEmail, getUserRoleByEmail, updateUserAccountApi };

import { getMessagesForSenderAndRecipientApi, markMessagesAsReadApi, getMessagesForGroupChatApi } from "./api/entities/ChatApi";
export { getMessagesForSenderAndRecipientApi, markMessagesAsReadApi, getMessagesForGroupChatApi }

import { getOrderByIdApi } from "./api/entities/OrderApi";
export { getOrderByIdApi };

import { getReviewsApi, getReviewByIdApi } from "./api/entities/ReviewApi";
export { getReviewsApi, getReviewByIdApi };

// hooks
import {useRouteAlias} from "./hooks/useRouteAlias";
import {useRouteId} from "./hooks/useRouteId";
import {useSessionStorage} from "./hooks/useSessionStorage";
export {useRouteAlias, useRouteId, useSessionStorage};

// providers
import AuthProvider, {useAuth} from "./providers/AuthContext";
export {AuthProvider, useAuth};

import AlertProvider, {useAlert} from "./providers/AlertContext";
export {AlertProvider, useAlert};

import WebSocketProvider, {useWebSocket} from "./providers/WebSocketContext";
export {WebSocketProvider, useWebSocket};

// services


// types


