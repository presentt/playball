import React, { useState, useCallback, useRef } from 'react';

import Count from './Count.js';
import Bases from './Bases.js';
import LineScore from './LineScore.js';
import Matchup from './Matchup.js';
import AtBat from './AtBat.js';
import AllPlays from './AllPlays.js';
import InningDisplay from './InningDisplay.js';
import useKey from '../hooks/useKey.js';

function LiveGame()  {
  const [focusedPanel, setFocusedPanel] = useState('right'); // 'left', 'right', or 'top'
  const lastPanelBeforeTop = useRef('right');

  // Switch to left panel (AtBat pitch-by-pitch)
  useKey(['left', 'h'], useCallback(() => {
    setFocusedPanel(prev => prev !== 'top' ? 'left' : prev);
  }, []), { key: '←', label: 'Focus Left' });

  // Switch to right panel (AllPlays play-by-play)
  useKey(['right', 'l'], useCallback(() => {
    setFocusedPanel(prev => prev !== 'top' ? 'right' : prev);
  }, []), { key: '→', label: 'Focus Right' });

  // Toggle between box score and panels with 'b'
  useKey(['b'], useCallback(() => {
    setFocusedPanel(prev => {
      if (prev === 'top') {
        return lastPanelBeforeTop.current;
      } else {
        lastPanelBeforeTop.current = prev;
        return 'top';
      }
    });
  }, []), { key: 'b', label: 'Toggle Score' });

  return (
    <element>
      <element top={0} left={1} width='100%-1' height={3}>
        <element left={0} width={2}>
          <InningDisplay />
        </element>
        <element left={5} width='25%-5'>
          <Count />
        </element>
        <element left='25%+1' width='25%'>
          <Bases />
        </element>
        <element left='50%+2' width='50%-2'>
          <LineScore focused={focusedPanel === 'top'} />
        </element>
      </element>
      <line orientation='horizontal' type='line' top={3} width='100%' />
      <element top={4} left={1}>
        <element width='50%-1'>
          <element top={0} height={2}>
            <Matchup />
          </element>
          <element top={3}>
            <AtBat focused={focusedPanel === 'left'} />
          </element>
        </element>
        <line orientation='vertical' type='line' left='50%' />
        <element left='50%+2' width='50%-2'>
          <AllPlays focused={focusedPanel === 'right'} />
        </element>
      </element>
    </element>
  );
}

export default LiveGame;