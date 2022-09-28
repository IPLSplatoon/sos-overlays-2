export function addDots(str: string, len: number = 40){
    if (str.length < len+3){
        return str;
    } else {
        return str.slice(0, len) + "...";
    }
}