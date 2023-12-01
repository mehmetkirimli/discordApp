const mongoose = require("mongoose");
const Sentry = require("./model");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3005;

// JSON verilerini işlemek için bodyParser middleware
app.use(bodyParser.json());

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Server Port : ${port} is run.`);
});

// MongoDB bağlantısı
mongoose.connect("mongodb://localhost:27017/Sentry").then(() => {
  console.log("DB Connected.");
});

mongodb: mongoose.connection.on("connected", () => {
  console.log("MongoDB connection is succesfull.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection is failed:", err);
});

// CONTROLLER
// POST endpoint'i
app.post("/save", async (req, res) => {
  try {
    // Gelen verileri Sentry modeline uygun hale getir
    const saveData = new Sentry({
      dutyDate: req.body.dutyDate,
      infoDate: req.body.infoDate,
      description: req.body.description,
      category: req.body.category,
      responsible: req.body.responsible,
    });

    // Veriyi MongoDB'ye kaydet
    const savedData = await saveData.save();

    res.json(savedData); // Başarıyla eklenen Sentry verisini yanıtla
  } catch (err) {
    console.error("Sentry add+ error :", err);
    res.status(500).json({ error: "Sentry add+ error" });
  }
});

// GET endpoint'i
app.get("/getSentry", async (req, res) => {
  try {
    // Tüm Sentry kayıtlarını getir
    const sentryList = await Sentry.find();

    res.json(sentryList); // Tüm Sentry kayıtlarını JSON formatında yanıtla
  } catch (err) {
    console.error("Sentry list is getting error:", err);
    res.status(500).json({ error: "Sentry list is getting error:" });
  }
});

const DutyService = class DutyService {
  getAll = async () => {
    try {
      const veriler = await Sentry.find(); // filtrele gün
      // console.log("Veriler : /n", veriler);
      return veriler;
    } catch (err) {
      console.log(err);
    }
  };

  getOne = async (tarih) => {
    try {
      console.log(tarih);
      const veriler = await Sentry.findOne({ dutyDate: tarih }); // filtrele gün
      // console.log("Veriler : /n", veriler);
      return veriler;
    } catch (err) {
      console.log(err);
    }
  };

  // update
};

module.exports = new DutyService();
