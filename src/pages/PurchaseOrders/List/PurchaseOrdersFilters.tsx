import { Input, Select } from "antd";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import { entityStatuses } from "../../../lib/entity.utils";
import { usePurchaseOrdersListPageStore } from "./purchaseOrders_list_page.store";

export default function PurchaseOrderFilters() {
  const {
    setDraftMode,
    setPublished,
  } = usePurchaseOrdersListPageStore((state) => state);

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
