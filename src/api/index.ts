import BaseAuthAPI from "./auth/auth.api";
import { ENTITIES_ENDPOINTS } from "./constants";
import BaseDepartmentsAPI from "./departments/departments.api";
import * as END_POINTS from './endpoints';
import BaseMeasurementAPI from "./measurement/measurement.api";
import BaseProductAPI from "./product/product.api";
import BaseProductTypesAPI from "./product/product_types.api";
import BaseProfilesAPI from "./profiles/profiles.api";
import BaseProviderAPI from "./provider/provider.api";
import BasePurchaseOrderAPI from "./purchaseOrder/purchaseOrder.api";
import BaseUserAPI from "./user/user.api";
import BaseWorkOrderAPI from "./workOrder/workOrder.api";
import BaseWorkRequestAPI from "./workRequest/workRequest.api";

const BASE_URL = import.meta.env.VITE_API_PATH;

export const ProductAPI = new BaseProductAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.products}`);
export const ProductTypesAPI = new BaseProductTypesAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.product_types}`);

export const ProvidersAPI = new BaseProviderAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.provider}`);

export const MeasurementAPI = new BaseMeasurementAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.measurements}`);
export const PurchaseOrderAPI = new BasePurchaseOrderAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.purchaseOrders}`);
export const WorkRequestAPI = new BaseWorkRequestAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.workRequests}`);
export const WorkOrderAPI = new BaseWorkOrderAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.workOrders}`);
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