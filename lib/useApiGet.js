"use client";

import { useEffect, useState } from "react";
import { api, getErrorMessage } from "./api";

// After this many milliseconds we assume the free Render server is asleep.
const SLOW_AFTER_MS = 3000;

// Loads GET <path> from our backend once `enabled` is true.
// Returns:
//   data     - the response (null until loaded); setData lets the page update it
//   error    - a readable message if loading failed
//   slow     - true when loading takes long ("Waking up the server…")
//   retry()  - load again after an error
export function useApiGet(path, enabled) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const slowTimer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);

    api
      .get(path)
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      })
      .finally(() => {
        clearTimeout(slowTimer);
        if (!cancelled) setSlow(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
    };
  }, [path, enabled, attempt]);

  function retry() {
    setError("");
    setAttempt((n) => n + 1);
  }

  return { data, setData, error, slow, retry };
}
