import BaseAuthAPI from "./auth/auth.api";
import { ENTITIES_ENDPOINTS } from "./constants";
import * as END_POINTS from './endpoints';
import BaseProfilesAPI from "./profiles/profiles.api";
import BaseUserAPI from "./user/user.api";

const BASE_URL = import.meta.env.VITE_API_PATH;

export const UserAPI = new BaseUserAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.users}`);
export const ProfileAPI = new BaseProfilesAPI(`${BASE_URL}/${ENTITIES_ENDPOINTS.profiles}`);
export const AuthAPI = new BaseAuthAPI({
    forgotPasswordUrl: `${BASE_URL}/`,
    loginUrl: `${END_POINTS.login}`,
    meUrl: `${END_POINTS.me}`,
    logoutUrl: `${BASE_URL}/`,
    resetPasswordUrl: `${BASE_URL}/`,
});