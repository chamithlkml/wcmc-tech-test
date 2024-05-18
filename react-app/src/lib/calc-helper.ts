export const getAreaPercentage = (value: number, total: number): string => {
  const percentage = (value/total) * 100;

  if(percentage < 1 && percentage > 0){
    return '<1%';
  }

  return `${Math.floor(percentage)}%`;
}