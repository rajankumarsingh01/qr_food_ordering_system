"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setTableNumber } from "@/redux/slices/cartSlice";

/**
 * Call this once in customer menu page.
 * Reads ?table=N from URL and persists to Redux + localStorage.
 */
export function useTableFromUrl() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tableParam = searchParams.get("table");
    if (tableParam) {
      const tableNumber = Number(tableParam);
      if (!isNaN(tableNumber) && tableNumber > 0) {
        dispatch(setTableNumber(tableNumber));
      }
    }
  }, [searchParams, dispatch]);
}