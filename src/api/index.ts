import BaseAuthAPI from "./auth/auth.api";
import { ENTITIES_ENDPOINTS } from "./constants";
import * as END_POINTS from './endpoints';
import BaseMeasurementAPI from "./measurement/measurement.api";
import BaseProductAPI from "./product/product.api";
import BaseUserAPI from "./user/user.api";

const BASE_URL = import.meta.env.VITE_API_PATH;

export const MeasurementAPI = new BaseMeasurementAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.measurements}`);
export const ProductAPI = new BaseProductAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.products}`);
export const UserAPI = new BaseUserAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.users}`);
export const AuthAPI = new BaseAuthAPI({
    forgotPasswordUrl: `${BASE_URL}/`,
    loginUrl: `${END_POINTS.login}`,
    meUrl: `${END_POINTS.me}`,
    logoutUrl: `${BASE_URL}/`,
    resetPasswordUrl: `${BASE_URL}/`,
});