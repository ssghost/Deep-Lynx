// React
import * as React from 'react';
// Hooks
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks/reduxTypescriptHooks';

// Import Packages
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// Import Redux Actions
import { appStateActions } from '../../../app/store/index';

// Material
import {
  Box,
  Button,
  Drawer,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  OutlinedInput,
  Tooltip,
  Typography,
} from '@mui/material';

// MUI Icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';

// Components
import DrawerContentsNodeList from '../drawercontents/DrawerContentsNodeList';
import DrawerContentsNodeInfo from '../drawercontents/DrawerContentsNodeInfo';
import DrawerContentsSceneList from '../drawercontents/DrawerContentsSceneList';
import DrawerContentsSettings from '../drawercontents/DrawerContentsSettings';
import ButtonIconText from '../elements/ButtonIconText';

// Styles
import '../../styles/App.scss';
// @ts-ignore
import COLORS from '../../../src/styles/variables';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
// import DrawerContentsUserInfo from '../drawercontents/DrawerContentsUserInfo';
// import DrawerContentsUserList from '../drawercontents/DrawerContentsUserList';
import DrawerContentsSectionList from '../drawercontents/DrawerContentsSessionList';
import DrawerContentsSectionInfo from '../drawercontents/DrawerContentsSessionInfo';

const queryFilterData = (query: any, data: any) => {
  if (!query) {
    return data;
  } else {
    return data.filter((d: any) => d.title.toString().toLowerCase().includes(query.toString().toLowerCase()));
  }
};

const SearchBar = ({setSearchQuery}: any) => (
  <FormControl fullWidth variant="outlined" size="small">
    <OutlinedInput
      id="search-bar"
      className="text"
      onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        if (target) setSearchQuery(target.value);
      }}
      aria-describedby="outlined-search-assets"
      inputProps={{
        'aria-label': 'search assets',
      }}
      placeholder="Search..."
      
    />
  </FormControl>
);

type Props = {};

const DrawerLeft: React.FC<Props> = ({}) => {

  // Store
  const dispatch = useAppDispatch();

  // DeepLynx
  const host: string = useAppSelector((state: any) => state.appState.host);
  const token: string = useAppSelector((state: any) => state.appState.token);
  const metadata: string = useAppSelector((state: any) => state.appState.metadata);
  const container: string = useAppSelector((state: any) => state.appState.container);
  const query: boolean = useAppSelector((state: any) => state.appState.query);
  const tagId: string = useAppSelector((state: any) => state.appState.tagId);

  const [selected, setSelected] = useState('nodeList');
  const [searchQuery, setSearchQuery] = useState("");
  const [nodes, setNodes] = useState(Array<{ [key: string]: any; }>);
  const [sessionsData, setSessionsData] = useState([]);
  
   useEffect(() => {
    const fetchSessions = async () => {
      await axios.get ( `${host}/containers/${container}/serval/sessions`,
        {
          headers: {
            Authorization: `bearer ${token}`
            
          }
        }).then (
          (response: any) => {
            console.log(response.data)
            const parsedValue = JSON.parse(response.data.value);
            console.log(parsedValue)
            setSessionsData(parsedValue);
          
          }
        )
    };
  
    fetchSessions();
  }, []);

  type openDrawerLeftState = boolean;
  const openDrawerLeftState: openDrawerLeftState = useAppSelector((state: any) => state.appState.openDrawerLeft);

  type openDrawerLeftWidth = number;
  const openDrawerLeftWidth: openDrawerLeftWidth = useAppSelector((state: any) => state.appState.openDrawerLeftWidth);

  const handleToggleOpenDrawerLeft = () => {
    dispatch(appStateActions.toggleDrawerLeft());
    if (openDrawerLeftWidth === 64) {
      dispatch(appStateActions.setDrawerLeftWidth(430));
    } else if (openDrawerLeftWidth === 430 || openDrawerLeftWidth === 800) {
      dispatch(appStateActions.setDrawerLeftWidth(64));
      dispatch(appStateActions.selectAssetObject({}));
    }
  };

  // Selected Asset Object
  type selectedAssetObject = any;
  const selectedAssetObject: selectedAssetObject = useAppSelector((state: any) => state.appState.selectedAssetObject);

  type selectedSessionObject=any;
 const  selectedSessionObjec:selectedSessionObject= useAppSelector((state: any) => state.appState.selectedSessionObject);
  const handleDeselectAssetObject = () => {
    dispatch(appStateActions.selectAssetObject({}));
    dispatch(appStateActions.setDrawerLeftWidth(430));
  };

  // Menu links and menu link selection
  const menuLinkList = [
    {
      title: 'Nodes',
      icon: CategoryIcon,
      pane: 'nodeList'
    },
    {
      title: 'Scenes',
      icon: ImageIcon,
      pane: 'sceneList'
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      pane: 'settings'
    },
    {
      title: 'Sections',
      icon: GroupIcon,
      pane: 'sectionList'
    }
  ]

  const handleSelectMenuLink = (selectedLink: string) => {
    setSelected(selectedLink);
    if (openDrawerLeftState === false) {
      dispatch(appStateActions.toggleDrawerLeft());
    }
    dispatch(appStateActions.setDrawerLeftWidth(430));
    dispatch(appStateActions.selectAssetObject({}));
  };

  // Component display switching
  const menuItemMatchesComponent = (pane: string) => selected === pane;

  return (
    <Drawer variant="permanent" open={openDrawerLeftState}
      sx={{
        '& > .MuiDrawer-paper': {
          border: 'none'
        },
        ...(openDrawerLeftState === true && {
          transition: 'width .4s',
          width: openDrawerLeftWidth,
          '& .MuiDrawer-paper': {
            transition: 'width .4s',
            width: openDrawerLeftWidth
          }
        }),
        ...(openDrawerLeftState === false && {
          transition: 'width .4s',
          width: '64px',
          '& .MuiDrawer-paper': {
            transition: 'width .4s',
            width: '64px'
          }
        })
      }}
    >
      <Box sx={{ display: 'flex', height: '100%', marginTop: '64px', alignItems: 'stretch' }}>
        <Box sx={{ display: 'flex', height: '100%', backgroundColor: COLORS.colorLightgray3 }}>
          <List sx={{ p: 0 }}>
            {/* Hamburger menu icon to open and close Drawer */}
            <ListItem key={uuidv4()} disablePadding>
              <ListItemButton
                sx={{
                  minHeight: 64,
                  px: 2.5,
                  backgroundColor: `${COLORS.colorPrimary}`,
                  '&.Mui-selected': {
                    backgroundColor: `${COLORS.colorSecondary} !important`
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: `${COLORS.colorSecondary} !important`
                  },
                  '&:hover': {
                    backgroundColor: `${COLORS.colorSecondary} !important`
                  }
                }}
                onClick={handleToggleOpenDrawerLeft}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {openDrawerLeftState ? <MenuOpenIcon /> : <MenuIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>

            {/* Drawer Menu link list */}
            {menuLinkList.map((menuLinkItem, index) => {
              const MenuLinkItemIcon = menuLinkItem.icon;
              return (
                <ListItem key={uuidv4()} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 64,
                      px: 2.5,
                      '&.Mui-selected': {
                        backgroundColor: `${COLORS.colorListSelectDarkGray} !important`
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: `${COLORS.colorListSelectDarkGray} !important`
                      },
                      '&:hover': {
                        backgroundColor: `${COLORS.colorListSelectDarkGray} !important`
                      }
                    }}
                    selected={menuItemMatchesComponent(menuLinkItem.pane)}
                    onClick={() => handleSelectMenuLink(menuLinkItem.pane)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <MenuLinkItemIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        <Box sx={{ display: 'flex', height: '100%', flex: '1 0', flexDirection: 'column', overflowX: 'hidden', backgroundColor: COLORS.colorLightgray }}>
          <Box sx={{ flex: '1, 1, auto', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '16px' }}>
            <Typography
              variant="h3"
              sx={{
                alignItems: 'center',
                padding: '5px 0px'
              }}
            >
              {selected === 'nodeList' && (Object.keys(selectedAssetObject).length === 0) ? 'Nodes'
                : selected === 'sceneList' ? 'Scenes'
                : selected === 'settings' ? 'Settings'
                // :selected === 'userList' && (Object.keys(selectedAssetObject).length === 0) ? 'Users'
                :selected === 'sectionList' && (Object.keys(selectedAssetObject).length === 0) ? 'Sessions'
                :selected === 'sectionList' && (Object.keys(selectedAssetObject).length !== 0) ?  `Session ${selectedAssetObject.id}`
                : `Node ${selectedAssetObject.id}`
              }
              {(Object.keys(selectedAssetObject).length !== 0) && 
                <span
                  style={{
                    marginLeft: '8px',
                    paddingLeft: '8px',
                    borderLeft: `1px solid ${COLORS.colorDarkgray2}`
                  }}
                >
                  { selectedAssetObject.name }
                </span>
              }
            </Typography>
            <Tooltip title={
              selected === 'nodeList' ? 'View scene asset/object information. Select and Highlight objects. Show on Graph. View Data.'
              : selected === 'sceneList' ? 'View and change Scenes'
              : selected === 'settings' ? 'View and edit Settings'
              : selected === 'userList' ? 'View and edit Users'
              : selected === 'sectionList' ? 'View and edit Sections'
              : null
            }>
              <InfoIcon
                sx={{
                  fill: COLORS.colorDarkgray2,
                  marginLeft: '10px',
                  marginRight: '10px',
                  height: '15px',
                  width: '15px'
                }}
              />
            </Tooltip>
            {(selected === 'nodeList' && (Object.keys(selectedAssetObject).length === 0)) &&
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            }
            {(selected === 'nodeList' && (Object.keys(selectedAssetObject).length !== 0)) &&
              // <Box sx={{ flex: '1, 1, auto', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12px 0px 12px auto' }}>
              <Box sx={{ position: 'absolute', right: '0px', paddingRight: '16px' }}>
                <ButtonIconText text='Back To List' handleClick={() => handleDeselectAssetObject()} type="close" color="error" />
              </Box>
            }
          </Box>
          {selected === 'nodeList' && 
            <>
              {(Object.keys(selectedAssetObject).length === 0) && <DrawerContentsNodeList data={nodes} />}
              {(Object.keys(selectedAssetObject).length !== 0) && <DrawerContentsNodeInfo />}
            </>
          }
          {selected === 'sceneList' && 
            <DrawerContentsSceneList />
          }
          {selected === 'settings' && 
            <DrawerContentsSettings />
          }
    
          {selected === 'sectionList' && 
             <>
             {/* sessionsData */}
             {(Object.keys(selectedAssetObject).length === 0) && <DrawerContentsSectionList data={test123} /> } <div className='m-2'>
              <Box sx={{ position: 'absolute', right: '0px', paddingRight: '16px' }}>
                <ButtonIconText text='Back To List' handleClick={() => handleDeselectAssetObject()} type="close" color="error" />
              </Box>
                </div> 
             {(Object.keys(selectedAssetObject).length !== 0) && <DrawerContentsSectionInfo />}
           </>
          }
        </Box>
      </Box>
    </Drawer>
  );
}

export default DrawerLeft;
