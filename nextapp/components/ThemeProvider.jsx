"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }) => {
  return (
    <NextThemeProvider {...props} prefers-color-scheme="dark">
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
