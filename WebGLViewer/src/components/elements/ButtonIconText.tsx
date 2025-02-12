// React
import * as React from 'react';

// MUI Components
import {
  Button,
  Typography
} from '@mui/material';

// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HubIcon from '@mui/icons-material/Hub';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import HighlightIcon from '@mui/icons-material/Highlight';

// Styles
import '../../styles/App.scss';

type Props = {
  text: string,
  type: string,
  handleClick: any,
  color: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning" | undefined
};

const ButtonIconText: React.FC<Props> = ({
  text,
  type,
  handleClick,
  color
}) => {

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color={color}
        sx={{
          color: 'white',
          padding: '2px 12px 2px 8px',
          marginLeft: 'auto',
          '& span': {
            fontSize: '14px'
          }
        }}
        onClick={handleClick}
      >
        {type === 'add' && <AddIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        {type === 'close' && <CloseIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        {type === 'attach' && <AttachFileIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        {/* {type === 'add' && <FormatListBulletedIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />} */}
        {type === 'hub' && <HubIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        {type === 'select' && <RadioButtonCheckedIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        {type === 'highlight' && <HighlightIcon sx={{ fontSize: '20px', paddingTop: '2px'}} />}
        <Typography sx={{ paddingLeft: '6px'}}>{ text }</Typography>
      </Button>
    </>
  )
}

export default ButtonIconText;
