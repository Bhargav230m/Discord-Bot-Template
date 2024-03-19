import { Schema, model } from "mongoose";

const data = new Schema({
    Guild: String,
    Prefix: String,
})

export default model("guildPrefix", data);