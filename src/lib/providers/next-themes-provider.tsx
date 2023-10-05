'use client'

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function NextThemesProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider attribute={'class'} enableSystem={false} defaultTheme={'dark'}>
        {children}
      </ThemeProvider>
    </>
  )
}