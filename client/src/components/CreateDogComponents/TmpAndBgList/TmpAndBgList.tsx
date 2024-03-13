import style from "./TmpAndBgList.module.scss";
import { useState } from "react";
import { useAppContext } from "../../../hooks/contextHooks";
import toast from "react-hot-toast";
import { Dog } from "../../../types";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";

interface Props {
  selected: "tmp" | "bg";
  selectedTemps: Dog["temperaments"];
  setCreatedDog: React.Dispatch<React.SetStateAction<Omit<Dog, "id">>>;
  selectedBreedGroup: Dog["breedGroup"];
}

const TmpAndBgList = ({
  selected,
  selectedTemps,
  setCreatedDog,
  selectedBreedGroup,
}: Props) => {
  const { allTemperaments, allBreedGroups } = useAppContext();
  const [inputValue, setInputValue] = useState<string>("");

  const handleTmpClick = (temp: string) => {
    if (selectedTemps.includes(temp)) {
      setCreatedDog((prev) => ({
        ...prev,
        temperaments: selectedTemps.filter((tmp) => tmp !== temp),
      }));
    } else {
      if (selectedTemps.length >= 15) {
        toast.error("No puedes incluir mas de 15 temperamentos", {
          style: {
            backgroundColor: "var(--color7)",
            color: "var(--color4)",
            pointerEvents: "none",
          },
        });
        return;
      }
      setCreatedDog((prev) => ({
        ...prev,
        temperaments: selectedTemps.concat([temp]),
      }));
    }
  };

  const handleBgClick = (breedGroup: string) => {
    setCreatedDog((prev) => ({
      ...prev,
      breedGroup: breedGroup,
    }));
  };

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
              onClick={() => handleTmpClick(temp)}
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

  return selected === "tmp" ? TemperamentsList : breedGroupList;
};

export default TmpAndBgList;
