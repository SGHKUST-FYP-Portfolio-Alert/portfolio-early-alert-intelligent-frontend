export function title(string){
    //capitalize first letter of each word
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export function generateAlertContent(item){
    return `${item.type} by ${Math.abs(item.value).toFixed(3)} (once per ${Math.round(1/item.percentile)} days)`
}