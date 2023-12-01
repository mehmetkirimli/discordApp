const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// DB bağlantısını burda yapmayacaz.
const SentrySchema = new Schema(
  {
    dutyDate: {
      type: String,
      require: true,
    },
    infoDate: {
      type: String,
      require: false,
    },
    formatDate: {
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
  const dutyDate = this.dutyDate instanceof Date ? this.dutyDate : new Date(this.dutyDate);
  const dutyDay = dutyDate.getDay(); // getDay 0'dan Pazar, 1'den Pazartesi, ..., 6'dan Cumartesi döndürür

  // Tarih alanını formatlayan yardımcı fonksiyon
  const formatDateString = () => {
    const dateObject = dutyDate;
    dateObject.setUTCHours(0, 0, 0, 0); // Saat, dakika ve saniye bilgilerini sıfırla
    // return dateObject.toISOString().split("T")[0];

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();

    return `${day}.${month}.${year}`;
  };

  // dutyDate'den formatlanmış tarihi alb
  this.formatDate = formatDateString(this.dutyDate);

  // gün bilgisini kullanarak gün adını infoDate'e ekle
  this.infoDate = daysOfWeek[dutyDay];

  // next() fonksiyonunu çağırarak işlemi tamamla
  next();
});

const Sentry = mongoose.model("Sentry", SentrySchema);

module.exports = Sentry;
