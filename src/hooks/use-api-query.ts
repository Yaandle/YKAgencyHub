"use client";

import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

export function useApiQuery(queryFunction: any, args: any) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);

  // Ensure args is an object or undefined
  const queryArgs = typeof args === 'object' && args !== null ? args : undefined;

  // Use undefined for args if it's "skip" or not an object
  const apiQuery = args === "skip" ? undefined : useQuery(queryFunction, queryArgs);

  useEffect(() => {
    if (apiQuery !== undefined && apiQuery !== null) {
      if ('error' in apiQuery) {
        setError(apiQuery.error);
      } else {
        setData(apiQuery);
      }
    } else {
      // Handle the case when apiQuery is null or undefined
      setData(null);
      setError(null);
    }
  }, [apiQuery]);

  return { data, error };
}
