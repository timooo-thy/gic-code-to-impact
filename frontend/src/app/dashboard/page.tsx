import React from "react";

export default async function Dashboard() {
  return (
    <main className="flex flex-col items-center min-h-dvh">
      <div className="h-16 flex justify-center items-center">
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-col justify-center border h-40 w-full pl-4">
        <p>Hello</p>
      </div>
    </main>
  );
}
