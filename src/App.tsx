import React from 'react';
import { CharacterProvider } from './CharacterContext';
import CharacterSheet from './CharacterSheet';

const App: React.FC = () => {
  return (
    <CharacterProvider>
      <CharacterSheet />
    </CharacterProvider>
  );
};

export default App;
