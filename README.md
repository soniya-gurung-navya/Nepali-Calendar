# @sonygrg/nepali-datepicker

A React component for selecting dates in the Nepali calendar system (Bikram Sambat). Built with Material-UI (MUI), it provides an easy-to-use date picker with support for both English and Nepali numerals.

---


## ✨ Features

- **Nepali Calendar Support**: Select dates using the Bikram Sambat (BS) calendar system
-  **Flexible Digit Display**: Choose between English digits (2080-01-01) or Nepali digits (२०८०-०१-०१)
-  **Manual Input**: Type dates directly or pick from an interactive calendar grid
-  **MUI Integration**: Seamlessly integrates with Material-UI components
-  **Responsive Design**: Works well on desktop, tablet, and mobile devices
-  **Controlled Component**: Manage the date state in your React component

---

## 📦 Prerequisites

Before installing the Nepali Date Picker, ensure you have the following installed in your project:

- **Node.js** (v14 or higher)
- **React** (v17.0.0 or higher)
- **React DOM** (v17.0.0 or higher)

The package requires the following peer dependencies:

| Package | Version |
| --- | --- |
| react | ^17.0.0 \| ^18.0.0 \| ^19.0.0 |
| react-dom | ^17.0.0 \| ^18.0.0 \| ^19.0.0 |
| @mui/material | ^7.0.0 \| ^8.0.0 \| ^9.0.0 |
| @emotion/react | ^11.0.0 |
| @emotion/styled | ^11.0.0 |

---

## 🚀 Installation

### Step 1: Install the Nepali Date Picker Package

Using npm:

```bash
npm install @sonygrg/nepali-datepicker
```

Using yarn:

```bash
yarn add @sonygrg/nepali-datepicker
```

### Step 2: Install Required Peer Dependencies

If you don't already have the required peer dependencies, install them:

```bash
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

### Step 3: Set Up Material-UI (if not already done)

If you're using Material-UI for the first time, you may need to install Material-UI Icons:

```bash
npm install @mui/icons-material
```

### Verify Installation

To verify the installation was successful, check your `package.json`:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^7.3.11",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@sonygrg/nepali-datepicker": "^1.0.53"
  }
}
```

---

## 💡 Basic Usage

### Simple Example

Here's the simplest way to use the Nepali Date Picker in your React app:

```tsx
import { useState } from "react";
import { InputCalendar } from "@sonygrg/nepali-datepicker";

export default function MyApp() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <div>
      <h1>Select a Nepali Date</h1>
      <InputCalendar
        value={date}
        onChange={(newDate) => setDate(newDate)}
        format="YYYY-MM-DD"
        type="en"
      />
      {date && <p>Selected Date: {date}</p>}
    </div>
  );
}
```

**What's happening:**

1. We use React's `useState` hook to manage the selected date
2. `InputCalendar` is a controlled component (the value comes from state)
3. When the user selects a date, `onChange` is called with the new date
4. The date is stored and displayed below the component

---

## 🔧 Component API

### InputCalendar Component

The `InputCalendar` component is the main component you'll use. It combines:

- A text input field for manual date entry
- A calendar icon button to open the date picker
- A calendar grid popup for visual date selection

**Basic syntax:**

```tsx
<InputCalendar
  value={selectedDate}
  onChange={handleDateChange}
  format="YYYY-MM-DD"
  type="en"
  placeholder="Select a date"
/>
```

---

## 📝 Props Reference

### Required Props

| Prop | Type | Description |
| --- | --- | --- |
| `value` | `string \| null` | The currently selected date. Set to `null` to clear the selection. |
| `onChange` | `(date: string \| null) => void` | Callback function called when the user selects or clears a date. |

### Optional Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `format` | `"YYYY-MM-DD" \| "YYYY/MM/DD"` | `"YYYY-MM-DD"` | The format for date input/output. Determines whether dates use hyphens or slashes. |
| `type` | `"en" \| "ne"` | `"en"` | Display format for digits: "en" for English digits (2080) or "ne" for Nepali digits (२०८०). |
| `placeholder` | `string` | `"Select Date"` | Placeholder text shown when no date is selected. |
| `minDate` | `string` | undefined | The minimum date that can be selected (in the same format as the `format` prop). |
| `maxDate` | `string` | undefined | The maximum date that can be selected (in the same format as the `format` prop). |

### MUI TextField Props

The component also accepts standard MUI `TextField` props:

- `disabled`: Disable the date picker
- `error`: Show error state
- `label`: Add a label above the input
- `size`: Set size to "small" or "medium"
- And many more...

---

## 📚 Examples

```tsx
import { useState } from "react";
import { InputCalendar } from "@sonygrg/nepali-datepicker";

export default function BasicExample() {
  const [date, setDate] = useState<string | null>(null);

  return (
    <InputCalendar
      value={date}
      onChange={setDate}
      format="YYYY-MM-DD"
      type="en"
      placeholder="Choose a date"
    />
  );
}
```


## ⚠️ Important Notes

### Format Restrictions

The `format` prop only accepts two values:

- `"YYYY-MM-DD"` - Dates with hyphens (e.g., `2080-05-15`)
- `"YYYY/MM/DD"` - Dates with slashes (e.g., `2080/05/15`)

❌ **Don't do this:**

```tsx
// These formats will NOT work:
format="DD-MM-YYYY"  // Wrong order
format="YYYY.MM.DD"  // Wrong separator
format="MM/DD/YYYY"  // Wrong order
```

✅ **Do this instead:**

```tsx
format="YYYY-MM-DD"  // Correct
format="YYYY/MM/DD"  // Correct
```

### Date Display Behavior

The `type` prop only affects how dates appear in the input field, NOT in the calendar dropdown:

- When `type="en"`: Shows dates as `2080-05-15` (English numerals)
- When `type="ne"`: Shows dates as `२०८०-०५-१५` (Nepali numerals)
- Calendar grid: **Always displays in Nepali numerals** regardless of the `type` prop

### Controlled Component Requirement

This component is **always controlled**. You must:

1. Provide a `value` prop
2. Provide an `onChange` handler
3. Update the state in the `onChange` handler

```tsx
// ✅ Correct - Controlled component
const [date, setDate] = useState(null);
<InputCalendar value={date} onChange={setDate} />

// ❌ Wrong - Uncontrolled component won't work as expected
<InputCalendar onChange={(date) => console.log(date)} />
```

### Date Format Output

The date returned from `onChange` is always a string in the format you specified. Make sure to handle `null` values when dates are cleared:

```tsx
const [date, setDate] = useState<string | null>(null);

onChange={(newDate) => {
  // newDate can be a string like "2080-05-15" or null
  setDate(newDate);
}}
```

---

## ❓ FAQ

### Q: How do I clear the selected date?

**A:** Set the `value` prop to `null`:

```tsx
const handleClear = () => {
  setDate(null);
};
```

### Q: Can I use this with TypeScript?

**A:** Yes! The component fully supports TypeScript:

```tsx
const [date, setDate] = useState<string | null>(null);
```

### Q: How do I set a default date?

**A:** Initialize your state with a date string:

```tsx
const [date, setDate] = useState<string | null>("2080-05-15");
```

### Q: Can I customize the styling?

**A:** Yes, you can pass MUI-compatible props:

```tsx
<InputCalendar
  value={date}
  onChange={setDate}
  sx={{ marginBottom: "20px" }}
  size="small"
  variant="filled"
/>
```


## 🐛 Troubleshooting

### Issue: Calendar popup doesn't open

**Solution:** Ensure all dependencies are installed correctly:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Issue: Dates show in wrong format

**Solution:** Double-check your `format` and `type` props:

- `format` determines the separator (dash or slash)
- `type` determines the numerals (English or Nepali)

### Issue: Component shows error about MUI

**Solution:** Make sure you have the correct MUI version:

```bash
npm install @mui/material@latest
```

---

## 📄 License

MIT - Feel free to use in your personal and commercial projects.

---

## 🤝 Contributing

For bugs, feature requests, or contributions, please visit the project repository.

---
