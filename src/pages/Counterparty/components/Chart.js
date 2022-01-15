import { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from './chartConfig';


const Chart = (props) => {

  const chartData = props.chartData;
  const [display, setDisplay] = useState({
    news_count: true, sentiments: true, keyword: true
  });

  let series = [];

  for (const type in chartData)
    series = series.concat(
      chartData[type].map(({key, group, ...rest}) => ({
        ...rest, display: display[group||key]
      }))
    );

  const options = {
    series,
    ...chartOptions
  };

  if (options.series.length == 0) return null;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
};

export default Chart