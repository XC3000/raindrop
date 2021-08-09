import { withStyles, Slider } from "@material-ui/core";

export const PrettoSlider = withStyles((theme) => ({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: theme.palette.text.primary,
    },
  },
  track: {
    height: 4,
    borderRadius: 1,
  },
  rail: {
    height: 4,
    borderRadius: 1,
  },
}))(Slider);
