import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SidePanelList = ({ items }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem button key={index}>
          <ListItemText primaryTypographyProps={{ style: { fontWeight: 'bold' } }} primary={item.displayValue} />
        </ListItem>
      ))}
    </List>
  );
};

export default SidePanelList;
