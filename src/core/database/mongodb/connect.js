import { connect } from "mongoose";
import "colors";

/**
 * Connects to the database
 */
async function connectToDB() {
  try {
    if (process.env.db) {
      console.log("Connecting to the database".yellow);
      await connect(process.env.db);
      console.log("Connected to the database".green);
    }
  } catch (e) {
    console.log("Failed to connect to the datbase".red);
    console.error(e);
  }
}

export default connectToDB;
