
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from 'react'
import { colors, serverURL } from '../constants'
import axios from 'axios';
import { Box } from '@material-ui/core';

const PieSentiment = ({data}) => {
  const sentiment_param = {
    positive: {name: 'Positive', color: colors.positive},
    neutral: {name: 'Neutral', color: colors.neutral},
    negative: {name: 'Negative', color: colors.negative}
  }
  const options = data? {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: 250
    },
    title: { text: 'Portfolio Sentiment'},
    tooltip: {pointFormat: '{point.percentage:.1f}%'},
    plotOptions: {
      pie: {
        allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: -50,
            format: '<b>{point.name}</b>: {point.percentage:.0f}% ({point.y})'
          }
        }
    },
    series: [{
        name: '',
        innerSize: '50%',
        colorByPoint: true,
        data: Object.entries(data || {}).map(([k, v])=>({...sentiment_param[k], y: v}))
    }]
  }: null

  return <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
}

const PieCompareToYesterday = ({data}) => {
  const d_sentiment_param = {
    positive: {name: 'Risers', color: colors.positive},
    neutral: {name: 'Neutral', color: colors.neutral},
    negative: {name: 'Fallers', color: colors.negative}
  }
  const options = data? {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: 250
    },
    title: { text: 'Diff to Yesterday'},
    tooltip: {pointFormat: '{point.percentage:.1f}%'},
    plotOptions: {
      pie: {
        allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: -50,
            format: '<b>{point.name}</b>: {point.percentage:.0f}% ({point.y})'
          }
        }
    },
    series: [{
        name: '',
        innerSize: '50%',
        colorByPoint: true,
        data: Object.entries(data || {}).map(([k, v])=>({...d_sentiment_param[k], y: v}))
    }]
  }: null

  return <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
}

const LineSentiment = ({data}) => {
  const option = data? {
    title: { text: 'Portfolio Sentiment'},
    navigator: {enabled: false},
    rangeSelector: {selected: 1},
    series: [{
      name: 'Sentiment',
      data: [...data].reverse().map(([date, value])=>[Date.parse(date), value*100])
    }]
  }: null

  return <HighchartsReact
    highcharts={Highcharts}
    options={option}
    constructorType={'stockChart'}
  />
}

const Overview = () => {

  const [ data, setData ] = useState({})
  useEffect(function(){
    axios.get(serverURL+'overview')
      .then((response)=> setData(response.data))
  }, [])

  return <div>
    <Box display='flex'>
      <PieSentiment
        data={data.sentiment}
      />
      <PieCompareToYesterday
        data={data.d_sentiment}
      />
    </Box>
    <LineSentiment 
      data={data.sentiment?.history}
    />
  </div>
}

export default Overview