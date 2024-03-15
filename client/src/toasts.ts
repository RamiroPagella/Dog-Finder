import toast from "react-hot-toast";

export const succesToast = (msg: string) => {
  toast.success(msg, {
    style: {
      backgroundColor: "var(--color7)",
      color: "var(--color4)",
      pointerEvents: "none",
    },
  });
};

export const errorToast = (msg: string) => {
  toast.error(msg, {
    style: {
      backgroundColor: "var(--color7)",
      color: "var(--color4)",
      pointerEvents: "none",
    },
  });
};




