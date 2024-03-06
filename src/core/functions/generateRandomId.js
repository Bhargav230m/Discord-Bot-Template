/**
 * Generate a unique product key of the specified length.
 *
 * @param {number} length - The length of the product key to generate.
 * @param {number} tlength - The total length of the product key
 * @returns {string} The generated product key.
 */
function generateRandomId(tlength, length) {
  if(!length) length = 0
  
  const characters = "AaBbCcDdEeFfGgHhKkLlMmNnXxSsQq";
  const id = process.pid;
  let productKey = "";

  for (let i = 0; i < tlength; i++) {
    productKey += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    const n = Math.floor(Math.random() * tlength);
    productKey += n
  }

  productKey += Date.now().toString().slice(0, 4);

  productKey += id;
  productKey = productKey.slice(0, -length);

  return productKey;
}

export default generateRandomId