import { ArrowmentJsonDB } from "arrowment-db";
import config from "../../../config.json" assert { type: "json" }

const arrowmentDB = new ArrowmentJsonDB({ data_dir: config.jsonDBStoragePath });

export default arrowmentDB;