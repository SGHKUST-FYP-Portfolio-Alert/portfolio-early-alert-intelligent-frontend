import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';


const Chart = (props) => {

  const data = props.data;
  let series = []

  if (data.calculation){
    
    const calculationData = data.calculation.map(
      obj => ({datetime: Date.parse(obj.date), ...obj})
    );

    const keywords = [... new Set(calculationData?.flatMap(
      obj => obj?.keyword_count? Object.keys(obj.keyword_count): undefined
    ))];

    const calculationSeries = [
      { 
        name: 'News Count', 
        data: calculationData?.map(obj => [obj.datetime, obj.news_count])
      },
      { 
        name: 'Sentiments - Positive', 
        data: calculationData?.map(obj => [obj.datetime, obj?.sentiments['1'] || 0])
      },
      { 
        name: 'Sentiments - Neutral', 
        data: calculationData?.map(obj => [obj.datetime, obj?.sentiments['0'] || 0])
      },
      { 
        name: 'Sentiments - Negative', 
        data: calculationData?.map(obj => [obj.datetime, obj?.sentiments['-1'] || 0])
      },
      ...keywords?.flatMap(keyword => ({
        name: 'Keywords - ' + keyword,
        data: calculationData?.map(obj => [obj.datetime, obj?.keyword_count?.[keyword]]),
        yAxis: 1,
        type: 'column'
      }))
    ];

    series = series.concat(calculationSeries)

  };

  if (data.price){
    console.log('run2.1')
    if (!(data.price)) return;
    console.log('run2.2')
    const priceData = data.price.map(
      obj => ({datetime: Date.parse(obj.date), ...obj})
    );
    const priceSeries = {
      name: 'Price',
      data: priceData.map(obj => [obj.datetime, obj.Close])
    }
    series = series.concat(priceSeries)
  };

  
  const options = {
    series: series,
    rangeSelector: {
      buttons: [
        {type: 'month', count: 1, text: '1M'},
        {type: 'month', count: 3, text: '3M'}, 
        {type: 'month', count: 6, text: '6M'},
        {type: 'ytd', text: 'YTD'},
        {type: 'year', count: 1, text: '1Y'},
        {type: 'year', count: 3, text: '3Y'},
        {type: 'all', text: 'All'}
      ],
      selected: 0
    },
    xAxis: {
      type: 'datetime',
      minTickInterval: 24 * 60 * 60 * 1000
    },
    yAxis: [{
      labels: {align: 'right', x: -3},
      title: { text: ''},
      height: '60%',
      lineWidth: 2,
      resize: {enabled: true}
    }, {
      labels: {align: 'right', x: -3},
      title: {text: 'Keywords'},
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    plotOptions: {
      column: {
        pointRange:24 * 60 * 60 * 1000,
        stacking: 'normal',
      },
      series: {
          pointRange: 24 * 60 * 60 * 1000,
          showInNavigator: true
      }
    },
  }

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