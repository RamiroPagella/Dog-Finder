import style from "./favorites.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useUserContext } from "../../hooks/contextHooks";
import FavCards from "../../components/FavComponents/FavCards/FavCards";
import FavPaginationBar from "../../components/FavComponents/FavPaginationBar/FavPaginationBar";

const Favorites = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <div className={style.Favorites}>
      <h1 className={style.favHeader}>Favoritos</h1>

      {!isAuthenticated ? (
        <NoSession path="favorites" />
      ) : (
        <>
          <FavCards />

          <FavPaginationBar />
        </>
      )}
    </div>
  );
};
export default Favorites;
