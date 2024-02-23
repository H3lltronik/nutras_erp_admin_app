import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import { entityStatuses } from "../../../lib/entity.utils";
import { useProvidersListPageStore } from "./providers_list_page.store";

export default function ProviderFilters() {
  const { setNameSearch, setCodeSearch, setRFCSearch, setDraftMode, setPublished, setDeleted } =
    useProvidersListPageStore((state) => state);

  const debouncedSetNameSearch = useMemo(
    () => debounce(setNameSearch, 300),
    [setNameSearch]
  );

  const debouncedSetCodeSearch = useMemo(
    () => debounce(setCodeSearch, 300),
    [setCodeSearch]
  );

  const debouncedSetRFCSearch = useMemo(
    () => debounce(setRFCSearch, 300),
    [setRFCSearch]
  );

  const handleStatusChange = (value: string[]) => {
    if (value?.includes(entityStatuses.DRAFT)) setDraftMode(true);
    else setDraftMode(undefined);

    if (value?.includes(entityStatuses.PUBLISHED)) setPublished(true);
    else setPublished(undefined);

    if (value?.includes(entityStatuses.DELETED)) setDeleted(true);
    else setDeleted(undefined);

    if (!value || value.length === 0) {
      setDraftMode(undefined);
      setPublished(undefined);
      setDeleted(undefined);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetNameSearch(e.target.value);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetCodeSearch(e.target.value);

  const handleRFCChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetRFCSearch(e.target.value);

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
          <small>Busqueda por codigo</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleCodeChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por RFC</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleRFCChange}
            allowClear
          />
        </div>

        <div className={`flex flex-col`}>
          <small>Busqueda por status</small>
          <Select
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleStatusChange}
            allowClear>
            <Select.Option value={entityStatuses.DRAFT}>
              {entityStatuses.DRAFT}
            </Select.Option>
            <Select.Option value={entityStatuses.PUBLISHED}>
              {entityStatuses.PUBLISHED}
            </Select.Option>
            <Select.Option value={entityStatuses.DELETED}>
              {entityStatuses.DELETED}
            </Select.Option>
          </Select>
        </div>
      </>
    </section>
  );
}
