"use client";

import { useState } from "react";
import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ActionItem } from "@/lib/admin-types";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface LeadActionItemsProps {
  leadId: string;
  actionItems: ActionItem[];
}

export default function LeadActionItems({
  leadId,
  actionItems,
}: LeadActionItemsProps) {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);

  async function addItem() {
    const trimmed = text.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    try {
      const item: ActionItem = {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Timestamp.now(),
      };
      await updateDoc(doc(db, "leads", leadId), {
        actionItems: [...actionItems, item],
        updatedAt: serverTimestamp(),
      });
      setText("");
    } catch (err) {
      console.error("Failed to add action item:", err);
    } finally {
      setSaving(false);
    }
  }

  async function toggleItem(itemId: string) {
    const updated = actionItems.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    try {
      await updateDoc(doc(db, "leads", leadId), {
        actionItems: updated,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to toggle action item:", err);
    }
  }

  async function deleteItem(itemId: string) {
    const updated = actionItems.filter((item) => item.id !== itemId);
    try {
      await updateDoc(doc(db, "leads", leadId), {
        actionItems: updated,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Failed to delete action item:", err);
    }
  }

  // Sort: incomplete first, then completed
  const sorted = [...actionItems].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    const aMs = a.createdAt?.toMillis?.() ?? 0;
    const bMs = b.createdAt?.toMillis?.() ?? 0;
    return bMs - aMs;
  });

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-white/60 uppercase tracking-wider">
        Action Items
      </h4>

      {/* Add item */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add action item..."
          className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-orange/50 focus:outline-none focus:ring-1 focus:ring-orange/30"
        />
        <button
          onClick={addItem}
          disabled={!text.trim() || saving}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange/20 text-orange transition-colors hover:bg-orange/30 disabled:opacity-40"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Item list */}
      {sorted.length === 0 ? (
        <p className="text-xs text-white/20">No action items yet</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sorted.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  item.completed
                    ? "border-green-400/30 bg-green-400/20"
                    : "border-white/20 hover:border-orange/50"
                }`}
              >
                {item.completed && (
                  <svg
                    className="h-3 w-3 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </button>
              <p
                className={`flex-1 text-sm leading-relaxed ${
                  item.completed
                    ? "text-white/30 line-through"
                    : "text-white/70"
                }`}
              >
                {item.text}
              </p>
              <button
                onClick={() => deleteItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
