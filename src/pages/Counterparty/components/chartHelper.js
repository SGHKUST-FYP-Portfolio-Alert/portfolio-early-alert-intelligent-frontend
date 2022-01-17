import { calculationDataConfig, priceDataConfig } from "./chartConfig";

function parseData(input, config){

  if (!input) return [];
  
  const datetime = input.map(obj => Date.parse(obj.date));

  return config.map(function({key,defaultValue, ...rest}){
    const path = key.split('.');
    const data = input.map((obj, idx) => 
      [datetime[idx], path.reduce((prev, curr)=> prev?.[curr], obj) || defaultValue]
    ).filter(([_, value]) => value);
    return {
      data,
      key,
      ...rest
    };
  });
};

export function parseCalculationData(input){
  return parseData(input, calculationDataConfig)
}

export function parsePriceData(input){
  return parseData(input, priceDataConfig)
}

export function seriesToGrouped(series){

  var result = [];
  var groupToIdx = {};

  series.forEach(
    function (s){
      if (s.group){
        if (!(s.group in groupToIdx)){
          groupToIdx[s.group] = result.length;
          
          result.push({ key: s.group, name: s.group, items: []})
        }
        result[groupToIdx[s.group]].items.push(s)
      } else {
        result.push(s)
      }
    }
  ); 
  
  return result
}