import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MetadataPanels from '../display/MetadataPanels';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props: any) {
  const { children } = props;

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpenState = () => {
    setOpen(state => !state);
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          padding: '16px 16px 0px 16px',
        }}
      >
        Assets
      </Typography>
      <List>
        {['Asset Example 1', 'Asset Example 2', 'Asset Example 3', 'Asset Example 4'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography
        variant="h3"
        sx={{
          padding: '16px 16px 0px 16px',
        }}>
        Asset Information
      </Typography>
      <MetadataPanels />
    </>
  )
}
