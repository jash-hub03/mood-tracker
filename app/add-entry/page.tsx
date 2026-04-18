"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddEntry() {
  const [mood, setMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const router = useRouter();

  const handleSave = async () => {
    if (!mood) {
      alert("Please select a mood!");
      return;
    }

    await addDoc(collection(db, "entries"), {
      mood,
      note,
      date: new Date(),
    });

    alert("Entry saved successfully!");

    // reset form
    setMood(null);
    setNote("");

    // go to dashboard automatically
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4 text-center">
          How are you feeling today?
        </h1>

        {/* Mood Buttons */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <button
              key={num}
              onClick={() => setMood(num)}
              className={`p-3 rounded-lg border ${
                mood === num
                  ? num <= 3
                    ? "bg-red-400 text-white"
                    : num <= 6
                    ? "bg-yellow-400"
                    : "bg-green-500 text-white"
                  : "bg-white"
              }`}
            >
              {num <= 3 ? "😞" : num <= 6 ? "😐" : "😊"} {num}
            </button>
          ))}
        </div>

        {/* Selected Mood */}
        <p className="mb-3 text-center">
          Selected Mood: <strong>{mood ?? "None"}</strong>
        </p>

        {/* Note Input */}
        <textarea
          placeholder="Write how you feel..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save Entry
        </button>

        {/* Manual Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 border p-2 rounded hover:bg-gray-100"
        >
          Go to Dashboard 📊
        </button>

      </div>
    </div>
  );
}