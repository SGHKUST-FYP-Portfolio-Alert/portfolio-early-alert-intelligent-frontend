import { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from './chartConfig';
import { Button, Popover } from '@material-ui/core';
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const SelectPopover = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const {display, setDisplay} = props;

  function handleClick(evt){
    setAnchorEl(evt.currentTarget);
  }
  function handleClose(){
    setAnchorEl(null);
  };

  function handleChange(evt){
    setDisplay({
      ...display,
      [evt.target.name]: evt.target.checked,
    })
  }

  return (
    <>
    <Button onClick={handleClick}>Display/ Hide Data</Button>
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
        Object.keys(display).map((group)=>
          <FormControlLabel
            key={group}
            control={<Checkbox checked={display[group]} onClick={handleChange} name={group}/>}
            label={group}
          />
        )
      }</FormGroup>
    </Popover>
    </>
  )
}

const Chart = (props) => {

  const chartData = props.chartData;
  const [display, setDisplay] = useState({
    news_count: true, sentiments: true, keyword: true, Close: true
  });

  let series = [];

  for (const type in chartData)
    series = series.concat(
      chartData[type].map(({key, group, ...rest}) => ({
        ...rest, visible: display[group || key]
      }))
    );

  const options = {
    series,
    ...chartOptions
  };

  if (options.series.length == 0) return null;
  return (
    <>
    <SelectPopover
      display={display}
      setDisplay={setDisplay}
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