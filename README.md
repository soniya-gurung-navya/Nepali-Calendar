# @sonygrg/nepali-datepicker

A Nepali (Bikram Sambat) date picker component for React, built with MUI.

## Installation

Install the package:

```bash
npm install @sonygrg/nepali-datepicker
```

This package requires the following dependencies:

```bash
npm install react react-dom @mui/material @mui/x-date-pickers @emotion/react @emotion/styled
```

## Usage

```tsx
import { useState } from "react";
import { InputCalendar } from "@sonygrg/nepali-datepicker";

function App() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <InputCalendar
      value={date}
      onChange={(value) => setDate(value)}
      format="YYYY-MM-DD" // Accepts either "YYYY-MM-DD" or "YYYY/MM/DD"
    />
  );
}

export default App;
```

\`\`\`

### Props

| Prop       | Type                             | Description                                   |
| ---------- | -------------------------------- | --------------------------------------------- |
| `value`    | `string\| null`                  | The currently selected date (controlled mode) |
| `onChange` | `(date: string \| null) => void` | Called whenever the date changes              |
| `format`   | `"YYYY-MM-DD" \| "YYYY/MM/DD"`   | Format of the input and output date string    |

[IMPORTANT]
The format prop only accepts "YYYY-MM-DD" or "YYYY/MM/DD". Passing any other variations or custom formats will not work as expected.

## Features

- Type a Nepali date manually (e.g. `२०८३/०१/०१`), or pick it from a calendar grid
- Displays dates in Nepali digits

## License

MIT
