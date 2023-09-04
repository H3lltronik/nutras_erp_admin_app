import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import { entityStatuses } from "../../../lib/entity.utils";
import { useProductsListPageStore } from "./products_list_page.store";

export default function ProductFilters() {
  const {
    setNameSearch,
    setCodeSearch,
    setProviderSearch,
    setDraftMode,
    setPublished,
  } = useProductsListPageStore((state) => state);

  const debouncedSetNameSearch = useMemo(
    () => debounce(setNameSearch, 300),
    [setNameSearch]
  );

  const debouncedSetCodeSearch = useMemo(
    () => debounce(setCodeSearch, 300),
    [setCodeSearch]
  );

  const debouncedSetProviderSearch = useMemo(
    () => debounce(setProviderSearch, 300),
    [setProviderSearch]
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetNameSearch(e.target.value);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetCodeSearch(e.target.value);

  const handleProviderChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetProviderSearch(e.target.value);

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
          <small>Busqueda por codigo</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleCodeChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por proveedor</small>
          <Input
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleProviderChange}
            allowClear
          />
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
