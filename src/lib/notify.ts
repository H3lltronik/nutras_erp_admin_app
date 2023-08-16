import { toast } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warn' | 'dark';

export const showToast = (message: string, type: ToastType, icon: any = null) => {
    toast[type](message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: icon
    });
};