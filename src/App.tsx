import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { CharacterProvider } from './CharacterContext';
import CharacterSheet from './CharacterSheet';

const theme = createTheme({
  palette: {
    primary: { main: '#264653' },    // dark blue-green
    secondary: { main: '#2a9d8f' },  // teal
    warning: { main: '#e9c46a' },    // yellow
    info: { main: '#f4a261' },       // orange
    error: { main: '#e76f51' },      // red-orange
    background: { default: '#fff' },
  },
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CharacterProvider>
        <CharacterSheet />
      </CharacterProvider>
    </ThemeProvider>
  );
};

export default App;
