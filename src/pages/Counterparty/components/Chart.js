import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { chartOptions } from './chartConfig';
import { Button, Popover } from '@material-ui/core';
import { seriesToGrouped } from './chartHelper';
import CheckboxWithLabel from '../../../components/CheckboxWithLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { TreeView, TreeItem } from '@material-ui/lab';

var highcharts;

const SelectPopover = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { series } = props;
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState([]);

  const seriesGrouped = seriesToGrouped(series);
  const serieskeyToIdx = Object.fromEntries(series.map((s, idx) => [s.key, idx]));

  useEffect(()=>{
    setChecked(Object.fromEntries(series.map(s => [s.key, true])))
  }, [series])

  function handleClick(evt){
    setAnchorEl(evt.currentTarget);
  }
  function handleClose(){
    setAnchorEl(null);
  };

  function handleChange(evt, keys){    
    let changes =  Object.fromEntries(keys.map(key=> [[key], evt.target.checked]));
    setChecked({...checked, ...changes});
    Object.entries(changes).map(([k, v]) => {
      highcharts.series[serieskeyToIdx[k]].setVisible(v, false);
    })
    highcharts.redraw();
  };

  function handleNodeToggle(evt, nodeIds){
    setExpanded(nodeIds)
  }

  const Selections = () => {

    const CheckboxWithLabelFromSerie = (props) => {

      const serie = props.serie;

      return (
      <CheckboxWithLabel
        name={serie.name}
        checked={serie.items?.map(i=> checked[i.key])?.every(Boolean) || checked[serie.key]}
        indeterminate={serie.items?.map(i=> checked[i.key])?.some(Boolean) && !serie.items?.map(i=> checked[i.key])?.every(Boolean)}
        onChange={(evt)=>{handleChange(evt, serie.items?.map(i=>i.key) || [serie.key])}}
      />
      )
    }

    return (
      <TreeView 
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleNodeToggle}
        disableSelection={true}
      >
        { seriesGrouped.map( s =>
          <TreeItem
            nodeId={s.key} key={s.key}
            label={<CheckboxWithLabelFromSerie serie={s} />}
          >
            {s.items?.map(i => 
              <TreeItem nodeId={i.key} key={i.key} label={<CheckboxWithLabelFromSerie serie={i} />}/>
            )}
          </TreeItem>
        )}
      </TreeView>
    );
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
      <Selections/>
    </Popover>
    </>
  )
}

const Chart = (props) => {

  const chartData = props.chartData;

  let series = [];

  for (const type in chartData)
    series = series.concat(
      chartData[type]
    );

  const options = {
    series,
    ...chartOptions,
    chart: { ...chartOptions.chart, events: { render: function(){ highcharts = this}}},
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