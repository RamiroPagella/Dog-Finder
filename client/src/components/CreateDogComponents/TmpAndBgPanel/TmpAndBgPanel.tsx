import { useState } from "react";
import style from "./TmpAndBgPanel.module.scss";
import TmpAndBgList from "../TmpAndBgList/TmpAndBgList";
import { Dog } from "../../../types";

interface Props {
  selectedTemps: Dog["temperaments"];
  setCreatedDog: React.Dispatch<React.SetStateAction<Omit<Dog, "id">>>;
  selectedBreedGroup: Dog["breedGroup"];
}

const TmpAndBgPanel = ({
  selectedTemps,
  setCreatedDog,
  selectedBreedGroup,
}: Props) => {
  const [selectedList, setToggle] = useState<"tmp" | "bg">("tmp");

  return (
    <div className={style.TmpAndBgPanel}>
      <section className={style.toggleButtons}>
        <button
          className={selectedList === "tmp" ? style.selectedBtn : ""}
          onClick={() => {
            setToggle("tmp");
          }}
        >
          Temperamentos
        </button>
        <button
          className={selectedList === "bg" ? style.selectedBtn : ""}
          onClick={() => {
            setToggle("bg");
          }}
        >
          Grupo de razas
        </button>
      </section>

      <TmpAndBgList
        selected={selectedList}
        selectedTemps={selectedTemps}
        setCreatedDog={setCreatedDog}
        selectedBreedGroup={selectedBreedGroup}
      />
    </div>
  );
};

export default TmpAndBgPanel;
