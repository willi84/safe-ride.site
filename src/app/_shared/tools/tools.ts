export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};


export const reduceFloat = (value: String, decimal:  number) => {
  let latitude: string = value.toString();
  const arrLat = latitude.indexOf(',') !== -1 ?  latitude.split(',') : latitude.split('.');
  let newLat = '';
  try{

    newLat = arrLat[0] + '.' + arrLat[1].slice(0, decimal);
  } catch(e){
    console.log(e);
    console.log(arrLat)
  }
  return parseFloat(newLat);
}