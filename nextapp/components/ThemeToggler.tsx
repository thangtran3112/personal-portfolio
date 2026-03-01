"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeToggler = () => {
  const { setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes
          .filter((theme) =>
            ["system", "light", "dark", "violet", "blue"].includes(theme)
          )
          .map((theme) => (
            <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
              <div className="flexCenter gap-x-2">
                <span
                  className={`${
                    (theme === "light" && "bg-white shadow-md") ||
                    (theme === "dark" && "bg-black")
                  } h-5 w-5 rounded-full flexCenter`}
                  style={{ backgroundColor: theme }}
                ></span>
                <span className="capitalize select-text">{theme}</span>
              </div>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggler;
