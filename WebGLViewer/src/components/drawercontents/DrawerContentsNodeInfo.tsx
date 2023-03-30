// React
import * as React from 'react';

// Hooks
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks/reduxTypescriptHooks';

// Helpers
import regex from "../../../app/helpers/regex";

// Import Packages
import classNames from 'classnames';
import axios from 'axios';

// Import Redux Actions
import { appStateActions } from '../../../app/store/index';

// MUI Styles
import { useTheme } from '@mui/material/styles';

// MUI Components
import {
  Box,
  Button,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';

// MUI Icons
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

// Custom Components 
import NodeInfoMainTabs from '../drawercontents/NodeInfoMainTabs';
import ButtonIconText from '../elements/ButtonIconText';

// Styles
import '../../styles/App.scss';
// @ts-ignore
import COLORS from '../../styles/variables';

type Props = {};

const DrawerContentsNodeInfo: React.FC<Props> = ({}) => {

  const theme = useTheme();
  const dispatch = useAppDispatch();

  type openDrawerLeftState = boolean;
  const openDrawerLeftState: openDrawerLeftState = useAppSelector((state: any) => state.appState.openDrawerLeft);

  type openDrawerLeftWidth = number;
  const openDrawerLeftWidth: openDrawerLeftWidth = useAppSelector((state: any) => state.appState.openDrawerLeftWidth);

  type selectedAssetObject = any;
  const selectedAssetObject: selectedAssetObject = useAppSelector((state: any) => state.appState.selectedAssetObject);

  const handleSelectAssetOnScene = (payload: any) => {
    dispatch(appStateActions.selectAssetOnScene(payload.properties.Name))
  };

  const handleHighlightAssetOnScene = (payload: any) => {
    dispatch(appStateActions.highlightAssetOnScene(payload.properties.Name))
  };

  const handleShowAssetOnGraph = (payload: any) => {
    console.log('Action to \"Show On Graph\" clicked!')
  }

  return (
    <>
      <Box sx={{ display: 'flex', padding: '0 16px' }}>
        <Typography sx={{ marginRight: '8px' }}>Actions:</Typography>
        <Stack spacing={1} direction="row">
          <ButtonIconText type="hub" handleClick={() => handleShowAssetOnGraph(selectedAssetObject)} text="Show On Graph" color="primary" />
          <ButtonIconText type="select" handleClick={() => handleSelectAssetOnScene(selectedAssetObject)} text="Select On Scene" color="primary" />
          <ButtonIconText type="highlight" handleClick={() => handleHighlightAssetOnScene(selectedAssetObject)} text="Highlight On Scene" color="primary" />
        </Stack>
      </Box>
      <Box sx={{ padding: '16px', display: 'flex', flex: '1 1 100%', flexDirection: 'column'}}>
        <NodeInfoMainTabs data={selectedAssetObject} />
      </Box>
    </>
  );
}

export default DrawerContentsNodeInfo;
