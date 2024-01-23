import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import style from "./cards.module.scss";
import { DogType } from "../../../../types";
import Card from "../Card/Card";

const Cards = () => {
  const [dogs, setDogs] = useState<DogType[] | undefined>(undefined);
  const [dog, setDog] = useState<DogType | undefined>(undefined);

  useEffect(() => {
    axiosInstance("/dogs").then(({ data }) => {
      setDogs(data.dogs);
      setDog(data.dogs[1]);
    });
  }, []);
  

  return (
    <div className={style.Cards}>
      {/* {dogs?.map((dog: DogType) => 
        <Card
          id={style.id}
          breedGroup={dog.breedGroup}
          height={dog.height}
          img={dog.img}
          lifeSpan={dog.lifeSpan}
          name={dog.name}
          temperaments={dog.temperaments}
          weight={dog.weight}
        />
      )} */}

      {dog ? (
        <Card
          id={dog.id}
          breedGroup={dog.breedGroup}
          height={dog.height}
          img={dog.img}
          lifeSpan={dog.lifeSpan}
          name={dog.name}
          temperaments={dog.temperaments}
          weight={dog.weight}
        />
      ) : null}

    </div>
  );
};

export default Cards;
