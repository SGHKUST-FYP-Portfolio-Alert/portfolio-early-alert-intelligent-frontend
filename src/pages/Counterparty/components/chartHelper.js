import { calculationDataConfig, priceDataConfig } from "./chartConfig";

function parseData(input, config){
  
  const datetime = input.map(obj => Date.parse(obj.date));

  return config.map(function({key,defaultValue, ...rest}){
    const path = key.split('.');
    const data = input.map((obj, idx) => 
      [datetime[idx], path.reduce((prev, curr)=> prev?.[curr], obj) || defaultValue]
    ).filter(([_, value]) => value);
    return {
      data,
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