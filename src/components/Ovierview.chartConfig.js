export const pieChartConfig = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: 250,
        height: 200
    },
    title: { margin: 0, style:{fontSize: 16} },
    tooltip: {pointFormat: '{point.percentage:.1f}%'},
    plotOptions: {
      pie: {
        allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            distance: -10,
            format: '<b>{point.name}</b>: {point.percentage:.0f}% ({point.y})'
          }
        }
    },
    series: {
        name: '',
        innerSize: '60%',
        size: '100%',
        colorByPoint: true,
    }
}