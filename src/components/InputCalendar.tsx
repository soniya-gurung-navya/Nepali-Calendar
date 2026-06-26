// Hold confirmed date and user type date
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useLayoutEffect, useRef, useState } from "react";
import NepaliCalendar from "./NepaliCalendar";
import {
  formatBSDateNepali,
  toEnglishDigits,
  toNepaliDigitsStr,
} from "../constants/NepaliDigits";
import { parseBSDate, type ParsedBSDate } from "../converter/bsDateParser";

type Props = {
  value?: ParsedBSDate | null;
  onChange?: (date: ParsedBSDate | null) => void;
  format?: string;
};

export default function InputCalendar({
  value,
  onChange,
  format = "YYYY-MM-DD",
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputText, setInputText] = useState("");
  const [internalDate, setInternalDate] = useState<ParsedBSDate | null>(null);

  const selectedDate = value !== undefined ? value : internalDate;
  const fieldWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPos = useRef<number | null>(null);

  const updateDate = (date: ParsedBSDate | null) => {
    setInternalDate(date);
    onChange?.(date);
  };
  const separator = format.replace(/[A-Za-z]/g, "")[0] || "/";

  // convert type text in date object and update the date when user will edit the date or enter the date
  const handleDateBlur = () => {
    const result = parseBSDate(inputText);
    if (result) {
      updateDate(result);
    } else if (inputText) {
      updateDate(null);
    }
    setInputText(""); // clear either way
  };

  // handle change (/) function:
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEl = e.target;
    let cursor = inputEl.selectionStart ?? 0;
    let value = toEnglishDigits(inputEl.value);
    value = value
      .split("")
      .filter((char) => (char >= "0" && char <= "9") || char === "/")
      .join("");
    const beforeSepartor = value.length;

    if (value.length === 4 && !value.includes(separator)) {
      value += separator;
    } else if (value.length === 7 && value.split(separator).length === 2) {
      value += separator;
    }
    if (value.length > beforeSepartor && cursor === beforeSepartor) {
      cursor += 1;
    }
    cursorPos.current = cursor;
    setInputText(value.slice(0, 10));
  };
  useLayoutEffect(() => {
    if (inputRef.current && cursorPos.current !== null) {
      inputRef.current.setSelectionRange(cursorPos.current, cursorPos.current);
    }
  }, [inputText]);

  // Handle Focus
  const handleInputFocus = () => {
    if (selectedDate && !inputText) {
      const y = selectedDate.year;
      const m = String(selectedDate.month).padStart(2, "0");
      const d = String(selectedDate.day).padStart(2, "0");
      setInputText(`${y}${separator}${m}${separator}${d}`);
    }
  };

  return (
    <div>
      <Box sx={{ m: "0px" }}>
        <Box ref={fieldWrapperRef}>
          <TextField
            label={selectedDate ? "" : "मिति छान्‍नुहोस्  "}
            size="small"
            sx={{
              " .MuiInputBase-input": {
                height: "20px",
              },
            }}
            value={
              inputText
                ? toNepaliDigitsStr(inputText)
                : selectedDate
                  ? formatBSDateNepali(selectedDate, format)
                  : ""
            }
            placeholder=" YYYY-MM-DD"
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
                      <CalendarIcon />
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
        >
          <NepaliCalendar
            selectDate={selectedDate}
            onSelectDate={(date) => {
              updateDate(date);
              setInputText("");
              setAnchorEl(null);
            }}
          />
        </Popover>
      </Box>
    </div>
  );
}
