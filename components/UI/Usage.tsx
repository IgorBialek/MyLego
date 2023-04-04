import { FC } from "react";
import {
  TbBattery,
  TbBattery1,
  TbBattery2,
  TbBattery3,
  TbBattery4,
} from "react-icons/tb";
import { useRecoilValue } from "recoil";

import { usageAtom } from "../../atoms/settings/Usage";
import css from "./Usage.module.css";

const colorIterator = 1.2;

type limits = {
  bricklink: number;
  brickset: number;
};

const limits = {
  bricklink: 5000,
  brickset: 1000,
};

const Usage: FC<{ customClass?: string; property: string }> = ({
  customClass,
  property,
}) => {
  const usage = useRecoilValue(usageAtom);

  if (!usage) {
    return <></>;
  }

  let usageProcentage: number = parseInt(
    (
      (usage[property as keyof limits] / limits[property as keyof limits]) *
      100
    ).toFixed()
  );

  let colorStyle = {
    color: `hsl(${usageProcentage * colorIterator}, 50%, 50%)`,
  };

  const renderBattery = () => {
    if (usageProcentage <= 20) {
      return <TbBattery style={colorStyle} />;
    }

    if (usageProcentage <= 40) {
      return <TbBattery1 style={colorStyle} />;
    }

    if (usageProcentage <= 60) {
      return <TbBattery2 style={colorStyle} />;
    }

    if (usageProcentage <= 80) {
      return <TbBattery3 style={colorStyle} />;
    }

    if (usageProcentage <= 100) {
      return <TbBattery4 style={colorStyle} />;
    }
  };

  return (
    <div className={`${customClass} ${css.usageContainer}`} style={colorStyle}>
      {renderBattery()}
      {usageProcentage > 0 ? usageProcentage : 0}%
    </div>
  );
};

export default Usage;
