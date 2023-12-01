const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// DB bağlantısını burda yapmayacaz.

const SentrySchema = new Schema(
  {
    dutyDate: {
      type: Date,
      require: true,
    },
    infoDate: {
      type: String,
      require: false,
    },
    description: {
      type: String,
      required: false,
      default: "Gece Nöbeti",
    },
    category: {
      type: String,
      required: false,
      default: "Database",
    },
    responsible: {
      type: String,
      required: false,
      default: "Cevdet Yıldırım",
    },
  },
  { timestamps: true }
);

SentrySchema.pre("save", function (next) {
  const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

  // dutyDate'den gün bilgisini al
  const dutyDay = this.dutyDate.getDay(); // getDay 0'dan Pazar, 1'den Pazartesi, ..., 6'dan Cumartesi döndürür

  // gün bilgisini kullanarak gün adını infoDate'e ekle
  this.infoDate = daysOfWeek[dutyDay];

  // next() fonksiyonunu çağırarak işlemi tamamla
  next();
});

const Sentry = mongoose.model("Sentry", SentrySchema);

module.exports = Sentry;
