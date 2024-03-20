import style from "./profileHeader.module.scss";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/contextHooks";

interface Props {
  setTogglePage: React.Dispatch<
    React.SetStateAction<"MyProfile" | "PendingDogs">
  >;
  togglePage: "MyProfile" | "PendingDogs";
}

const ProfileHeader = ({ setTogglePage, togglePage }: Props) => {
  const { User } = useUserContext();

  return (
    <div className={style.ProfileHeader}>
      <h1>Mi cuenta</h1>

      {User?.admin ? (
        <div className={style.buttons}>
          <Link to={'/profile'}
            onClick={() => {
              setTogglePage("MyProfile");
            }}
            className={togglePage === "MyProfile" ? style.btnSelected : ""}
          >
            Mi perfil
          </Link>
          <Link to={'/profile/pending-dogs'}
            onClick={() => {
              setTogglePage("PendingDogs");
            }}
            className={togglePage === "PendingDogs" ? style.btnSelected : ""}
          >
            Perros pendientes
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileHeader;
