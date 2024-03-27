import style from "./myDogsCards.module.scss";
import { Route, Routes } from "react-router-dom";
import { useUserContext } from "../../../hooks/contextHooks";
import Card from "../../Card/Card";

const MyDogsCards = () => {
  return (
    <div className={style.MyDogsCards}>
      <Routes>
        <Route path="/accepted" element={<Accepted />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </div>
  );
};

export default MyDogsCards;

const Accepted = () => {
  const {
    User: { dogs },
  } = useUserContext();

  return (
    <>
      {dogs?.length ? (
        dogs.map((dog) => (
          <Card
            user={dog.user}
            userId={dog.userId}
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            lifeSpan={dog.lifeSpan}
            temperaments={dog.temperaments}
            breedGroup={dog.breedGroup}
          />
        ))
      ) : (
        <p>No has creado ningun perro que haya sido aprobado.</p>
      )}
    </>
  );
};

const Pending = () => {
  const {
    User: { pendingDogs },
  } = useUserContext();

  return (
    <>
      {pendingDogs?.length ? (
        pendingDogs.map((dog) => (
          <Card
            user={dog.user}
            userId={dog.userId}
            key={dog.id}
            id={dog.id}
            img={dog.img}
            name={dog.name}
            height={dog.height}
            weight={dog.weight}
            lifeSpan={dog.lifeSpan}
            temperaments={dog.temperaments}
            breedGroup={dog.breedGroup}
          />
        ))
      ) : (
        <p>No has creado ningun perro.</p>
      )}
    </>
  );
};
