import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Select from "../ui/Select";

const allThemes = ["system", "dark", "light"];

const SelectTheme = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Select defaultValue={theme} onChange={(e) => setTheme(e.target.value)}>
      {allThemes.map((item) => (
        <option key={item} label={item} value={item}>
          {item}
        </option>
      ))}
    </Select>
  );
};

export default SelectTheme;
