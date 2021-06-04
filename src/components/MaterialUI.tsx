// There is a nicer approach which uses tree shaking
// but I can't seem to get it working.
// https://material-ui.com/guides/minimizing-bundle-size/

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Box from '@material-ui/core/Box';
import Button, { ButtonTypeMap } from '@material-ui/core/Button';
import { ExtendButtonBase } from '@material-ui/core/ButtonBase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from '@material-ui/core/Paper';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

export {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  BottomNavigation,
  Box,
  Button,
  ButtonTypeMap,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Drawer,
  ExtendButtonBase,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  MuiThemeProvider,
  NativeSelect,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  TooltipProps,
  Typography,
  createMuiTheme,
  makeStyles,
  useTheme,
};
