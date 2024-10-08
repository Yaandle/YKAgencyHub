// src/hooks/use-api-query.ts
"use client";

import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

export const useApiQuery = <T>(queryFunction: any, args?: any) => {
  const [data, setData] = useState<T | null>(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState<any>(null);

  // Fetch the data using the query function from Convex
  const apiQuery = useQuery(queryFunction, args);

  useEffect(() => {
    if (apiQuery !== undefined) {
      setData(apiQuery as T);
      setPending(false);
      setError(null);
    } else if (apiQuery === undefined) {
      setPending(true);
    } else {
      setError(new Error("Failed to fetch data"));
      setPending(false);
    }
  }, [apiQuery]);

  return {
    data,
    pending,
    error,
  };
};
