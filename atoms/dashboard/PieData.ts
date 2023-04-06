import { selector } from "recoil";
import { itemsAtom } from "./Items";
import { pieAtom } from "./Pie";
import { PieChartData } from "../../components/UI/PieChart";
import getHSLColors from "../../lib/getColors";
import { selectedCurrencyAtom } from "../settings/SelectedCurrency";
import { themeAtom } from "../layout/Theme";

export const pieDataSelector = selector({
  key: "pieData",
  get: ({ get }) => {
    const selectedCurrency = get(selectedCurrencyAtom);
    const pie = get(pieAtom);
    const items = get(itemsAtom);
    const theme = get(themeAtom);

    const getPieData = (): PieChartData[] => {
      switch (pie.mode) {
        case "THEME":
          let themes: PieChartData[] = [];

          items.forEach((item, i) => {
            let foundTheme = themes.find((t) => t.id === item.theme);

            if (foundTheme) {
              foundTheme.value += 1;
            } else {
              themes.push({
                id: item.theme,
                label: item.theme ?? "Other",
                value: 1,
                color: "",
              });
            }
          });

          let themesHSLColors = getHSLColors(themes.length, `#${theme[1]}`);

          const sortedThemes = themes.sort((a, b) => b.value - a.value);

          sortedThemes.forEach((t, i) => (t.color = themesHSLColors[i]));

          return sortedThemes;
        case "PROFIT":
          let profits: PieChartData[] = [];

          //   var totalProfit = 0;

          //   items.forEach((item) => {
          //     totalProfit +=
          //       ((item.avgPrice ?? 0) - (item.retail ?? 0)) * item.count;
          //   });

          items.forEach((item) => {
            const profit = parseFloat(
              (
                ((item.avgPrice ?? 0) - (item.retail ?? 0)) *
                item.count *
                selectedCurrency.value
              ).toFixed(2)
            );

            if (profit > 0) {
              profits.push({
                id: item.id,
                label: item.name,
                value: profit,
                color: "",
              });
            }
          });

          let profitHSLColors = getHSLColors(profits.length, `#${theme[1]}`);

          const sortedProfits = profits.sort((a, b) => b.value - a.value);

          sortedProfits.forEach((t, i) => (t.color = profitHSLColors[i]));

          return sortedProfits;

        case "TYPE":
          let types: PieChartData[] = [];

          items.forEach((item, i) => {
            let foundType = types.find((t) => t.id === item.type);

            if (foundType) {
              foundType.value += 1;
            } else {
              types.push({
                id: item.type,
                label: item.type,
                value: 1,
                color: "",
              });
            }
          });

          let typesHSLColors = getHSLColors(types.length, `#${theme[1]}`);

          const sortedTypes = types.sort((a, b) => b.value - a.value);

          sortedTypes.forEach((t, i) => (t.color = typesHSLColors[i]));

          return sortedTypes;

        default:
          return [];
      }
    };

    return getPieData();
  },
});
