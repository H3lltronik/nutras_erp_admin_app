import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { toast } from "react-toastify";
import type { ToastIcon } from "../../node_modules/react-toastify/dist/types";
const { confirm } = Modal;

type ToastType = "success" | "error" | "info" | "warn" | "dark";

export const showToast = (
  message: string,
  type: ToastType,
  icon: ToastIcon = null
) => {
  toast[type](message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: icon,
  });
};

type CancelModalParams = {
  onOk?: () => unknown;
};
export const cancelModal = (params: CancelModalParams) => {
  confirm({
    icon: <ExclamationCircleOutlined />,
    content: (
      <p className="mt-5">
        ¿Desea salir? Si tiene algun cambio sin guardar, no se podra recuperar.
      </p>
    ),
    onOk: () => {
      if (params.onOk) params.onOk();
    },
    okText: "Salir",
    cancelText: "Regresar",
    okButtonProps: {
      className: "bg-red-500 border-none hover:bg-red-600",
    },
  });
};
