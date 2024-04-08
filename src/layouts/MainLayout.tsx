import React from "react";
import Header from "../components/Header";

export default function MainLayout({
  children,
  isDesc = true,
}: {
  children: React.ReactNode;
  isDesc?: boolean;
}) {
  return (
    <>
      <Header isDesc={isDesc} />
      {children}
    </>
  );
}
