import { createTheme } from "@mui/material/styles";
import InputCalendar from "./components/InputCalendar";
import { ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <InputCalendar />
      </ThemeProvider>
    </>
  );
}
