import style from "./breedGroupsPanel.module.scss";
import { useAppContext } from "../../../hooks/contextHooks";
import { Dog } from "../../../types";
import { Checkbox, CheckboxChecked } from "../../../assets/icons";

interface Props {
  setCreatedDog: React.Dispatch<React.SetStateAction<Omit<Dog, "id">>>;
  selectedBreedGroup: string;
}

const BreedGroupsPanel = ({ setCreatedDog, selectedBreedGroup }: Props) => {
  const { allBreedGroups } = useAppContext();

  const selectBreedGroup = (breedGroup: string) => {
    setCreatedDog((prev) => ({
      ...prev,
      breedGroup: breedGroup,
    }));
  };

  return (
    <div className={style.BreedGroupsPanel}>
      <h2 className={style.title}>Grupo de razas</h2>

      <section>
        {allBreedGroups.map((bg, i) => (
          <div
            key={i}
            className={`${style.item} ${bg === selectedBreedGroup ? style.selected : ''}`} 
            onClick={() => selectBreedGroup(bg)}
          >
            {bg}

            {bg === selectedBreedGroup ? <CheckboxChecked /> : <Checkbox />}
          </div>
        ))}
      </section>
    </div>
  );
};

export default BreedGroupsPanel;
