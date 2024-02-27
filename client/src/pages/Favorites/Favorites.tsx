import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useUserContext } from "../../hooks/contextHooks";
import FavHeader from "../../components/FavComponents/FavHeader/FavHeader";
import FavCards from "../../components/FavComponents/FavCards/FavCards";
import FavPaginationBar from "../../components/FavComponents/FavPaginationBar/FavPaginationBar";

const Favorites = () => {
  const {
    isAuthenticated,
  } = useUserContext();
  

  return (
    <div className={style.Favorites}>
      {!isAuthenticated ? (
        <NoSession path="favorites" />
      ) : (
        <>
          <FavHeader />

          <FavCards/>

          <FavPaginationBar />
        </>
      )}
    </div>
  );
};
export default Favorites;
