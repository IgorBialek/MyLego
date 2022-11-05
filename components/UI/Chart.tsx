import { FC } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useRecoilValue } from 'recoil';

import { selectedCurrencyAtom } from '../../atoms/settings/SelectedCurrency';
import css from './Chart.module.css';
import Indicator from './Indicator';

const Chart: FC<{ data: { date: Date; value: number }[] }> = ({ data }) => {
  const selectedCurrency = useRecoilValue(selectedCurrencyAtom);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className={css.tooltipContainer}>
          <p className={css.date}>
            {new Date(payload[0].payload.date).toLocaleDateString()}
          </p>
          <div className={`${css.value} center`}>
            <p>
              {(payload[0].payload.value * selectedCurrency.value).toFixed()}
              {selectedCurrency.name}
            </p>
            <Indicator
              initValue={data[label > 0 ? label - 1 : label].value ?? 0}
              newValue={data[label].value ?? 0}
              customClass={css.tooltipIndicator}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={css.chartContainer}>
      <ResponsiveContainer width="99%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-2")}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-2")}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Tooltip content={CustomTooltip} cursor={false} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={getComputedStyle(document.documentElement).getPropertyValue(
              "--color-1"
            )}
            strokeWidth={2}
            fill="url(#gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
