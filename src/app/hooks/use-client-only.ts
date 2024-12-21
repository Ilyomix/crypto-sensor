"use client";

import { useEffect, useState } from 'react';

export function useClientOnly<T>(callback: () => T, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(callback());
  }, [callback]);

  return value;
}
