import BaseAuthAPI from "./auth/auth.api";
import { ENTITIES_ENDPOINTS } from "./constants";
import BaseDepartmentsAPI from "./departments/departments.api";
import * as END_POINTS from './endpoints';
import BaseMeasurementAPI from "./measurement/measurement.api";
import BaseProductAPI from "./product/product.api";
import BaseProfilesAPI from "./profiles/profiles.api";
import BaseUserAPI from "./user/user.api";
import BasePurchaseOrderAPI from "./purchaseOrder/purchaseOrder.api";
import BaseWorkRequestAPI from "./workRequest/workRequest.api";

const BASE_URL = import.meta.env.VITE_API_PATH;

export const MeasurementAPI = new BaseMeasurementAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.measurements}`);
export const ProductAPI = new BaseProductAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.products}`);
export const PurchaseOrderAPI = new BasePurchaseOrderAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.purchaseOrders}`);
export const WorkRequestAPI = new BaseWorkRequestAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.workRequests}`);
export const UserAPI = new BaseUserAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.users}`);
export const ProfileAPI = new BaseProfilesAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.profiles}`);
export const DepartmentsAPI = new BaseDepartmentsAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.departments}`);

export const AuthAPI = new BaseAuthAPI({
    forgotPasswordUrl: `${BASE_URL}/`,
    loginUrl: `${END_POINTS.login}`,
    meUrl: `${END_POINTS.me}`,
    logoutUrl: `${BASE_URL}/`,
    resetPasswordUrl: `${BASE_URL}/`,
});