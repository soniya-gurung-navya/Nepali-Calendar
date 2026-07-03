// nepaliDigits.ts

const nepaliDigitMap: Record<string, string> = {
  "0": "०", "1": "१", "2": "२", "3": "३", "4": "४",
  "5": "५", "6": "६", "7": "७", "8": "८", "9": "९",
};

const englishDigitMap: Record<string, string> = {
  "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
  "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
};


export function toNepaliDigits(
  num: number,
  padLength: number = 0
): string {

  const padded =
    padLength > 0
      ? num.toString().padStart(padLength, "0")
      : num.toString();

  return padded
    .split("")
    .map((ch) => nepaliDigitMap[ch] ?? ch)
    .join("");
}


export function formatBSDateNepali(
  date: { year:number; month:number; day:number } | null,
  format:string = "YYYY-MM-DD",
  type: "ne" | "en" = "en"
): string | null {

  if (!date) return null;
  const yStr = date.year.toString().padStart(4, "0");
   const mStr = date.month.toString().padStart(2, "0");
    const dStr = date.day.toString().padStart(2, "0");
 
    const englishFormatted = format.replace("YYYY", yStr)
    .replace("MM", mStr)
    .replace("DD", dStr)
 
    return type === "ne" ? toNepaliDigitsStr(englishFormatted): englishFormatted
}



export function toEnglishDigits(
  str:string | null | undefined
): string {

  if (!str) return "";

  return str
    .split("")
    .map((ch)=> englishDigitMap[ch] ?? ch)
    .join("");
}



export function toNepaliDigitsStr(
  str:string | null | undefined
): string {

  if (!str) return "";

  return str
    .split("")
    .map((ch)=> nepaliDigitMap[ch] ?? ch)
    .join("");
}