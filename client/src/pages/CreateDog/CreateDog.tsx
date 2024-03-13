import style from "./createDog.module.scss";
import Header from "../../components/Header/Header";
import NoSession from "../../components/NoSession/NoSession";
import { useAppContext, useUserContext } from "../../hooks/contextHooks";
import CreateDogForm from "../../components/CreateDogComponents/CreateDogForm/CreateDogForm";
import ImageAndName from "../../components/CreateDogComponents/ImageAndName/ImageAndName";
import TmpAndBgPanel from "../../components/CreateDogComponents/TmpAndBgPanel/TmpAndBgPanel";

export const CreateDog = () => {
  const { isAuthenticated } = useUserContext();
  const { createdDog, setCreatedDog } = useAppContext();

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
              selectedBreedGroup={createdDog.breedGroup}
              selectedTemps={createdDog.temperaments}
              setCreatedDog={setCreatedDog}
            />
            <TmpAndBgPanel
              selectedTemps={createdDog.temperaments}
              setCreatedDog={setCreatedDog}
              selectedBreedGroup={createdDog.breedGroup}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default CreateDog;
