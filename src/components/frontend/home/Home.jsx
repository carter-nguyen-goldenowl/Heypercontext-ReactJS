import React from "react";
import Nabar from "./Nabar";
import Main from "./Main";

export default function Home() {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Nabar />
        <Main />
      </div>
    </main>
  );
}
