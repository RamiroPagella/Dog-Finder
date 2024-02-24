import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { Profile } from "../../assets/icons";

const Favorites = () => {

  return (
    <div className={style.Favorites}>
      <NoSession path={"favorites"} />

    </div>
  );
};
export default Favorites;
