"use client";

import { useEffect, useState } from "react";

export default function FastApiComponent() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_FASTAPI_URL as string
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data.message);
      } catch (error) {
        setData("Error fetching data");
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>FastAPI Component</h1>
      <p>Data fetched: {data}</p>
    </div>
  );
}
