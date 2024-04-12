import style from "./TmpAndBgList.module.scss";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/contextHooks";
import { Dog } from "../../../types";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";

interface Props {
  selectedList: "tmp" | "bg";
  selectedTemps: Dog["temperaments"];
  selectedBreedGroup: Dog["breedGroup"];
  handleBgClick: (breedGroup: string) => void;
  handleTempClick: (temp: string, selectedTemps: Dog["temperaments"]) => void;
}

const TmpAndBgList = ({
  selectedList,
  selectedTemps,
  selectedBreedGroup,
  handleBgClick,
  handleTempClick,
}: Props) => {
  const { allTemperaments, allBreedGroups } = useAppContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [vwLowerThan1130, setVwLowerThan1130] = useState<boolean>(false);
  const [vwLowerThan460, setVwLoerThan460] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      if (innerWidth <= 1130) setVwLowerThan1130(true);
      else setVwLowerThan1130(false);

      if (innerWidth <= 460) setVwLoerThan460(true);
      else setVwLoerThan460(false);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  const TemperamentsList = (
    <>
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
    </>
  );

  const breedGroupList = (
    <section>
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
  );

  return (
    <div className={style.List}>
      {!vwLowerThan1130 || vwLowerThan460 ? (
        selectedList === "tmp" ? (
          TemperamentsList
        ) : (
          breedGroupList
        )
      ) : (
        <>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {TemperamentsList}
          </div>
          {breedGroupList}
        </>
      )}
    </div>
  );
};

export default TmpAndBgList;
