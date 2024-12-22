import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SidePanelList = ({ items, onItemClick }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem 
          button 
          key={index} 
          onClick={() => onItemClick(item.value)}
        >
          <ListItemText 
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }} 
            primary={item.displayValue} 
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SidePanelList;
