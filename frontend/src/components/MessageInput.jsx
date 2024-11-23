import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Mic, Smile } from "lucide-react"; // Import Smile for emoji
import EmojiPicker from "emoji-picker-react"; // Import emoji picker component
import toast from "react-hot-toast";
import axios from "axios";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [voiceNote, setVoiceNote] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Emoji picker state
  const fileInputRef = useRef(null);
  const voiceNoteInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  // Handle emoji selection
  const handleEmojiSelect = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !voiceNote) {
      toast.error("Please add text, an image, or a voice note.");
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        voiceNote,
      });

      // Clear input fields
      setText("");
      setImagePreview(null);
      setVoiceNote(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (voiceNoteInputRef.current) voiceNoteInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Handle voice note upload
  const handleVoiceNoteUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      toast.error("Please select an audio file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("Audio file size should be less than 10MB.");
      return;
    }

    setVoiceNote(file);
  };

  const removeVoiceNote = () => {
    setVoiceNote(null);
    if (voiceNoteInputRef.current) voiceNoteInputRef.current.value = "";
  };

  const sendVoiceNote = async () => {
    if (!voiceNote) {
      toast.error("No voice note selected.");
      return;
    }

    const formData = new FormData();
    formData.append("voiceNote", voiceNote);

    try {
      await axios.post("/messages/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Voice note sent successfully!");
      setVoiceNote(null);
      if (voiceNoteInputRef.current) voiceNoteInputRef.current.value = "";
    } catch (error) {
      console.error("Error sending voice note:", error);
      toast.error("Failed to send voice note. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full relative">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center relative">
          {/* Emoji Picker */}
          <div className="relative">
            <button
              type="button"
              className="btn btn-circle p-0 text-zinc-400"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <Smile size={24} />
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 z-10 bg-white shadow-md rounded-lg p-2">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>

          {/* Image Icon */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="btn btn-circle p-0 text-zinc-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={24} />
          </button>

          {/* Mic Icon for Voice Note */}
          <input
            type="file"
            accept="audio/*"
            ref={voiceNoteInputRef}
            onChange={handleVoiceNoteUpload}
            className="hidden"
            id="voiceNoteInput"
          />
          <label
            htmlFor="voiceNoteInput"
            className="cursor-pointer btn btn-circle p-0 text-zinc-400"
          >
            <Mic size={24} />
          </label>

          {/* Text Input */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview && !voiceNote}
        >
          <Send size={24} />
        </button>
      </form>

      {/* Voice Note Upload and Remove Button */}
      {voiceNote && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm">{voiceNote.name}</span>
          <button
            onClick={removeVoiceNote}
            className="btn btn-circle p-0 text-red-500"
            type="button"
          >
            <X className="size-3" />
          </button>
          <button
            onClick={sendVoiceNote}
            className="btn btn-primary btn-sm"
          >
            Send Voice Note
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
