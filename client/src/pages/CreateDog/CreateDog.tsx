import style from "./createDog.module.scss";
import Header from "../../components/Header/Header";
import NoSession from "../../components/NoSession/NoSession";
import { useAppContext, useUserContext } from "../../hooks/contextHooks";
import CreateDogForm from "../../components/CreateDogComponents/CreateDogForm/CreateDogForm";
import ImageAndName from "../../components/CreateDogComponents/ImageAndName/ImageAndName";
import TmpAndBgPanel from "../../components/CreateDogComponents/TmpAndBgPanel/TmpAndBgPanel";
import useCreateDog from "../../hooks/useCreateDog";

export const CreateDog = () => {
  const { isAuthenticated } = useUserContext();
  const { createdDog } = useAppContext();
  const {
    handleDrop,
    handleFileChange,
    handleNameChange,
    handleInputChange,
    handleBgClick,
    handleTempClick,
    deleteTemp,
    inputValues,
  } = useCreateDog();

  return (
    <div className={style.createDog}>
      {!isAuthenticated ? (
        <NoSession path={"create-dog"} />
      ) : (
        <>
          <Header path="create-dog" />

          <div className={style.createDogContent}>
            <ImageAndName
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              handleNameChange={handleNameChange}
            />

            <CreateDogForm
              selectedBreedGroup={createdDog.breedGroup}
              selectedTemps={createdDog.temperaments}
              deleteTemp={deleteTemp}
              handleInputChange={handleInputChange}
              inputValues={inputValues}
            />
            <TmpAndBgPanel
              handleBgClick={handleBgClick}
              handleTempClick={handleTempClick}
              selectedTemps={createdDog.temperaments}
              selectedBreedGroup={createdDog.breedGroup}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default CreateDog;
