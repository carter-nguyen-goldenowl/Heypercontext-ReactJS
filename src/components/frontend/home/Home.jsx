import React from "react";
import Navigation from "./Navigation";
import Nabar from "./Nabar";
import Main from "./Main";

export default function Home() {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Navigation />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Nabar />
          <Main />
        </div>
      </div>
    </main>
  );
}
