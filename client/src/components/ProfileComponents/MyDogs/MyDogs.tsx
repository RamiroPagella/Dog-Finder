import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/contextHooks";
import Card from "../../Card/Card";
import style from "./myDogs.module.scss";

const MyDogs = () => {
  const {
    User: { dogs, pendingDogs },
  } = useUserContext();

  const userDogs = [...dogs, ...pendingDogs];

  return (
    <div className={style.MyDogs}>
      <section className={style.buttons}>
        <Link>
        </Link>
        <Link>
        </Link>
      </section>

    
      <section className={style.cards}>
        {userDogs?.length ? (
          userDogs.map((dog) => (
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
          <p>No has creado ningun perro</p>
        )}
      </section>
    </div>
  );
};

export default MyDogs;
