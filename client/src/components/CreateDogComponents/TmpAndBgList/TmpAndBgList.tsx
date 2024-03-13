import style from "./TmpAndBgList.module.scss";
import { useState } from "react";
import { useAppContext } from "../../../hooks/contextHooks";
import { Dog } from "../../../types";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";

interface Props {
  selectedList: "tmp" | "bg";
  selectedTemps: Dog["temperaments"];
  selectedBreedGroup: Dog["breedGroup"];
  handleBgClick: (breedGroup: string) => void;
  handleTempClick: (temp: string, selectedTemps: Dog['temperaments']) => void;
}

const TmpAndBgList = ({
  selectedList,
  selectedTemps,
  selectedBreedGroup,
  handleBgClick,
  handleTempClick
}: Props) => {
  const { allTemperaments, allBreedGroups } = useAppContext();
  const [inputValue, setInputValue] = useState<string>("");

  const TemperamentsList = (
    <div className={style.List}>
      <input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      <section>
        {allTemperaments.map((temp, i) => {
          const item = (
            <div
              className={style.item}
              onClick={() => handleTempClick(temp, selectedTemps)}
              key={i}
            >
              {temp}

              {selectedTemps.includes(temp) ? (
                <CheckboxChecked />
              ) : (
                <Checkbox />
              )}
            </div>
          );
          if (inputValue !== "")
            return temp.toLowerCase().includes(inputValue.toLowerCase())
              ? item
              : undefined;
          else return item;
        })}
      </section>
    </div>
  );

  const breedGroupList = (
    <div className={style.List}>
      <section style={{justifyContent: 'space-evenly'}}>
        {allBreedGroups.map((bg, i) => (
          <div
            key={i}
            className={`${style.item} ${bg === selectedBreedGroup ? style.selected : ""}`}
            onClick={() => handleBgClick(bg)}
          >
            {bg}

            {bg === selectedBreedGroup ? <CheckboxChecked /> : <Checkbox />}
          </div>
        ))}
      </section>
    </div>
  );

  return selectedList === "tmp" ? TemperamentsList : breedGroupList;
};

export default TmpAndBgList;
