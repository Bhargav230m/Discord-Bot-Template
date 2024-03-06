import { createRequire } from "node:module";
import { glob } from "glob";
import path from "path";
const require = createRequire(import.meta.url);

//Function to delete cached files
async function deleteCachedFiles(file) {
  const filePath = path.resolve(file);
  if (require[filePath]) {
    delete require[filePath];
  }
}

//Loads files all the files from the specified path/directory and returns files ending with .js
export async function loadFiles(dirName) {
  try {
    const files = await glob(
      path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/")
    );
    //Filters the files out
    const jsFiles = files.filter((file) => path.extname(file) === ".js");
    await Promise.all(jsFiles.map((file) => deleteCachedFiles(file)));
    return jsFiles;
  } catch (err) {
    console.log(`Error loading files from directory ${dirName}: ${err}`);
    throw err;
  }
}

export default loadFiles;
