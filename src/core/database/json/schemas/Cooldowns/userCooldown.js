import { Schema } from "arrowment-db"
import arrowmentDB from "../../jsonDB.js"

const data = {
    Guild: String,
    User: String,
    LastUsedData: Number
}

const userCooldownData = new Schema({ schema: data, json_class: arrowmentDB, name: "UserCooldowns"})

export default userCooldownData;