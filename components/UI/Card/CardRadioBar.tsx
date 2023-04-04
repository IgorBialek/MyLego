import CardRadioBar from "../../../models/cardRadioBar";
import css from "./CardRadioBar.module.css";

const CardRadioBar = <T extends unknown>({
  values,
  names,
  icons,
  selectedValue,
  changeHandler,
  vertical,
}: CardRadioBar<T>) => {
  return (
    <div
      className={`${
        vertical ? css.verticalCardRadioBarContainer : css.cardRadioBarContainer
      } center`}
    >
      {names.map((name, i) => (
        <div
          key={i}
          onClick={() => {
            changeHandler(values[i]);
          }}
          className={`${vertical ? css.verticalRadio : css.radio} center ${
            selectedValue == values[i] && css.selected
          }`}
        >
          {icons && icons[i]}
          {name}
        </div>
      ))}
    </div>
  );
};

export default CardRadioBar;
