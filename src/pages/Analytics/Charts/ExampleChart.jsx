import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import exporting from 'highcharts/modules/exporting';
import * as Icons from 'components/Shared/Icons';
import { useEffect, useRef, useState } from 'react';
import { baseOptions } from './options';

accessibility(Highcharts);
exporting(Highcharts);

Highcharts.setOptions(baseOptions);

const options = {
  lang: {
    accessibility: {
      chartContainerLabel: 'Title: {title}.',
    },
  },
  title: {
    text: 'Title',
    style: {
      display: 'none',
    },
  },
  subtitle: {
    text: 'Subtitle',
    style: {
      display: 'none',
    },
  },
  series: [
    {
      data: [1, 2, 3],
      name: 'Prvi',
    },
    { data: [3, 2, 1], name: 'Drugi' },
  ],
  yAxis: {
    title: {
      text: 'Y os',
    },
  },
  caption: {
    text: 'Caption',
    style: {
      display: 'none',
    },
  },
};

const ExampleChart = function ExampleChart() {
  const chartRef = useRef(null);
  const chart = chartRef.current?.chart;
  const [, setInit] = useState(false);

  useEffect(() => {
    // hack to force re-render to get the chart instance
    setInit(true);
  }, []);

  const openFullScreen = () => {
    chart.fullscreen.open();
  };

  return (
    <section className="chart-container">
      <div className="chart-header-actions">
        <header className="chart-header">
          <h2>{options.title.text}</h2>
          {options.subtitle.text ? <h3>{options.subtitle.text}</h3> : null}
        </header>
        <div className="chart-actions">
          <button
            type="button"
            onClick={openFullScreen}
            aria-label="full screen"
            className="icon-button"
          >
            <Icons.Icon name="FullScreen" />
          </button>
        </div>
      </div>
      <figure>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
          aria-label={chart.title}
        />
        <figcaption>{options.caption.text}</figcaption>
      </figure>
    </section>
  );
};

export default ExampleChart;
