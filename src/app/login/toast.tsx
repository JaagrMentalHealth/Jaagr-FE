import { useState } from "react";
import { createPortal } from "react-dom";

export function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  return createPortal(
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-md text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 text-lg font-bold leading-none hover:opacity-75"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}
