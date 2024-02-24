import style from "./noSession.module.scss";
import { Link } from "react-router-dom";
import { AttentionIcon } from "../../assets/icons";

interface Props {
  path: "favorites" | "create-dog";
}

const NoSession = ({ path }: Props) => {
  return (
    <div className={style.NoSession}>
      <div className={style.Title}>
        <h3>Sesion no iniciada</h3>
        <AttentionIcon className={style.icon} />
      </div>

      {path === "favorites" ? (
        <p>Inicia sesión o registrate para poder agregar perros a favoritos.</p>
      ) : (
        <p>Inicia sesion o registrate para poder crear tus propios perros</p>
      )}

      <Link to={"/login"} className={style.button}>
        Iniciar sesión
      </Link>
    </div>
  );
};

export default NoSession;
