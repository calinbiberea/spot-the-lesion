import React, { ReactNode } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { KeyboardBackspace } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

interface NavigationAppBarProps {
  showBack?: boolean;
  children?: ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
    backButton: {
      marginRight: 8,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavigationAppBar: React.FC<NavigationAppBarProps> = ({
  children,
  showBack,
}: NavigationAppBarProps) => {
  const classes = useStyles();

  const history = useHistory();

  const onBackClick = () => history.goBack();

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <IconButton
          className={classes.backButton}
          style={{ display: showBack ? "" : "none" }}
          edge="start"
          color="inherit"
          aria-label="Back"
          onClick={onBackClick}
        >
          <KeyboardBackspace />
        </IconButton>

        <Typography className={classes.title}>Spot the Lesion</Typography>

        {children}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationAppBar;
