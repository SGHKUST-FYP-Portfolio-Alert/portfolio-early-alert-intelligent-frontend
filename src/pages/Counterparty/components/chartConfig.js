export const keywords = ["Ownership change", "Change of control", "Acceleration", "accelerate", "Default", "Insolvency", "Insolvent", "Delay", "Late", "Failure", "fail", "Dispute", "Liquidation", "Liquidator", "Margin call", "Haircut", "Bank run", "Termination", "Moratorium", "Suspension", "Suspend", "Fraud", "misrepresentation", "Fine", "sanction", "Breach", "Reschedule", "Restructuring", "Restructure", "Credit event", "Losses", "Loss", "Bailout", "Bailin", "Bankrupt", "Receivership", "Receiver", "Judicial Management", "Judicial Manager", "Administration", "Administrator", "Sequestrate", "Sequestration", "Support", "Capital call", "Liquidity event", "Negative trends", "Price changes", "Board infighting", "Corruption", "Inappropriate or ultra vires dealings", "Negative working capital", "Acquisition", "LBO", "Qualified audit opinion", "Regulatory breach", "Non-performing assets", "Provisions", "Force majeur", "Distress", "Frozen", "Delisted", "Sued", "Suit", "Arrested", "Disappeared", "Uncontactable"];

export const calculationDataConfig = [
  {
    name: 'News Count',
    key: 'news_count'
  },
  {
    name: 'Sentiments - Positive',
    key: 'sentiments.1',
    defaultValue: 0,
    group: 'sentiments'
  },
  {
    name: 'Sentiments - Neutral',
    key: 'sentiments.0',
    defaultValue: 0,
    group: 'sentiments'
  },
  {
    name: 'Sentiments - Negative',
    key: 'sentiments.-1',
    defaultValue: 0,
    group: 'sentiments'
  },
  ...keywords.map(keyword => ({
    name: 'Keyword - ' + keyword,
    key: 'keyword_count.'+ keyword,
    type: 'column',
    group: 'keyword',  
    yAxis: 1
  }))
];

export const priceDataConfig = [
  {
    name: 'Price',
    key: 'Close'
  }
]

export const chartOptions = {
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
  chart: {
    reflow: false,
    events: {
        redraw: function() {
            console.log("highcharts redraw, rendering-done");
        }
    },
    animation: false
  },
}