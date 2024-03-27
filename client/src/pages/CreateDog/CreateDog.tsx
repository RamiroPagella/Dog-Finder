import style from "./createDog.module.scss";
import NoSession from "../../components/NoSession/NoSession";
import { useAppContext, useUserContext } from "../../hooks/contextHooks";
import CreateDogForm from "../../components/CreateDogComponents/CreateDogForm/CreateDogForm";
import ImageAndName from "../../components/CreateDogComponents/ImageAndName/ImageAndName";
import TmpAndBgPanel from "../../components/CreateDogComponents/TmpAndBgPanel/TmpAndBgPanel";
import useCreateDog from "../../hooks/useCreateDog";
import CreateDogHeader from "../../components/CreateDogComponents/CreateDogHeader/CreateDogHeadert";

export const CreateDog = () => {
  const { isAuthenticated } = useUserContext();
  const { createdDog } = useAppContext();
  const {
    handleDrop,
    handleFileChange,
    deleteImage,
    handleNameChange,
    handleInputChange,
    handleBgClick,
    handleTempClick,
    deleteTemp,
    restoreDog,
    cancelModify,
    sendDog,
    inputValues,
    modifyDog
  } = useCreateDog();

  return (
    <div className={style.createDog}>
      {!isAuthenticated ? (
        <NoSession path={"create-dog"} />
      ) : (
        <>
          <CreateDogHeader restoreDog={restoreDog} sendDog={sendDog} cancelModify={cancelModify} modifyDog={modifyDog}/>

          <div className={style.createDogContent}>
            <ImageAndName
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
              handleNameChange={handleNameChange}
              deleteImage={deleteImage}
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
