import style from "./explore.module.scss";
import Cards from "../../components/exploreComponents/Cards/Cards";
import PaginationBar from "../../components/exploreComponents/PaginationBar/PaginationBar";
import ExploreHeader from "../../components/exploreComponents/ExploreHeader/ExploreHeader";

const Explore = () => {
  return (
    <div className={style.Explore}>
      <ExploreHeader />

      <Cards />

      <PaginationBar />
    </div>
  );
};

export default Explore;
