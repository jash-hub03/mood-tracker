"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

export default function Dashboard() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "entries"));

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();

        return {
          mood: Number(d.mood),
          note: d.note,
          date: d.date?.toDate ? d.date.toDate() : new Date(d.date),
        };
      });

      // sort by date
      data.sort((a, b) => a.date.getTime() - b.date.getTime());

      setEntries(data);
    };

    fetchData();
  }, []);

  // prepare chart data
  const chartData = entries.map((e) => ({
  mood: e.mood,
  date: e.date, // keep original date (VERY IMPORTANT)
}));

  // average mood
  const avgMood =
    entries.reduce((sum, e) => sum + e.mood, 0) /
    (entries.length || 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mood Dashboard 📊</h1>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis
  dataKey="date"
  tickFormatter={(date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
/>
            <YAxis domain={[1, 10]} />
            <Tooltip
  labelFormatter={(date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  formatter={(value) => [`Mood: ${value}`, ""]}
/>


            {/* Average line */}
            <ReferenceLine
              y={avgMood}
              label="Average"
              stroke="red"
              strokeDasharray="3 3"
            />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#3b82f6"
              fill="#93c5fd"
              strokeWidth={2}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#1d4ed8"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Average Mood Box */}
      <div className="mt-4 p-3 border rounded">
        <h2 className="font-semibold">Average Mood</h2>
        <p>{avgMood.toFixed(1)} / 10</p>
      </div>

      {/* Entries List */}
      <div className="mt-6">
        <h2 className="font-semibold">Entries</h2>

        {entries.map((e, i) => (
          <div key={i} className="border p-2 mt-2 rounded">
            <p>Mood: {e.mood}</p>
            <p>Note: {e.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}