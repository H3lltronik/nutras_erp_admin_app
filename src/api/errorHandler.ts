import axios from "axios";
import { showToast } from "../lib/notify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleAPIError = (error: any): APIError => {
    let messages: string[] = [];
    let statusCode: number = 500; // Default to 500 if no status code is found

    if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response) {
            statusCode = response.status || statusCode;

            if (response.data.message) {
                if (Array.isArray(response.data.message)) {
                    messages = response.data.message;
                    response.data.message.forEach((message: string) => {
                        showToast(message, 'error');
                    });
                } else if (typeof response.data.message === 'string') {
                    messages = [response.data.message];
                    showToast(response.data.message, 'error');
                } else {
                    messages = ['Error'];
                    showToast('Error', 'error');
                }
            } else {
                messages = ['Error'];
                showToast('Error', 'error');
            }
        } else {
            messages = ['Error'];
            showToast('Error', 'error');
        }
    } else {
        messages = ['Error'];
        showToast('Error', 'error');
    }

    return { statusCode, messages };
}