import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
const Group = mongoose.model("Group", groupSchema);

export default Group;