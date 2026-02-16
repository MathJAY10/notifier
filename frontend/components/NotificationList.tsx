"use client";

import { useEffect } from "react";
import { socket } from "../lib/socket";
import { useNotificationStore } from "../store/notificationStore";

export default function NotificationList() {
  const { notifications, addNotification } = useNotificationStore();

  useEffect(() => {
    socket.on("notification", (data: string) => {
      console.log("socket -> notification:", data);
      addNotification(data);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>Notifications ({notifications.length})</h2>

      {notifications.map((n, index) => {
        let parsed: any = null;
        try {
          parsed = JSON.parse(n);
        } catch {
          parsed = null;
        }

        return (
          <div key={index} style={{ marginBottom: 8 }}>
            {parsed && parsed.title ? (
              <div>
                <div style={{ fontWeight: 600 }}>{parsed.title}</div>
                <div>{parsed.body ?? parsed.message ?? JSON.stringify(parsed)}</div>
              </div>
            ) : (
              <div>{n}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
function init() {
  throw new Error("Function not implemented.");
}

