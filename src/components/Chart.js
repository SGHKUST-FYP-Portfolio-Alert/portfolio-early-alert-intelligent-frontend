import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';


const Chart = (props) => {

  const dataKeys = [
    { key: 'closing_stock_price', name: 'Price'},
    { key: 'average_score', name: 'Sentiment'},
    //{ key: 'keyword_count', name: 'Keyword' }
  ]

  
  function parseDataToSeries(data){
    // input: [{date, data1, data2}, ...]
    // output: {[[datetime, data1], ...], [[datetime, data2], ...]}
    let result = [];
    let keysToIdx = {};

    dataKeys.forEach(function({key, name}){
      keysToIdx[key] = result.length;
      result.push({name: name, data: []});
    })

    data.forEach(function (obj){
      const datetime = Date.parse(obj.date);
      dataKeys.forEach(function({key}){
        if (obj[key])
          result[keysToIdx[key]].data.push([datetime, obj[key]]);
      });
    });

    return result;
  }

  const series = parseDataToSeries(props.data)

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
      selected: 4
    },
    plotOptions: {
      series: {
          compare: 'percent',
          showInNavigator: true
      }
    },
  }
  
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  )
};

export default Chart