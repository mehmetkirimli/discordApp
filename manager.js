const mongoose = require("mongoose");
const Sentry = require("./model");
const express = require("express");
const bodyParser = require("body-parser");
const { parse, format } = require("date-fns");

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

    console.log(req.body.dutyDate);
    const parsedDate = parse(req.body.dutyDate, "dd.MM.yyyy", new Date());
    console.log(parsedDate);

    const saveData = new Sentry({
      dutyDate: parsedDate,
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

// 1 yıllık veri oluşturalım
// function testData() {
//   const daysInYear = 365;
//   const currentDate = new Date();
//   for (let i = 0; i < daysInYear; i++) {
//     const nextDate = new Date(currentDate);
//     nextDate.setDate(currentDate.getDate() + i);

//     const sentryData = {
//       dutyDate: nextDate, // dutyDate'e ISO formatında tarih ekleyelim
//       // Diğer alanlara gerekirse uygun verileri ekleyebilirsiniz
//     };

//     const newSentry = new Sentry(sentryData);

//     newSentry
//       .save()
//       .then((savedSentry) => {
//         console.log(`Veri başarıyla eklendi: ${savedSentry.dutyDate}`);
//       })
//       .catch((error) => {
//         console.error(`Veri eklenirken hata oluştu: ${error.message}`);
//       });
//   }
// }

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
      const parsedDate = parse(tarih, "dd.MM.yyyy", new Date());
      const veriler = await Sentry.findOne({ dutyDate: parsedDate }); // filtrele gün
      return veriler;
    } catch (err) {
      console.log(err);
    }
  };

  // update
};

// testData();

module.exports = new DutyService();
