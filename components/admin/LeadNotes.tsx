"use client";

import { useState } from "react";
import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Note } from "@/lib/admin-types";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface LeadNotesProps {
  leadId: string;
  notes: Note[];
}

export default function LeadNotes({ leadId, notes }: LeadNotesProps) {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function addNote() {
    const trimmed = text.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    try {
      const note: Note = {
        id: crypto.randomUUID(),
        text: trimmed,
        createdAt: Timestamp.now(),
      };
      await updateDoc(doc(db, "leads", leadId), {
        notes: arrayUnion(note),
        updatedAt: serverTimestamp(),
      });
      setText("");
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(noteId: string) {
    const updated = notes.filter((n) => n.id !== noteId);
    try {
      await updateDoc(doc(db, "leads", leadId), {
        notes: updated,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  }

  const sorted = [...notes].sort((a, b) => {
    const aMs = a.createdAt?.toMillis?.() ?? 0;
    const bMs = b.createdAt?.toMillis?.() ?? 0;
    return bMs - aMs;
  });

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
        Notes
      </h4>

      {/* Add note */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
          placeholder="Add a note..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-orange/50 focus:outline-none focus:ring-1 focus:ring-orange/30"
        />
        <button
          onClick={addNote}
          disabled={!text.trim() || saving}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange transition-colors hover:bg-orange/30 disabled:opacity-40"
        >
          <PaperAirplaneIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Note list */}
      {sorted.length === 0 ? (
        <p className="text-xs text-white/20">No notes yet</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sorted.map((note) => (
            <div
              key={note.id}
              className="group flex items-start gap-2 rounded-lg bg-white/[0.03] px-3 py-2"
            >
              <p className="flex-1 text-sm text-white/70 leading-relaxed">
                {note.text}
              </p>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[10px] text-white/20">
                  {note.createdAt?.toDate
                    ? note.createdAt.toDate().toLocaleDateString()
                    : ""}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"
                >
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
