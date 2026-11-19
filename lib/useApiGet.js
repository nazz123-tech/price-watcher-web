"use client";

import { useEffect, useState } from "react";
import { api, getErrorMessage } from "./api";

const SLOW_AFTER_MS = 3000;

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
