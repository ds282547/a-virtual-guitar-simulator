// /components/Guitar/GuitarApp.jsx
import React, { useState } from 'react';
import GuitarCanvas from './GuitarCanvas';
import { Button, ButtonGroup, Typography, TextField } from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { chords } from './chords'; // 引入和弦資料
import audioManager from '../../audio/audioManager'; // 引入音效管理模組

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const GuitarApp = () => {
  const [clickInfo, setClickInfo] = useState('');
  const [numStrings, setNumStrings] = useState(6);
  const [numFrets, setNumFrets] = useState(12);
  const [mode, setMode] = useState('singleNote'); // 管理模式： 'singleNote' 或 'chord'
  const [selectedChord, setSelectedChord] = useState('C'); // 預設和弦

  const [navMode, setNavMode] = React.useState('recents');

  // 處理畫布的點擊事件（單音模式下）
  const handleCanvasClick = (string, fret) => {
    if (mode === 'singleNote') {
      setClickInfo(`String: ${string}, Fret: ${fret}`);
    }
  };

  // 更新弦數
  const handleStringChange = (event) => {
    setNumStrings(Number(event.target.value));
  };

  // 更新品數
  const handleFretChange = (event) => {
    setNumFrets(Number(event.target.value));
  };


  // 設定選擇的和弦
  const handleChordSelect = (chord) => {
    setSelectedChord(chord);
  };

  const handlePlayChord = () => {
    if (chords[selectedChord]) {
      audioManager.playChord(chords[selectedChord]);
    }
  };

  // 將屬性和事件打包為物件
  const canvasProps = {
    numStrings,
    numFrets,
    mode,
    selectedChord,
    onCanvasClick: handleCanvasClick,
  };

  const ToggleButtons = () => {
  
    const handleMode2 = (event, newMode) => {
      setMode(newMode);
      setClickInfo('');
    };
  
    return (
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleMode2}
        aria-label="mode"
      >
        <ToggleButton value="singleNote" aria-label="singleNote">
          Single Note
        </ToggleButton>
        <ToggleButton value="chord" aria-label="chord">
          chord
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }

  return (
    <div>
      <GuitarCanvas {...canvasProps} />
      
      <Stack spacing={2}>
        <Item>
        <ToggleButtons />
            {mode === 'chord' && (
              <Box>
              <ButtonGroup variant="outlined" style={{ marginTop: '10px' }}>
                {Object.keys(chords).map((chord) => (
                  <Button key={chord} onClick={() => handleChordSelect(chord)}>
                    {chord}
                  </Button>
                ))}
              </ButtonGroup>
              </Box>
            )}
         <Button
        variant="contained"
        color="primary"
        onClick={handlePlayChord}
        style={{ marginTop: '10px', marginBottom: '20px' }}
      >
        Play {selectedChord} Chord
      </Button>
          </Item>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Number of Strings"
          type="number"
          value={numStrings}
          onChange={handleStringChange}
          InputProps={{ inputProps: { min: 1, max: 12 } }}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Number of Frets"
          type="number"
          value={numFrets}
          onChange={handleFretChange}
          InputProps={{ inputProps: { min: 1, max: 30 } }}
        />
      </div>
      <Item></Item>
      </Stack>
      
    </div>
  );
};

export default GuitarApp;
