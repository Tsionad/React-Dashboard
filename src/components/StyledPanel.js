import { lighten, fade } from "@material-ui/core/styles/colorManipulator";

const styledPanel = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    width: '100%',
  },
  
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.text.secondary,
        backgroundColor: lighten(theme.palette.secondary.main, 0.74)
        }
      : {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.primary.dark
        },
   
  spacer: {
    flex: "1 1 100%"
  },
  
  actions: {
    paddingLeft: theme.spacing.unit,
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center'
  },

  title: {
    flex: "0 0 auto",
    fontSize: 25,
    paddingLeft: theme.spacing.unit,
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.30),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },

  searchIcon: {
    width: theme.spacing.unit * 10,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: theme.palette.text.primary,
    width: '100%',
  },
  
  inputInput: {
    fontSize: 16,
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

export default styledPanel;