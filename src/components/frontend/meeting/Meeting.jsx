import React from "react";
import Nabar from "../home/Nabar";
import Navigation from "../home/Navigation";
export default function Meeting() {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <Navigation />
        <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
          <Nabar />
          <div>this is page meeting</div>
        </div>
      </div>
    </main>
  );
}
