import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Popover } from "antd";
import debounce from "lodash.debounce";
import { useMemo, useState } from "react";
import { useProductsListPageStore } from "./products_list_page.store";

export default function ProductFilters() {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const setSearch = useProductsListPageStore((state) => state.setSearch);
  const setDraftMode = useProductsListPageStore((state) => state.setDraftMode);

  const debouncedSetSearch = useMemo(
    () => debounce(setSearch, 300),
    [setSearch]
  );

  const handleShowFilters = () => setShowFilters(!showFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetSearch(e.target.value);

  const handleDraftModeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDraftMode(e.target.checked);

  const popoverContent = (
    <div className="p-3">
      <strong>{showFilters ? "Ocultar filtros" : "Mostrar filtros"}</strong>
    </div>
  );

  return (
    <section className="flex items-center pb-2 gap-3">
      <Popover content={popoverContent}>
        <Button
          className="flex items-center justify-center"
          shape="circle"
          size={showFilters ? "large" : "small"}
          onClick={handleShowFilters}>
          {showFilters ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        </Button>
      </Popover>
      {showFilters && (
        <>
          <div className="">
            <small>Busqueda por nombre</small>
            <Input
              placeholder="Busqueda..."
              onChange={handleInputChange}
              allowClear
            />
          </div>

          <label className="flex flex-col gap-2 items-center">
            <small>Registros borrador</small>
            <input
              onChange={handleDraftModeChange}
              className="leading-loose text-pink-600 top-0"
              type="checkbox"
            />
          </label>
        </>
      )}
    </section>
  );
}
