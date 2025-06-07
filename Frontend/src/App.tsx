import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
