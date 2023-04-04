import { useRecoilValue, useSetRecoilState } from "recoil";
import Card from "../UI/Card/Card";
import PieChart from "../UI/PieChart";
import css from "./PiePanel.module.css";

import CardRadioBar from "../UI/Card/CardRadioBar";
import { pieDataSelector } from "../../atoms/dashboard/PieData";
import { pieAtom } from "../../atoms/dashboard/Pie";
import { useSession } from "next-auth/react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useMediaQuery } from "react-responsive";
import { showModalAtom } from "../../atoms/layout/ShowModal";
import CardSecondaryButton from "../UI/Card/CardSecondaryButton";

const PiePanel = () => {
  const { data: session } = useSession();

  const pieChartData = useRecoilValue(pieDataSelector);
  const pie = useRecoilValue(pieAtom);

  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const hidePiePanel = useMediaQuery({ maxWidth: 1330 });
  const setShowModal = useSetRecoilState(showModalAtom);

  const modeHandler = (value: string) => {
    syncPie(value);
  };

  const syncPie = async (mode: string) => {
    let email = session?.user?.email;

    if (email) {
      await setDoc(doc(firestore, "pie", email), {
        mode,
      });
    }
  };

  return (
    <Card customClass={css.customCard}>
      <PieChart data={pieChartData} />
      <CardRadioBar
        changeHandler={modeHandler}
        selectedValue={pie.mode}
        values={["THEME", "PROFIT", "TYPE"]}
        names={["Theme", "Profit", "Type"]}
        vertical={true}
      />
      {!isMobile && hidePiePanel && (
        <CardSecondaryButton
          customClass={css.cancel}
          text="Cancel"
          handler={() => setShowModal(false)}
        />
      )}
    </Card>
  );
};

export default PiePanel;
