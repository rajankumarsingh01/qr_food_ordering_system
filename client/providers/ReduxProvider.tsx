"use client";

import { useRef, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // ✅ Client side mount hone ke baad render karo
    // Yeh SSR/CSR mismatch hatata hai
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Server + first client render — empty cart state se match karo
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return <Provider store={store}>{children}</Provider>;
}