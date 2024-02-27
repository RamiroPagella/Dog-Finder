import style from "./profile.module.scss";
import { useUserContext } from "../../hooks/contextHooks";
import { useState } from "react";
import LogOutModal from "../../components/ProfileComponents/LogOutModal/LogOutModal";

const Profile = () => {
  const { User } = useUserContext();
  const [openLogOutModal, setOpenLogOutModal] = useState<boolean>(false);
  
  


  return (
    <div className={style.Profile}>
      <h1 className={style.header}>Mi cuenta</h1>

      <section>
        <div className={style.info}>
          <h3>Nombre de usuario</h3>
          <p>{User?.username}</p>
        </div>
        <div className={style.info}>
          <h3>Correo Electronico</h3>
          <p>{User?.email}</p>
        </div>

        <div className={style.buttons}>
          <button className={style.button} onClick={() => setOpenLogOutModal(true)}>Cerrar sesión</button>
          <button className={style.button}>Cambiar contraseña</button>
          <button className={style.button}>Eliminar cuenta</button>
        </div>
      </section>

     {openLogOutModal ? <LogOutModal setOpenLogOutModal={setOpenLogOutModal}/> : null}

    </div>
  );
};

export default Profile;
