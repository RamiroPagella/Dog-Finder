import style from "./profileHeader.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../../hooks/contextHooks";

const ProfileHeader = () => {
  const { pathname } = useLocation();
  const { User } = useUserContext();

  return (
    <div className={style.ProfileHeader}>
      <h1>Mi cuenta</h1>

      <div className={style.buttons}>
        <Link
          to={"/profile"}
          className={pathname === "/profile" ? style.btnSelected : ""}
        >
          Mi perfil
        </Link>
        <Link
          to={"/profile/my-dogs/accepted"}
          className={
            pathname.includes("/profile/my-dogs") ? style.btnSelected : ""
          }
        >
          Mis Perros
        </Link>
        {User?.admin ? (
          <Link
            to={"/profile/pending-dogs"}
            className={
              pathname === "/profile/pending-dogs" ? style.btnSelected : ""
            }
          >
            Perros pendientes
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
