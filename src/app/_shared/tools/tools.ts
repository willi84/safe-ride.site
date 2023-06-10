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

export const hashString = (string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  return window.crypto.subtle.digest('SHA-256', data).then(buffer => {
    const hashArray = Array.from(new Uint8Array(buffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  });
}
export const unhashString = (hashedString) => {
  // Note: Hash functions are one-way, so it's not possible to directly unhash the data.
  // This function is provided as a simple demonstration and will not actually unhash the data.
  return `Unhashed: ${hashedString}`;
}