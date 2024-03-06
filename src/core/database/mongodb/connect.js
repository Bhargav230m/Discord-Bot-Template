import { connect } from "mongoose";
import "colors";

async function connectToDB() {
  try {
    console.log("Connecting to the database".yellow);
    await connect(process.env.db);
    console.log("Connected to the database".green);
  } catch (e) {
    console.log("Failed to connect to te datbase".red);
    console.error(e);
  }
}

export default connectToDB;
