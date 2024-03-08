import { connect } from "mongoose";
import "colors";

/**
 * Connects to the database
 */
async function connectToDB() {
  try {
    if (process.env.mongodb_env) {
      console.log("Connecting to the database".yellow);
      await connect(mongodb_env);
      console.log("Connected to the database".green);
    }
  } catch (e) {
    console.log("Failed to connect to the datbase".red);
    console.error(e);
  }
}

export default connectToDB;
