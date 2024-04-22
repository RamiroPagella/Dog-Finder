import { useState } from "react";
import style from "./TmpAndBgPanel.module.scss";
import TmpAndBgList from "../TmpAndBgList/TmpAndBgList";
import { Dog } from "../../../types";

interface Props {
  selectedTemps: Dog["temperaments"];
  selectedBreedGroup: Dog["breedGroup"];
  handleBgClick: (breedGroup: string) => void;
  handleTempClick: (temp: string, selectedTemps: Dog["temperaments"]) => void;
}

const TmpAndBgPanel = ({
  selectedTemps,
  selectedBreedGroup,
  handleBgClick,
  handleTempClick,
}: Props) => {
  const [selectedList, setToggle] = useState<"tmp" | "bg">("tmp");

  return (
    <div className={style.TmpAndBgPanel}>
      <section className={style.buttonsOrTitle}>
        <h3>Temperamentos | grupos de razas</h3>
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
        handleBgClick={handleBgClick}
        handleTempClick={handleTempClick}
        selectedList={selectedList}
        selectedTemps={selectedTemps}
        selectedBreedGroup={selectedBreedGroup}
      />
    </div>
  );
};

export default TmpAndBgPanel;
