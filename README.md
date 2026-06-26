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
import { InputCalendar, type ParsedBSDate } from "@sonygrg/nepali-datepicker";

function App() {
  const [date, setDate] = useState<ParsedBSDate | null>(null);
  return <InputCalendar value={date} onChange={(value) => setDate(value)} />;
}

export default App;
```

\`\`\`

### Props

| Prop       | Type                                   | Description                                   |
| ---------- | -------------------------------------- | --------------------------------------------- |
| `value`    | `ParsedBSDate \| null`                 | The currently selected date (controlled mode) |
| `onChange` | `(date: ParsedBSDate \| null) => void` | Called whenever the date changes              |

`ParsedBSDate` is shaped like:
\`\`\`ts
{ year: number; month: number; day: number }
\`\`\`

## Features

- Type a Nepali date manually (e.g. `२०८३/०१/०१`), or pick it from a calendar grid
- Displays dates in Nepali digits

## License

MIT
