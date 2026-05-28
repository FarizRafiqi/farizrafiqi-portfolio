"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface PitchData {
  companyName: string;
  slug: { current: string };
  role: string;
  greeting: { en: string; id: string };
  selectedProjects?: Array<{
    _id: string;
    slug: { current: string };
    title: { en: string; id: string };
  }>;
}

interface CustomizationContextType {
  role: string | null;            // e.g. "frontend", "backend", etc.
  pitch: PitchData | null;        // active Sanity application pitch, if any
  isCustomized: boolean;          // true if either role param or pitch is active
}

const CustomizationContext = createContext<CustomizationContextType>({
  role: null,
  pitch: null,
  isCustomized: false,
});

function CustomizationInnerProvider({
  children,
  initialPitch = null,
  initialRole = null,
}: {
  children: React.ReactNode;
  initialPitch?: PitchData | null;
  initialRole?: string | null;
}) {
  const [role, setRole] = useState<string | null>(initialRole);
  const searchParams = useSearchParams();

  useEffect(() => {
    // If not in a pre-fetched pitch page, check the URL query parameter
    if (!initialPitch) {
      const urlRole = searchParams.get("role");
      if (urlRole) {
        setRole(urlRole.toLowerCase());
      } else {
        setRole(null);
      }
    }
  }, [searchParams, initialPitch]);

  return (
    <CustomizationContext.Provider
      value={{
        role,
        pitch: initialPitch,
        isCustomized: !!role || !!initialPitch,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
}

export function CustomizationProvider(props: {
  children: React.ReactNode;
  initialPitch?: PitchData | null;
  initialRole?: string | null;
}) {
  return (
    <React.Suspense fallback={<>{props.children}</>}>
      <CustomizationInnerProvider {...props} />
    </React.Suspense>
  );
}

export function useCustomization() {
  return useContext(CustomizationContext);
}
