const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
require('dotenv').config();
const path = require("path");
const moment = require("moment");

const app = express();
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.n7qnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define schemas
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  nationality: String,
  url: String,
});

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  current_team: String,
  team: teamSchema,
});

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

// Function to import data from CSV to MongoDB
const importCSV = async (filePath) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log("CSV Read Complete. Number of rows:", results.length);

      for (const row of results) {
        try {
          const teamName = row.current_team;
          let team = await Team.findOne({ name: teamName });

          // Si el equipo no existe, crear uno nuevo
          if (!team) {
            team = new Team({
              id: results.length + 1,
              name: teamName,
              nationality: row.nationality,
              url: row.url,
            });
            await team.save();
            console.log("Saved new team:", team.name);
          }

          const driverNum = row.number ? row.number.trim() : null;

          if (!driverNum) {
            console.log("Driver number is missing for row:", row);
            continue;
          }

          const driverExists = await Driver.findOne({ num: driverNum });

          // Si el conductor no existe, crear uno nuevo
          if (!driverExists) {
            const driver = new Driver({
              num: driverNum,
              code: row.code,
              forename: row.forename,
              surname: row.surname,
              dob: moment(row.dob, "DD/MM/YYYY").toDate(),
              nationality: row.nationality,
              url: row.url,
              current_team: teamName,
              team: team,
            });
            await driver.save();
            console.log("Saved new driver:", driver.forename, driver.surname);
          }
        } catch (error) {
          console.error("Error processing row:", row, error);
        }
      }

      console.log("CSV data import process completed.");
    });
};

// Import data when the server starts
const filePath = path.join(__dirname, "public/data/f1_2023.csv");
importCSV(filePath);

app.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find(); // Recupera todos los drivers
    const teams = await Team.find(); // Recupera todos los equipos
    res.render("index", { drivers, moment, teams, countries }); // Pasa los drivers, Moment y teams a la vista
  } catch (error) {
    console.error("Error retrieving drivers:", error);
    res.status(500).send("Error retrieving drivers");
  }
});

app.get("/driver", async (req, res) => {
  const { num, code, forename, surname, dob, url, nation, team } = req.query; // Obtener los datos del query

  // Crea un nuevo piloto
  const newDriver = new Driver({
    num,
    code,
    forename,
    surname,
    dob: moment(dob).toDate(), // Convierte la fecha a formato Date
    nationality: nation,
    url,
    current_team: team,
    team: { name: team } // Aquí se asume que el equipo es simplemente el nombre
  });

  try {
    await newDriver.save(); // Guarda el nuevo piloto en la base de datos
    res.redirect("/"); // Redirige a la lista de pilotos
  } catch (err) {
    console.error("Error al crear el piloto:", err);
    res.status(500).send("Error al crear el piloto");
  }
});

app.post("/drivers/:id", async (req, res) => {
  const { id } = req.params; // Obtener ID del conductor
  const { num, code, forename, surname, dob, nation, team } = req.body; // Extraer datos del cuerpo de la solicitud

  try {
      // Actualizar el conductor en la base de datos
      await Driver.findByIdAndUpdate(id, {
          num,
          code,
          forename,
          surname,
          dob: moment(dob).toDate(), // Convertir la fecha al formato correcto
          nationality: nation,
          current_team: team,
      });

      res.redirect("/"); // Redirigir a la lista de conductores
  } catch (error) {
      console.error("Error updating driver:", error);
      res.status(500).send("Error updating driver");
  }
});


// Start server
app.listen(3000, (err) => {
  if (err) {
    console.error("Error starting the server:", err);
  } else {
    console.log("Listening on port http://localhost:3000");
  }
});
