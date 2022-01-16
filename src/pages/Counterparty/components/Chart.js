import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from './chartConfig';
import { Button, Popover } from '@material-ui/core';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

var hcSeries;

const SelectPopover = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { series } = props
  const [checked, setChecked] = useState([])

  useEffect(()=>{
    setChecked(series.map(_ => true))
  }, [series])

  function handleClick(evt){
    setAnchorEl(evt.currentTarget);
  }
  function handleClose(){
    setAnchorEl(null);
  };

  function handleChange(evt){
    let idx = parseInt(evt.target.name)
    let newChecked = [...checked];
    newChecked[idx] = evt.target.checked;
    setChecked(newChecked);
    hcSeries[idx].setVisible(evt.target.checked);
  }

  return (
    <>
    <Button variant="outlined" onClick={handleClick}>Display/ Hide Data</Button>
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <FormGroup>{
        series.map((s, idx)=>
          <FormControlLabel
            key={idx}
            control={<Checkbox checked={checked[idx]} onClick={handleChange} name={String(idx)}/>}
            label={s.name}
          />
        )
      }</FormGroup>
    </Popover>
    </>
  )
}

const Chart = (props) => {

  const chartData = props.chartData;

  let series = [];

  for (const type in chartData)
    series = series.concat(
      chartData[type].map(({key, group, ...rest}) => ({
        ...rest
      }))
    );

  const options = {
    series,
    chart: { events: { load: function(){ hcSeries = this.series}}},
    ...chartOptions,

  };

  return (
    <>
    <SelectPopover
      series={series}
    />
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
    </>
  )
};

export default Chart