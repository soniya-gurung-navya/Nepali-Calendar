import { dateConfigMap } from "../constants/YearData";
import { toEnglishDigits } from "../constants/NepaliDigits"; // adjust path to match your folder
import { monthNames } from "../constants/NepaliDate";

// export const monthNames = [
//   "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
//   "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
// ] as const;

export type ParsedBSDate = { year: number; month: number; day: number };

export function parseBSDate(text: string, separtor: string="-"): ParsedBSDate | null {
  const normalized = toEnglishDigits(text);
  const parts = normalized.split(separtor);

  if (parts.length !== 3 || parts[0].length !== 4) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  const maxDay = dateConfigMap[String(year)]?.[monthNames[month - 1]]
  ;
  if (!maxDay || month < 1 || month > 12 || day < 1 || day > maxDay) {
    return null;
  }

  return { year, month, day };
}