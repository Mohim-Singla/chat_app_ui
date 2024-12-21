import React from 'react';
import { CssBaseline, Divider, Drawer } from "@mui/material";
import SidePanelList from './sidePanelList';

function SidePanel({ onItemClick }) {
  const items = [
    { displayValue: 'Public Groups', value: 'public_groups' },
    { displayValue: 'Private Groups', value: 'private_groups' },
    { displayValue: '1:1 Chat', value: 'one_to_one_chat' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#7091E6',
            padding: '20px 10px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '10px',
            }}
          />
        </div>

        <Divider sx={{ backgroundColor: 'white', marginBottom: '20px' }} />

        <SidePanelList items={items} onItemClick={onItemClick} />
      </Drawer>
    </div>
  );
}

export default SidePanel;
