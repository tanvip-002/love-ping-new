import mongoose from "mongoose";

const pingSchema = new mongoose.Schema(
  {
    person: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Ping = mongoose.model("Ping", pingSchema);

export default Ping;
