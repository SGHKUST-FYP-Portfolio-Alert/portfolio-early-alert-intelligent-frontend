import { colors } from "./constants";

export function title(string){
    //capitalize first letter of each word
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export function generateAlertContent(item){
    return `${item.type} by ${Math.abs(item.value).toFixed(3)} (once in ${Math.round(1/item.percentile)} days)`
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function getSentimentColor(score){
    if (score === undefined) return colors.neutral
    const value = Math.max(Math.min(score*1.5, 1), -1)

    const pos = hexToRgb(colors.positive)
    const neu = hexToRgb(colors.neutral)
    const neg = hexToRgb(colors.negative)

    const d_pos = { r: pos.r - neu.r, g: pos.g - neu.g, b: pos.b - neu.b}
    const d_neg = { r: neg.r - neu.r, g: neg.g - neu.g, b: neg.b - neu.b}

    if (value > 0){
        
        return `rgb(${parseInt(neu.r+d_pos.r*value)}, ${parseInt(neu.g+d_pos.g*value)}, ${parseInt(neu.b+d_pos.b*value)})`
    } else {
        return `rgb(${parseInt(neu.r-d_neg.r*value)}, ${parseInt(neu.g-d_neg.g*value)}, ${parseInt(neu.b-d_neg.b*value)})`
    }
    
}