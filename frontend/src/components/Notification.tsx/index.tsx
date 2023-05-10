"use client";
import React, { useEffect } from "react";
import "react-notifications-component/dist/theme.css";
import { useRecoilState } from "recoil";
import { Store, ReactNotifications } from "react-notifications-component";
import { notificationAtom } from "@/recoil/notification";

export default function Notification() {
  const [{ notificationType, message, type }, setNotification] = useRecoilState(notificationAtom);
  useEffect(() => {
    if (typeof notificationType === "string" && typeof message === "string" && typeof type === "string") {
      console.log(message);
      Store.addNotification({
        title: notificationType,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      setTimeout(() => {
        setNotification({
          notificationType: null,
          message: null,
          type: undefined,
        });
      }, 5000);
    }
  }, [notificationType, message, type, setNotification]);

  return (
    <>
      {typeof notificationType === "string" && typeof message === "string" && (
        <>
          <ReactNotifications />
          hello
        </>
      )}
    </>
  );
}
