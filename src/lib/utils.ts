import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-hot-toast';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastError = (message: string) => {
  return toast.error(message, {
    style: {
      border: '1px solid red',
      padding: '16px',
      color: 'black',
      fontSize: '18px',
    },
  });
};
export const toastSuccess = (message: string) => {
  return toast.success(message, {
    style: {
      border: '1px solid green',
      padding: '16px',
      color: 'black',
      fontSize: '18px',
    },
  });
};
