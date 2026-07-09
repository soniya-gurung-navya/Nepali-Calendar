import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useLayoutEffect, useRef, useState } from "react";
import NepaliCalendar from "./NepaliCalendar";
import {
  formatBSDateNepali,
  toEnglishDigits,
  toNepaliDigitsStr,
  // toNepaliDigitsStr,
} from "../constants/NepaliDigits";
import { parseBSDate, type ParsedBSDate } from "../converter/parseBSDate";

type Props = {
  value?: string | null;
  onChange?: (date: string | null) => void;
  format?: "YYYY-MM-DD" | "YYYY/MM/DD";
  type?: "ne" | "en";
  minDate?: string;
  maxDate?: string;
};

export default function InputCalendar({
  value,
  onChange,
  format = "YYYY-MM-DD",
  type = "en",
  minDate,
  maxDate,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [internalDateStr, setInternalDateStr] = useState<string | null>(null);
  // const separator = format.replace(/[A-Za-z]/g, "")[0] || "/";
  const allowed_separators = ["-", "/"];
  const separator = format?.includes("-") ? "-" : "/";
  const selectedDateStr = value?.trim() ? value : internalDateStr;
  const selectedDateObj = selectedDateStr
    ? parseBSDate(toEnglishDigits(selectedDateStr), separator)
    : null;
  const fieldWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPos = useRef<number | null>(null);

  const updateDate = (dateObj: ParsedBSDate | null) => {
    const formattedNepaliStr = dateObj
      ? formatBSDateNepali(dateObj, format, type)
      : null;
    setInternalDateStr(formattedNepaliStr);
    onChange?.(formattedNepaliStr);
  };

  // convert type text in date object and update the date when user will edit the date or enter the date
  const handleDateBlur = () => {
    if (!inputText) {
      updateDate(null);
      return;
    }
    const result = parseBSDate(toEnglishDigits(inputText), separator);
    if (result) {
      updateDate(result);
    } else if (inputText) {
      updateDate(null);
    }
    setInputText(""); // clear either way
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target;
    const cursor = inputEl?.selectionStart ?? 0;
    const rawValue = inputEl?.value || "";

    let value = toEnglishDigits(rawValue);
    value = value
      .split("")
      .map((char) => (allowed_separators.includes(char) ? separator : char))
      .filter((char) => (char >= "0" && char <= "9") || char === separator)
      .join("");

    const beforeSepartor = value?.length;

    if (value?.length === 4 && !value.includes(separator)) {
      value += separator;
    } else if (value?.length === 7 && value.split(separator)?.length === 2) {
      value += separator;
    }
    if (value?.length > beforeSepartor && cursor === beforeSepartor) {
      cursorPos.current = cursor + 1;
    } else {
      cursorPos.current = cursor;
    }
    const localizedValue = type === "ne" ? toNepaliDigitsStr(value) : value;
    setInputText(localizedValue.slice(0, 10));
  };
  useLayoutEffect(() => {
    if (inputRef.current && cursorPos.current !== null) {
      inputRef.current.setSelectionRange(cursorPos.current, cursorPos.current);
    }
  }, [inputText]);

  // Handle Focus
  const handleInputFocus = () => {
    if (selectedDateObj && !inputText) {
      const y = selectedDateObj.year;
      const m = String(selectedDateObj.month).padStart(2, "0");
      const d = String(selectedDateObj.day).padStart(2, "0");
      setInputText(`${y}${separator}${m}${separator}${d}`);
      const combinedStr = `${y}${separator}${m}${separator}${d}`;
      const localizedStr =
        type === "ne"
          ? toNepaliDigitsStr(combinedStr)
          : toEnglishDigits(combinedStr);
      setInputText(localizedStr);
    }
  };

  return (
    <div>
      <Box sx={{ m: "0px" }}>
        <Box ref={fieldWrapperRef}>
          <TextField
            label={selectedDateStr ? "" : "मिति छान्‍नुहोस्  "}
            size="small"
            sx={{
              " .MuiInputBase-input": {
                height: "20px",
              },
            }}
            value={
              inputText
                ? inputText
                : selectedDateStr
                  ? type === "ne"
                    ? toNepaliDigitsStr(selectedDateStr)
                    : toEnglishDigits(selectedDateStr)
                  : ""
              // ? formatBSDateNepali(selectedDateStr, format)
              // : ""
            }
            placeholder={type === "ne" ? toNepaliDigitsStr(format) : format}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleDateBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleDateBlur();
            }}
            slotProps={{
              input: {
                inputRef: inputRef,
                sx: { pl: "8px", fontSize: "18px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setAnchorEl(fieldWrapperRef.current)}
                    >
                      <EventIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <NepaliCalendar
            selectDate={selectedDateObj}
            onSelectDate={(date) => {
              updateDate(date);
              setInputText("");
              setAnchorEl(null);
            }}
            // minDate={minDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Popover>
      </Box>
    </div>
  );
}
