import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from 'gatsby';
import {
  Typography,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummaryProps,
} from '@mui/material';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <ShoppingCartIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Orders" />*/}
    {/*</ListItemButton>*/}
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <PeopleIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Customers" />*/}
    {/*</ListItemButton>*/}
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <BarChartIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Reports" />*/}
    {/*</ListItemButton>*/}
    <ListItemButton component={Link} to="/pokemon">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Pokemon" />
    </ListItemButton>

    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>CodeWars</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ListItemButton component={Link} to="/codewars/javascript">
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Javascript" />
        </ListItemButton>

        <ListItemButton component={Link} to="/codewars/typescript">
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Typescript" />
        </ListItemButton>
      </AccordionDetails>
    </Accordion>

    <ListItemButton component={Link} to="/map">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Map" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/*<ListSubheader component="div" inset>*/}
    {/*  Saved reports*/}
    {/*</ListSubheader>*/}
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <AssignmentIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Current month" />*/}
    {/*</ListItemButton>*/}
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <AssignmentIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Last quarter" />*/}
    {/*</ListItemButton>*/}
    {/*<ListItemButton>*/}
    {/*  <ListItemIcon>*/}
    {/*    <AssignmentIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Year-end sale" />*/}
    {/*</ListItemButton>*/}
  </React.Fragment>
);
