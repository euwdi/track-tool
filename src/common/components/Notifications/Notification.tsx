import { useEffect } from "react";
import { useNotifications } from "@/stores/notificationsStore";
import classes from "./style.module.scss";

export const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    const timeouts = notifications
      .filter((n) => n.duration)
      .map((n) => {
        return setTimeout(() => removeNotification(n.id), n.duration);
      });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [notifications, removeNotification]);

  if (!notifications.length) return null;

  return (
    <div className={classes.notificationsContainer}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${classes.notification} ${classes[notification.type]}`}
          onClick={() => removeNotification(notification.id)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};
