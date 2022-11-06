import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";
import Exercise from "./models/Exercise.js";
mongoose.connect(process.env.MONGO_URL);

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a03495aa32msh96223cea27212dbp1bfeacjsn1e9810471c27",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const url = "https://exercisedb.p.rapidapi.com/exercises";

async function fetchData() {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  for (var i = 0; i < data.length; i++) {
    const exercise = new Exercise({
      bodyPart: data[i]["bodyPart"],
      equipment: data[i]["equpment"],
      gifUrl: data[i]["gifUrl"],
      id: data[i]["id"],
      name: data[i]["name"],
      target: data[i]["target"],
    });
    exercise.save();
  }
}

fetchData();
