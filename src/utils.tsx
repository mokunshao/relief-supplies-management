export function randomNum(max: number) {
  return Math.round(Math.random() * max);
}

export function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
