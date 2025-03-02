/* eslint-disable react/prop-types */

import { t } from 'i18next';

import styles from '../Tooltip.module.css';

function formatPercentage(value) {
  const lang = document.documentElement.lang || 'en-US';
  const intl = new Intl.NumberFormat(lang, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return intl.format(value);
}

function formatNumber(value) {
  const lang = document.documentElement.lang || 'en-US';
  const intl = new Intl.NumberFormat(lang);
  return intl.format(value);
}

export const LineChartTooltip = function LineChartTooltip({ points, x }) {
  const tCommon = t('analytics.common', { returnObjects: true });

  return (
    <div className={styles.Tooltip}>
      <b>{tCommon.year}:</b> {x}
      <table className={styles.TooltipTable}>
        <thead>
          <tr>
            <th className={styles.Center}>{tCommon.ageGroup}</th>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCount}</th>
            <th className={styles.Center}>{tCommon.data.insuredPeopleCountWithoutIOZ}</th>
            <th className={styles.Center}>{tCommon.data.iozRatio}</th>
          </tr>
        </thead>
        <tbody>
          {points.map(point => {
            const { options } = point.point;
            const { symbolName } = point.point.series.legendItem.symbol;
            let symbol = '';
            switch (symbolName) {
              case 'circle':
                symbol = '●';
                break;
              case 'diamond':
                symbol = '♦';
                break;
              case 'square':
                symbol = '■';
                break;
              case 'triangle':
                symbol = '▲';
                break;
              case 'triangle-down':
                symbol = '▼';
                break;
              default:
                symbol = '-';
                break;
            }
            const totalInsured = formatNumber(options.insuredPeopleCount);
            const insuredWithoutIOZ = formatNumber(options.insuredPeopleCountWithoutIOZ);
            const iozRatio = formatPercentage(options.iozRatio);
            return (
              <tr key={point.series.name}>
                <td className={styles.Center}>
                  <span className={styles.SeriesLabel}>
                    <span className={styles.SeriesIndicator} style={{ color: point.series.color }}>
                      {symbol}
                    </span>{' '}
                    {point.series.name}
                  </span>
                </td>
                <td className={styles.Right}>{totalInsured}</td>
                <td className={styles.Right}>{insuredWithoutIOZ}</td>
                <td className={styles.Right}>{iozRatio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const LineChartYAxisTitle = function LineChartYAxisTitle() {
  const tTaskA = t('analytics.taskA', { returnObjects: true });
  return tTaskA.yAxis.title;
};
