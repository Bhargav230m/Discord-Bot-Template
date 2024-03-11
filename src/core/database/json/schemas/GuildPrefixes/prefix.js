import { JsonSchema } from "arrowment-db";
import arrowmentDB from "../../jsonDB.js";

const data = {
  Guild: String,
  Prefix: String,
};

const prefixData = new JsonSchema({
  schema: data,
  json_class: arrowmentDB,
  name: "GuildPrefixes",
});

export default prefixData;
