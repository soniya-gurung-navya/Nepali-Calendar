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
import { getMonthStartWeekday } from "../converter/dateConverter";
import { toNepaliDigits } from "../constants/NepaliDigits";
import type { ParsedBSDate } from "../converter/parseBSDate";

// 2. Updated the Props type to receive the parent's selectedDate state
type Props = {
  onSelectDate: (date: ParsedBSDate) => void;
  selectDate: ParsedBSDate | null;
};

// 3. Destructure selectedDate prop here
export default function NepaliCalendar({ onSelectDate, selectDate }: Props) {
  const [year, setYear] = useState(() => selectDate?.year ?? 2083);
  const [month, setMonth] = useState(() => selectDate?.month ?? 1);

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
  const isPrevDisabled = year === 2000 && month === 1;
  const isNextDisabled = year === 2090 && month === 12;

  const cells = [
    ...Array(startWeekday).fill(null), //fill blank space after sunday of the start day.
    ...Array.from({ length: daysInThisMonth }, (_, i) => i + 1), //generates the actual list of real day numbers to display
  ];

  return (
    <Card
      sx={{
        p: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          mb: "8px",
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
          sx={{ minWidth: 90 }}
        >
          {availableYears.map((y) => (
            <MenuItem key={y} value={y}>
              {toNepaliDigits(y)}
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
          sx={{ minWidth: 90 }}
          size="small"
        >
          {formatObj.month.long.map((name, index) => (
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
        {formatObj.day.short.map((d) => (
          <Box key={d}>
            <Typography variant="caption" sx={{ fontSize: "14px" }}>
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

          return (
            <Box key={i}>
              {day && (
                <Box
                  onClick={() => {
                    if (day === null) return;
                    onSelectDate({ year, month, day });
                  }}
                  sx={{
                    cursor: "pointer",
                    bgcolor: isSelected ? "primary.main" : "transparent",
                    color: isSelected ? "#fff" : "text.primary",
                    borderRadius: "50%",
                    height: "32px",
                    width: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {toNepaliDigits(day)}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Card>
  );
}
