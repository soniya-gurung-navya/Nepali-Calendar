// For Calendar
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  MenuItem,
  Select,
} from "@mui/material";

import { dateConfigMap } from "../constants/YearData";
import { formatObj, monthNames } from "../constants/NepaliDate";
import { getMonthStartWeekday, getTodayBS } from "../converter/dateConverter";
import { toNepaliDigits } from "../constants/NepaliDigits";
import type { ParsedBSDate } from "../converter/parseBSDate";

// 2. Updated the Props type to receive the parent's selectedDate state
type Props = {
  onSelectDate: (date: ParsedBSDate) => void;
  selectDate: ParsedBSDate | null;
  minDate?: string;
  maxDate?: string;
  type?: "en" | "ne";
};

// 3. Destructure selectedDate prop here
export default function NepaliCalendar({
  onSelectDate,
  selectDate,
  minDate,
  maxDate,
  type = "en",
}: Props) {
  const todayBs = getTodayBS();
  const [year, setYear] = useState(() => selectDate?.year ?? todayBs.year);
  const [month, setMonth] = useState(() => selectDate?.month ?? todayBs.month);

  useEffect(() => {
    if (!selectDate) return;
    const timer = setTimeout(() => {
      setYear(selectDate.year);
      setMonth(selectDate.month);
    }, 0);

    return () => clearTimeout(timer);
  }, [selectDate]);

  const availableYears = Object.keys(dateConfigMap).map(Number);

  const daysInThisMonth =
    dateConfigMap[String(year)]?.[monthNames[month - 1]] ?? 0;

  const startWeekday = getMonthStartWeekday(year, month);

  const goPrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };
  // ||(minDate && `${year}-${String(month).padStart(2, "0")}-01` <= minDate);

  const isPrevDisabled =
    year === 2000 &&
    month === 1 &&
    year === todayBs.year &&
    month === todayBs.month;
  const isNextDisabled = year === 2090 && month === 12;

  const cells = [
    ...Array(startWeekday).fill(null), //fill blank space after sunday of the start day.
    ...Array.from({ length: daysInThisMonth }, (_, i) => i + 1), //generates the actual list of real day numbers to display
  ];

  // For min and max Date
  const isDateDisabled = (
    year: number,
    month: number,
    day: number,
  ): boolean => {
    // if (todayBs) {
    //   if (year < todayBs.year) return true;
    //   if (year === todayBs.year && month < todayBs.month) return true;
    //   if (
    //     year === todayBs.year &&
    //     month === todayBs.month &&
    //     day < todayBs.date
    //   )
    //     return true;
    // }

    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  return (
    <Card
      sx={{
        p: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          mb: "2px",
        }}
      >
        <IconButton onClick={goPrevMonth} disabled={isPrevDisabled}>
          ‹
        </IconButton>

        <Select
          value={year}
          onChange={(e) => {
            setYear(Number(e.target.value));
          }}
          size="small"
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 250,
                },
              },
            },
          }}
          sx={{ minWidth: 70 }}
        >
          {availableYears.map((y) => (
            <MenuItem key={y} value={y}>
              {type === "ne" ? toNepaliDigits(y) : y}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  maxHeight: 250,
                },
              },
            },
          }}
          sx={{minWidth:118, width: 118}}
          size="small"
        >
          {formatObj.month.long[type].map((name, index) => (
            <MenuItem key={name} value={index + 1}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={goNextMonth} disabled={isNextDisabled}>
          ›
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          textAlign: "center",
          gap: 2,
        }}
      >
        {formatObj.day.short[type].map((d) => (
          <Box key={d}>
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              {d}
            </Typography>
          </Box>
        ))}

        {cells.map((day, i) => {
          const isSelected =
            selectDate &&
            selectDate.day === day &&
            selectDate.month === month &&
            selectDate.year === year;
          const isDisabled = day ? isDateDisabled(year, month, day) : false;
          const isToday =
            todayBs &&
            todayBs.date === day &&
            todayBs.month === month &&
            todayBs.year === year;

          return (
            <Box key={i}>
              {day && (
                <Box
                  onClick={() => {
                    if (day === null || isDisabled) return;
                    onSelectDate({ year, month, day });
                  }}
                  sx={{
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    bgcolor: isSelected ? "primary.main" : "transparent",
                    color: isSelected ? "#fff" : "text.primary",
                    opacity: isDisabled ? 0.5 : 1,
                    borderRadius: "50%",
                    height: "32px",
                    width: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: isToday ? "1px solid black" : "none",
                    boxSizing: "border-box",
                  }}
                >
                  {type === "ne" ? toNepaliDigits(day) : day}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
