import Ping from "../models/Ping.js";

export async function getAllPings(_, res) {
  try {
    const pings = await Ping.find();
    res.status(200).json(pings);
  } catch (error) {
    console.error("Error in getAllPings controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function createPing(req, res) {
  try {
    const { person, value } = req.body;
    const ping = new Ping({ person, value });

    const savedPing = await ping.save();
    res.status(201).json(savedPing);
  } catch (error) {
    console.error("Error in createPing controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function updatePing(req, res) {
  try {
    const updatedPing = await Ping.findByIdAndUpdate(
      req.params.id,
      { $inc: { value: 1 } },
      {
        returnDocument: "after",
      },
    );
    if (!updatedPing)
      return res.status(404).json({ message: "Ping not found" });
    res.status(200).json(updatedPing);
  } catch (error) {
    console.error("Error in updatePing controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function resetPing(req, res) {
  try {
    const resetedPing = await Ping.findByIdAndUpdate(
      req.params.id,
      { value: 0 },
      {
        returnDocument: "after",
      },
    );
    if (!resetedPing)
      return res.status(404).json({ message: "Ping not found" });
    res.status(200).json(resetedPing);
  } catch (error) {
    console.error("Error in resetPing controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
