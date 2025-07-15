// app/customers/CustomersPage.tsx
"use client";

import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Notification(props: {}) {
  const [notifications] = useState([
    { id: 1, message: "New customer signed up" },
    { id: 2, message: "Subscription renewed" },
  ]);

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded shadow-md z-10">
          <div className="p-2">
            {notifications.map((n) => (
              <div key={n.id} className="p-2 text-sm text-gray-700 border-b">
                {n.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
