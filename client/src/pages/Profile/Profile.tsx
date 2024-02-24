import style from "./profile.module.scss";
import { useUserContext } from "../../hooks/contextHooks";

const Profile = () => {
  const { User } = useUserContext();

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
          <button className={style.button}>Cerrar sesión</button>
          <button className={style.button}>Cambiar contraseña</button>
          <button className={style.button}>Eliminar cuenta</button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
