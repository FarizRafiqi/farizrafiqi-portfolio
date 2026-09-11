"use client";

import React, { createContext, useContext, useState } from "react";
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
  setRole: (role: string | null) => void;
  pitch: PitchData | null;        // active Sanity application pitch, if any
  isCustomized: boolean;          // true if either role param or pitch is active
}

const CustomizationContext = createContext<CustomizationContextType>({
  role: null,
  setRole: () => {},
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
  const searchParams = useSearchParams();
  const urlRole = !initialPitch ? searchParams.get("role")?.toLowerCase() || null : null;
  const [explicitRole, setExplicitRole] = useState<string | null>(initialRole ?? null);

  const role = explicitRole ?? urlRole;
  const setRole = setExplicitRole;

  const contextValue = React.useMemo(
    () => ({
      role,
      setRole,
      pitch: initialPitch,
      isCustomized: !!role || !!initialPitch,
    }),
    [role, initialPitch]
  );

  return (
    <CustomizationContext.Provider value={contextValue}>
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
