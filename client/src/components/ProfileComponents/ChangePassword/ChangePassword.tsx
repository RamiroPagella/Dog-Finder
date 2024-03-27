import { createPortal } from "react-dom";
import style from "./changePasword.module.scss";
import Axios from "../../../axios";
import { useState } from "react";
import { errorToast, succesToast } from "../../../toasts";
import { AxiosError } from "axios";
import { useUserContext } from "../../../hooks/contextHooks";

interface Props {
  setOpenChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

interface changePwdForm {
  actual: string;
  new: string;
}

const ChangePassword = ({ setOpenChangePassword }: Props) => {
  const rootElement = document.getElementById("root") as Element;
  const [form, setForm] = useState<changePwdForm>({
    actual: "",
    new: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changePassword = async () => {
    interface Response {
      changed: boolean;
    }
    try {
      await Axios.put<Response>("/change-password", {
        actualPwd: form.actual,
        newPwd: form.new,
      });
      succesToast("Contraseña modificada correctamente");
      setOpenChangePassword(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        errorToast("La contraseña actual es incorrecta");
        return;
      }
      errorToast("Error");
      console.log(error);
    }
  };

  return createPortal(
    <div className={style.Container}>
      <div className={style.ChangePassword}>
        <h2>Cambiar contraseña</h2>

        <section className={style.form}>
          <label>
            <p>Contraseña actual</p>
            <input type="password" name="actual" onChange={handleChange} />
          </label>

          <label>
            <p>Contraseña nueva</p>
            <input type="password" name="new" onChange={handleChange} />
          </label>
        </section>

        <section className={style.buttons}>
          <button onClick={changePassword}>Cambiar</button>
          <button onClick={() => setOpenChangePassword(false)}>Cancelar</button>
        </section>
      </div>
    </div>,
    rootElement,
  );
};

export default ChangePassword;
