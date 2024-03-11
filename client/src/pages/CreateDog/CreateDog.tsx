import style from "./createDog.module.scss";
import Header from "../../components/Header/Header";
import NoSession from "../../components/NoSession/NoSession";
import { useUserContext } from "../../hooks/contextHooks";
import CreateDogForm from "../../components/CreateDogComponents/CreateDogForm/CreateDogForm";
import BreedGroupsPanel from "../../components/CreateDogComponents/BreedGroupsPanel/BreedGroupPanel";
import TemperamentsPanel from "../../components/CreateDogComponents/TemperamentsPanel/TemperamentsPanel";
import { useState } from "react";
import ImageAndName from "../../components/CreateDogComponents/ImageAndName/ImageAndName";
import { Dog } from "../../types";

export const CreateDog = () => {
  const { isAuthenticated } = useUserContext();
  const [togglePanel, setTogglePanel] = useState(false);
  const [createdDog, setCreatedDog] = useState<Omit<Dog, "id">>({
    name: "",
    height: "",
    weight: "",
    temperaments: [],
    breedGroup: "",
    lifeSpan: "",
    img: "",
  });

  return (
    <div className={style.createDog}>
      {!isAuthenticated ? (
        <NoSession path={"create-dog"} />
      ) : (
        <>
          <Header path="create-dog" />

          <div className={style.createDogContent}>
            <ImageAndName />

            <CreateDogForm
              togglePanel={togglePanel}
              setTogglePanel={setTogglePanel}
              selectedBreedGroup={createdDog.breedGroup}
              selectedTemps={createdDog.temperaments}
              setCreatedDog={setCreatedDog}
            />

            {togglePanel ? (
              <TemperamentsPanel
                selectedTemps={createdDog.temperaments}
                setCreatedDog={setCreatedDog}
              />
            ) : (
              <BreedGroupsPanel
                setCreatedDog={setCreatedDog}
                selectedBreedGroup={createdDog.breedGroup}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default CreateDog;
