import { useQuery } from "@tanstack/react-query";
import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import { DepartmentsAPI, ProfileAPI } from "../../../api";
import { entityStatuses } from "../../../lib/entity.utils";
import { useUsersListPageStore } from "./users_list_page.store";

export default function UsersFilters() {
  const {
    setNameSearch,
    setUsernameSearch,
    setProfileSearch,
    setDepartmentSearch,
    setDraftMode,
    setPublished,
  } = useUsersListPageStore((state) => state);

  const { data: profilesData, isLoading: loadingProfiles } = useQuery<
    GetProfilesResponse | APIError
  >(["profiles"], () => ProfileAPI.getProfiles());

  const { data: departmentsData, isLoading: loadingDepartments } = useQuery<
    GetDepartmentsResponse | APIError
  >(["departments"], () => DepartmentsAPI.getDepartments());

  const profiles = useMemo(() => {
    if (loadingProfiles || !profilesData) return [];
    if ("data" in profilesData) return profilesData.data;

    return [];
  }, [profilesData, loadingProfiles]);

  const departments = useMemo(() => {
    if (loadingDepartments || !departmentsData) return [];
    if ("data" in departmentsData) return departmentsData.data;

    return [];
  }, [departmentsData, loadingDepartments]);

  const debouncedSetNameSearch = useMemo(
    () => debounce(setNameSearch, 300),
    [setNameSearch]
  );

  const debouncedSetUsernameSearch = useMemo(
    () => debounce(setUsernameSearch, 300),
    [setUsernameSearch]
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetNameSearch(e.target.value);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetUsernameSearch(e.target.value);

  const handleProfileChange = (value: string) => setProfileSearch(value);

  const handleDepartmentChange = (value: string) => setDepartmentSearch(value);

  const handleStatusChange = (value: string[]) => {
    if (value.includes(entityStatuses.DRAFT)) setDraftMode(true);
    else setDraftMode(undefined);

    if (value.includes(entityStatuses.PUBLISHED)) setPublished(true);
    else setPublished(undefined);

    if (!value || value.length === 0) {
      setDraftMode(undefined);
      setPublished(undefined);
    }
  };

  return (
    <section className="flex items-center pb-2 gap-3">
      <>
        <div className="flex flex-col">
          <small>Busqueda por nombre</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleNameChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por usuario</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleUsernameChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por perfil</small>
          <Select
            loading={loadingProfiles}
            className="w-40"
            placeholder="Selecciona..."
            onChange={handleProfileChange}
            allowClear>
            {profiles.map((profile) => (
              <Select.Option key={profile.id} value={profile.id}>
                {profile.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <small>Busqueda por departamento</small>
          <Select
            loading={loadingDepartments}
            className="w-40"
            placeholder="Selecciona..."
            onChange={handleDepartmentChange}
            allowClear>
            {departments.map((department) => (
              <Select.Option key={department.id} value={department.id}>
                {department.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <small>Busqueda por status</small>
          <Select
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleStatusChange}
            mode="multiple"
            allowClear>
            <Select.Option value={entityStatuses.DRAFT}>
              {entityStatuses.DRAFT}
            </Select.Option>
            <Select.Option value={entityStatuses.PUBLISHED}>
              {entityStatuses.PUBLISHED}
            </Select.Option>
          </Select>
        </div>
      </>
    </section>
  );
}
