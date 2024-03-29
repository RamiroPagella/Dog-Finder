import { useState } from "react";
import { useUserContext } from "../../../hooks/contextHooks";
import style from "./profileInfo.module.scss";
import LogOutModal from "../LogOutModal/LogOutModal";
import ChangePassword from "../ChangePassword/ChangePassword";

const ProfileInfo = () => {
  const { User } = useUserContext();
  const [openLogOutModal, setOpenLogOutModal] = useState<boolean>(false);
  const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);

  return (
    <div className={style.ProfileInfo}>
      {User.admin ? <h2>Cuenta de administrador</h2> : null}
      <div className={style.info}>
        <h3>Nombre de usuario</h3>
        <p>{User?.username}</p>
      </div>
      <div className={style.info}>
        <h3>Correo Electronico</h3>
        <p>{User?.email}</p>
      </div>
      <div className={style.buttons}>
        <button
          className={style.button}
          onClick={() => setOpenLogOutModal(true)}
        >
          Cerrar sesión
        </button>
        <button className={style.button} onClick={() => setOpenChangePassword(true)}>Cambiar contraseña</button>
        <button className={style.button}>Eliminar cuenta</button>
      </div>
      {openLogOutModal && (
        <LogOutModal setOpenLogOutModal={setOpenLogOutModal} />
      )}
      {openChangePassword && <ChangePassword setOpenChangePassword={setOpenChangePassword}/>}
    </div>
  );
};

export default ProfileInfo;
