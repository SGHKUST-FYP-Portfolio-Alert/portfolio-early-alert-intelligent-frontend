import { colors } from "@material-ui/core";

export const keywords = ["Ownership change", "Change of control", "Acceleration", "accelerate", "Default", "Insolvency", "Insolvent", "Delay", "Late", "Failure", "fail", "Dispute", "Liquidation", "Liquidator", "Margin call", "Haircut", "Bank run", "Termination", "Moratorium", "Suspension", "Suspend", "Fraud", "misrepresentation", "Fine", "sanction", "Breach", "Reschedule", "Restructuring", "Restructure", "Credit event", "Losses", "Loss", "Bailout", "Bailin", "Bankrupt", "Receivership", "Receiver", "Judicial Management", "Judicial Manager", "Administration", "Administrator", "Sequestrate", "Sequestration", "Support", "Capital call", "Liquidity event", "Negative trends", "Price changes", "Board infighting", "Corruption", "Inappropriate or ultra vires dealings", "Negative working capital", "Acquisition", "LBO", "Qualified audit opinion", "Regulatory breach", "Non-performing assets", "Provisions", "Force majeur", "Distress", "Frozen", "Delisted", "Sued", "Suit", "Arrested", "Disappeared", "Uncontactable"];

const sentimentTooltipConfig = {
  pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
}

export const calculationDataConfig = [
  {
    name: 'News Count',
    key: 'news_count',
    zIndex: 1,
    color: '#000000',
    yAxis: 'news_count',
    legendIndex: 1
  },
  {
    id: 'sentiment_wma',
    color: colors.blue[500],
    name: 'Sentiment Score',
    key: 'sentiments.rolling_avg',
    group: 'Sentiments',
    yAxis: 'sentiment_score',
    tooltip: { valueDecimals: 2},
    legendIndex: 0
  },
  {
    name: 'Positive',
    key: 'sentiments.1',
    defaultValue: 0,
    group: 'Sentiments',
    stacking: 'percent',
    color: '#66ff66',
    type: 'area',
    yAxis: 'sentiments',
    tooltip: sentimentTooltipConfig,
  },
  {
    name: 'Neutral',
    key: 'sentiments.0',
    defaultValue: 0,
    group: 'Sentiments',
    stacking: 'percent',
    color: '#bbbbbb',
    type: 'area',
    yAxis: 'sentiments',
    tooltip: sentimentTooltipConfig,
    visible: false
  },
  {
    name: 'Negative',
    key: 'sentiments.-1',
    defaultValue: 0,
    group: 'Sentiments',
    stacking: 'percent',
    type: 'area',
    color: '#ff6666' ,
    yAxis: 'sentiments',
    tooltip: sentimentTooltipConfig
  },
  ...keywords.map(keyword => ({
    name: keyword,
    key: 'keyword_count.'+ keyword.toLowerCase(),
    type: 'column',
    group: 'Keywords',  
    yAxis: 'keywords',
    showInLegend: false
  }))
];

export const priceDataConfig = [
  {
    name: 'Price',
    showInLegend: false,
    type: 'hollowcandlestick',
    key: 'price',
    compare: 'percent',
    tooltip: {
      valueDecimals: 2,
    },
    yAxis: 'price'
  }
]

export const alertDataConfig = {
  key: 'alert',
  name: 'Alerts',
  type: 'flags',
  shape: 'circlepin',
  width: 20,
  showInLegend: false,
  color: colors.red[400],
}

export const chartOptions = {
  legend: {
    enabled: true,
  },
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
    selected: 1
  },
  xAxis: {
    type: 'datetime',
    minTickInterval: 24 * 60 * 60 * 1000
  },
  yAxis: [{
    id: 'sentiment_score',
    title: { text: 'Sentiment Score'},
    labels: {align: 'left', x: 3},
    height: '40%',
    offset: 0,
    opposite: false,
    lineWidth: 2,
    tickPixelInterval: 25,
    showEmpty: false,
  },{
    id: 'price',
    title: { text: 'Stock Price'},
    labels: {align: 'right', x: -3, format: '{value}%'},
    height: '40%',
    lineWidth: 2,
    resize: {
      enabled: true, y: 6,
      controlledAxis: {prev: ['sentiment_score'], next: [ 'sentiments']}
    },
    allowDecimals: true,
    tickPixelInterval: 25,
    showEmpty: false,
  },{
    id: 'news_count',
    labels: {align: 'left', x: 3},
    title: { text: 'News Count'},
    opposite: false,
    offset: 0,
    top: '70%', 
    height: '30%',
    lineWidth: 2,
    tickPixelInterval: 25,
  }, {
    id: 'sentiments',
    title: { text: 'Sentiment %'},
    labels: {align: 'right', x: -3, format: '{value}%'},
    top: '45%',
    height: '20%',
    lineWidth: 2,
    offset: 0,
    resize: {
      enabled: true, y:6, 
      controlledAxis: { next: ['news_count','keywords']}
    },
    tickPixelInterval: 25,
  },
  {
    id: 'keywords',
    labels: {align: 'right', x: -3},
    title: {text: 'Keywords'},
    top: '70%',
    height: '30%',
    offset: 0,
    lineWidth: 2,
    tickPixelInterval: 25,
  },],
  plotOptions: {
    column: {
      stacking: 'normal',
      dataGrouping: {groupPixelWidth: 25}
    },
    series: {
        showInNavigator: true,
    },
  },
  chart: {
    height: 460
  }
}