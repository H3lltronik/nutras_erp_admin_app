import BaseAPI from "../common/ApiBase";

class BaseDepartmentsAPI extends BaseAPI {

    async getDepartments(params?: QueryParams): Promise<GetDepartmentsResponse | APIError> {
        return this.get<GetDepartmentsResponse>("", params);
      }

    
}

export default BaseDepartmentsAPI;
