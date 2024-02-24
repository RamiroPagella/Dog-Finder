import style from "./BreedGroupsPanel.module.scss";
import {
  useAppContext,
} from "../../../hooks/contextHooks";
import { CheckboxChecked, Checkbox } from "../../../assets/icons";
import { Filters } from "../../../types";

interface Props {
  setOpenBreedGroupPanel: (boolean: boolean) => void;
  setSearchAndFiltersLocal: React.Dispatch<React.SetStateAction<Filters>>;
  breedGroups: Filters["breedGroups"];
}

const BreedGroupsPanel = ({
  setOpenBreedGroupPanel,
  setSearchAndFiltersLocal,
  breedGroups,
}: Props) => {
  const { allBreedGroups } = useAppContext();

  const handleCheckbox = (breedGroup: string) => {
    setSearchAndFiltersLocal((prev) => {
      const { breedGroups } = prev;
      return {
        ...prev,
        breedGroups: breedGroups.includes(breedGroup)
          ? breedGroups.filter((bg) => bg !== breedGroup)
          : [...breedGroups, breedGroup],
      };
    });
  };

  return (
    <div className={style.Container}>
      <h1>Grupo de razas</h1>

      <button
        onClick={() => {
          setOpenBreedGroupPanel(false);
        }}
      >
        Volver
      </button>

      <section className={style.list}>
        {allBreedGroups.map((breedGroup) => (
          <div
            className={style.item}
            onClick={() => handleCheckbox(breedGroup)}
          >
            <p>{breedGroup}</p>
            
            {breedGroups.includes(breedGroup) ? (
              <CheckboxChecked className={style.checkbox} />
            ) : (
              <Checkbox className={style.checkbox} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default BreedGroupsPanel;
