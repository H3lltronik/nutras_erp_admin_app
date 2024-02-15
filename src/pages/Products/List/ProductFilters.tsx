import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { GetProductsParams } from "../../../api/product/product.api";
import { entityStatuses } from "../../../lib/entity.utils";
import { useProductsListPageStore } from "./products_list_page.store";

export type AvailableProductFilters = {
  name?: boolean;
  code?: boolean;
  provider?: boolean;
  status?: boolean;
  kosher?: boolean;
  allergen?: boolean;
  productTypes?: boolean;
};
type ProductFiltersProps = {
  disabledFilters?: AvailableProductFilters;
  defaultFilters?: GetProductsParams;
};
export const ProductFilters: React.FC<ProductFiltersProps> = (
  props: ProductFiltersProps
) => {
  const disabledFilters = props.disabledFilters || {};

  const {
    setNameSearch,
    setCodeSearch,
    setProviderSearch,
    setDraftMode,
    setDeleted,
    setPublished,
  } = useProductsListPageStore((state) => state);

  useEffect(() => {
    if (props.defaultFilters) {
      if (props.defaultFilters.draftMode !== undefined)
        setDraftMode(props.defaultFilters.draftMode);
    }
  }, [
    props.defaultFilters,
    setCodeSearch,
    setDraftMode,
    setNameSearch,
    setProviderSearch,
    setPublished,
  ]);

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

    if (value.includes(entityStatuses.DELETED)) setDeleted(true);
    else setDeleted(undefined);

    if (!value || value.length === 0) {
      setDraftMode(undefined);
      setPublished(undefined);
      setDeleted(undefined);
    }
  };

  return (
    <section className="flex items-center pb-2 gap-3">
      <>
        <div className="flex flex-col">
          <small>Busqueda por nombre</small>
          <Input
            disabled={disabledFilters.name}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleNameChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por codigo</small>
          <Input
            disabled={disabledFilters.code}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleCodeChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por proveedor</small>
          <Input
            disabled={disabledFilters.provider}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleProviderChange}
            allowClear
          />
        </div>

        <div className="flex flex-col">
          <small>Busqueda por status</small>
          <Select
            disabled={disabledFilters.status}
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
            <Select.Option value={entityStatuses.DELETED}>
              {entityStatuses.DELETED}
            </Select.Option>
          </Select>
        </div>
      </>
    </section>
  );
};
