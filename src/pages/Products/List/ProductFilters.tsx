import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { GetProductsParams } from "../../../api/product/product.api";
import { entityStatuses } from "../../../lib/entity.utils";
import { useProductsListPageStore } from "./products_list_page.store";
import { GenericSelect } from "../../../components/Forms/Common/GenericSelect";
import { ProductPresentationAPI, ProductTypesAPI } from "../../../api";

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
    setPublished,
    setKosher,
    setAllergen,
    setProductTypes,
    setPresentations,
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
    let booleanValue: boolean | undefined = value === "true" ? true : value === "false" ? false : undefined;
    setKosher(booleanValue);
  };

  const handleAllergenChange = (value: string | undefined) => {
    let booleanValue: boolean | undefined = value === "true" ? true : value === "false" ? false : undefined;
    setAllergen(booleanValue);
  };

  const handleProductTypesChange = (value: string | string[]) => {
    if(Array.isArray(value)) setProductTypes(value);
  }

  const handlePresentationsChange = (value: string | string[]) => {
    if(Array.isArray(value)) setPresentations(value);
  }

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
    <section className="flex flex-wrap items-center pb-2 gap-3">
      <>
        {
          !disabledFilters.name && (
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
          )
        }

        {!disabledFilters.code && (
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
        )}

        {!disabledFilters.provider && (
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
        )}

        {
          !disabledFilters.productTypes && (
            <div className="flex flex-col" style={{flexBasis: '200px'}}>
              <small>Busqueda por tipo</small>
              <GenericSelect
                disabled={disabledFilters.productTypes}
                fetcher={() =>
                  ProductTypesAPI.getProductTypes()
                }
                multiple={true}
                onChange={handleProductTypesChange}
                placeholder="Busqueda..."
                optionLabel="description"
                optionKey={"id"}
                queryKey={["productTypes"]}
              />
            </div>
          )
        }

        <div style={{flexBasis: '200px'}}
          className={
            `flex flex-col ${disabledFilters.presentations ? 'hidden' : ''}`
          }>
          <small>Busqueda por presentación</small>
          <GenericSelect
            fetcher={() =>
              ProductPresentationAPI.getProductPresentations()
            }
            multiple={true}
            onChange={handlePresentationsChange}
            placeholder="Busqueda..."
            optionLabel="name"
            optionKey={"name"}
            queryKey={["productPresentations"]}
          />
        </div>

        {
          !disabledFilters.kosher && (
            <div className="flex flex-col">
              <small>Busqueda por kosher</small>
              <Select
                disabled={disabledFilters.kosher}
                className="w-40"
                placeholder="Busqueda..."
                onChange={handleKosherChange}
                allowClear>
                <Select.Option value="true">Sí</Select.Option>
                <Select.Option value="false">No</Select.Option>
              </Select>
            </div>
          )
        }

        {
          !disabledFilters.allergen && (
            <div className="flex flex-col">
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
          )
        }

        {
          !disabledFilters.status && (
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
              </Select>
            </div>
          )
        }
      </>
    </section>
  );
};
