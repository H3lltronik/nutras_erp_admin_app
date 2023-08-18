import { toast } from 'react-toastify';
import type { ToastIcon } from '../../node_modules/react-toastify/dist/types/index.d';

type ToastType = 'success' | 'error' | 'info' | 'warn' | 'dark';

export const showToast = (message: string, type: ToastType, icon: ToastIcon = null) => {
    toast[type](message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: icon
    });
};