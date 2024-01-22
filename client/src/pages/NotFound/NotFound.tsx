import style from "./notFound.module.scss";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <h1>Esta ruta no existe o no tienes permisos para acceder.</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
};

export default NotFound;
