import style from "./explore.module.scss";
import Cards from "../../components/exploreComponents/Cards/Cards";
import PaginationBar from "../../components/exploreComponents/PagintationBar/PaginationBar";
import Header from "../../components/Header/Header";

const Explore = () => {
  return (
    <div className={style.Explore}>
      <Header path="explore"/>

      <Cards />

      <PaginationBar />
    </div>
  );
};

export default Explore;
