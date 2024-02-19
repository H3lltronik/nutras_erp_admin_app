import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { ProductPresentationAPI, ProductTypesAPI } from "../../../api";
import { GetProductsParams } from "../../../api/product/product.api";
import { GenericSelect } from "../../../components/Forms/Common/GenericSelect";
import useSyncSearchParams from "../../../hooks/useSyncSearchParams";
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
  presentations?: boolean;
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
    setKosher,
    setAllergen,
    setProductTypes,
    setPresentations,
  } = useProductsListPageStore((state) => state);

  const {
    nameSearch,
    codeSearch,
    providerSearch,
    draftMode,
    deleted,
    published,
    kosher,
    allergen,
    productTypes,
  } = useProductsListPageStore((state) => state);

  useSyncSearchParams([
    {
      key: "name",
      value: nameSearch,
      updater: setNameSearch,
      dataType: "string",
    },
    {
      key: "code",
      value: codeSearch,
      updater: setCodeSearch,
      dataType: "string",
    },
    {
      key: "provider",
      value: providerSearch,
      updater: setProviderSearch,
      dataType: "string",
    },
    {
      key: "draftMode",
      value: draftMode,
      updater: setDraftMode,
      dataType: "boolean",
    },
    {
      key: "deleted",
      value: deleted,
      updater: setDeleted,
      dataType: "boolean",
    },
    {
      key: "published",
      value: published,
      updater: setPublished,
      dataType: "boolean",
    },
    { key: "kosher", value: kosher, updater: setKosher, dataType: "boolean" },
    {
      key: "allergen",
      value: allergen,
      updater: setAllergen,
      dataType: "boolean",
    },
    {
      key: "productTypes",
      value: productTypes,
      updater: setProductTypes,
      dataType: "stringArray",
    },
  ]);

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
    setKosher,
    setAllergen,
    setProductTypes,
    setPresentations,
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

  const handleKosherChange = (value: string | undefined) => {
    let booleanValue: boolean | undefined =
      value === "true" ? true : value === "false" ? false : undefined;
    setKosher(booleanValue);
  };

  const handleAllergenChange = (value: string | undefined) => {
    let booleanValue: boolean | undefined =
      value === "true" ? true : value === "false" ? false : undefined;
    setAllergen(booleanValue);
  };

  const handleProductTypesChange = (value: string | string[]) => {
    if (Array.isArray(value)) setProductTypes(value);
  };

  const hanldeProductPresentationsChange = (value: string | string[]) => {
    if (Array.isArray(value)) setPresentations(value);
  };

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

  const status = draftMode
    ? [entityStatuses.DRAFT]
    : published
    ? [entityStatuses.PUBLISHED]
    : deleted
    ? [entityStatuses.DELETED]
    : undefined;

  return (
    <section className="flex flex-wrap items-center pb-2 gap-3">
      <>
        <div className={`flex flex-col ${disabledFilters.name ? 'hidden' : ''}`}>
          <small>Busqueda por nombre</small>
          <Input
            disabled={disabledFilters.name}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleNameChange}
            allowClear
            value={nameSearch}
          />
        </div>

        <div className={`flex flex-col ${disabledFilters.code ? 'hidden' : ''}`} style={{ flexBasis: "200px" }}>
          <small>Busqueda por código</small>
          <Input
            disabled={disabledFilters.code}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleCodeChange}
            allowClear
            value={codeSearch}
          />
        </div>

        <div className={`flex flex-col ${disabledFilters.provider ? 'hidden' : ''}`}>
          <small>Busqueda por proveedor</small>
          <Input
            disabled={disabledFilters.provider}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleProviderChange}
            allowClear
            value={providerSearch}
          />
        </div>

        <div className={`flex flex-col ${disabledFilters.productTypes ? 'hidden' : ''}`} style={{ flexBasis: "200px" }}>
          <small>Busqueda por tipo</small>
          <GenericSelect
            disabled={disabledFilters.productTypes}
            fetcher={() => ProductTypesAPI.getProductTypes()}
            multiple={true}
            onChange={handleProductTypesChange}
            placeholder="Busqueda..."
            optionLabel="description"
            optionKey={"id"}
            queryKey={["productTypes"]}
          />
        </div>

        <div className={`flex flex-col ${disabledFilters.presentations ? 'hidden' : ''}`} style={{ flexBasis: "200px" }}>
          <small>Busqueda por presentación</small>
          <GenericSelect
            disabled={disabledFilters.presentations}
            fetcher={() => ProductPresentationAPI.getProductPresentations()}
            multiple={true}
            onChange={hanldeProductPresentationsChange}
            placeholder="Busqueda..."
            optionLabel="name"
            optionKey={"name"}
            queryKey={["productPresentations"]}
          />
        </div>

        <div className={`flex flex-col ${disabledFilters.allergen ? 'hidden' : ''}`}>
          <small>Busqueda por alergeno</small>
          <Select
            disabled={disabledFilters.allergen}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleAllergenChange}
            allowClear>
            <Select.Option value="true">Sí</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        </div>

        <div className={`flex flex-col ${disabledFilters.kosher ? 'hidden' : ''}`}>
          <small>Busqueda por kosher</small>
          <Select
            disabled={disabledFilters.kosher}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleKosherChange}
            allowClear
            value={kosher?.toString()}>
            <Select.Option value="true">Sí</Select.Option>
            <Select.Option value="false">No</Select.Option>
          </Select>
        </div>

        <div className={`flex flex-col ${disabledFilters.status ? 'hidden' : ''}`}>
          <small>Busqueda por status</small>
          <Select
            disabled={disabledFilters.status}
            className="w-40"
            placeholder="Busqueda..."
            onChange={handleStatusChange}
            mode="multiple"
            value={status}
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
