import { useState } from "react";
import toast from "react-hot-toast";

const useToasts = () => {
  const [isSuccessActive, setIsSuccessActive] = useState<boolean>(false);
  const [isErrorActive, setIsErrorActive] = useState<boolean>(false);

  const successToast = (msg: string) => {
    if (isSuccessActive) return;
    
    const toastDuration = 3000;
    setIsSuccessActive(true);
    toast.success(msg, {
      style: {
        backgroundColor: "var(--color7)",
        color: "var(--color4)",
        pointerEvents: "none",
      },
      duration: toastDuration
    });
    setTimeout(() => {
      setIsSuccessActive(false);
    }, toastDuration)
  };

  const errorToast = (msg: string) => {
    if (isErrorActive) return;

    const toastDuration = 4000;
    setIsErrorActive(true)
    toast.error(msg, {
      style: {
        backgroundColor: "var(--color7)",
        color: "var(--color4)",
        pointerEvents: "none",
      },
      duration: toastDuration
    });
    setTimeout(() => {
      setIsErrorActive(false)
    }, toastDuration)
  };

  return { successToast, errorToast };
};

export default useToasts;