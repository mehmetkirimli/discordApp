const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// DB bağlantısını burda yapmayacaz.

const SentrySchema = new Schema(
  {
    nameSurname: {
      type: String,
      require: true,
    },
    description: String,
    image: String,
    dutyDate: {
      type: Date,
      require: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Sentry = mongoose.model("Sentry", SentrySchema);

module.exports = Sentry;
