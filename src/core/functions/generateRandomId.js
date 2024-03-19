/**
 * Generate a unique product key of the specified length.
 *
 * @param {number} length - The length of the product key to generate.
 * @returns {string} The generated product key.
 */
function generateRandomId(length) {
  const characters = "AaBbCcDdEeFfGgHhKkLlMmNnXxSsQq";
  const id = process.pid;
  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));

    const n = Math.floor(Math.random() * length);
    code += n;
  }

  code += Date.now().toString().slice(0, 4);

  code += id;
  code = code.slice(0, -length);

  return code;
}

export default generateRandomId;
