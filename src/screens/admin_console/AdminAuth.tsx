import React, { useState } from "react";
import { AppBar, FormHelperText, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import colors from "../../res/colors";
import { firebaseAuth } from "../../firebase/firebaseApp";
import AdminPanel from "./AdminPanel";

const useStyles = makeStyles((theme) =>
  createStyles({
    backButton: {
      marginRight: 8,
    },
    container: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.secondary,
    },
    box: {
      backgroundColor: "white",
      width: "60%",
      height: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
      boxSizing: "border-box",
    },
    text: {
      [theme.breakpoints.only("xs")]: {
        fontSize: "1.25rem",
      },
      [theme.breakpoints.only("sm")]: {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
      },
      textAlign: "center",
      marginBottom: 24,
    },
    submit: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    spacing: {
      margin: 50,
    },
    button: {
      margin: 24,
      borderRadius: 20,
      [theme.breakpoints.only("xs")]: {
        width: 250,
        fontSize: "1rem",
      },
      [theme.breakpoints.only("sm")]: {
        width: 300,
        fontSize: "1rem",
      },
      [theme.breakpoints.up("md")]: {
        width: 320,
        fontSize: "1.25rem",
      },
    },
    password: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    passwordError: {
      color: "red",
    },
  })
);

const AdminAuth: React.FC = () => {
  const classes = useStyles();

  const [wasLogged, setWasLogged] = useState<boolean>(false);

  const [password, setPassword] = React.useState<PasswordType>({
    value: "",
    showPassword: false,
    displayError: false,
  });

  /**
   * Function for updating the password typed by the user in the provided text field
   * @param prop - specific value of the password to be updated
   */
  const handleChange = (prop: keyof PasswordType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  /**
   * Function for showing the password in text mode upon user click
   */
  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  /**
   * Function for authenticating the user upon password submission
   */
  const submitClick = () => {
    firebaseAuth
      .signInWithEmailAndPassword("spot-the-lesion@gmail.com", password.value)
      .then(() => {
        setPassword({ ...password, displayError: false });
        setWasLogged(true);
      })
      .catch((_) => {
        setPassword({ ...password, value: "", displayError: true });
      });
  };

  return wasLogged ? (
    <>
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <Typography>Spot the Lesion</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
        <AdminPanel />
      </div>
      ;
    </>
  ) : (
    <>
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <Typography>Spot the Lesion</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <div className={classes.box}>
          <Typography className={classes.text}> Enter Password </Typography>
          <div className={[classes.submit, classes.spacing].join(" ")}>
            <FormControl
              className={[
                classes.submit,
                classes.spacing,
                classes.password,
                classes.textField,
              ].join(" ")}
            >
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={password.showPassword ? "text" : "password"}
                value={password.value}
                error={password.displayError}
                onChange={handleChange("value")}
                aria-describedby="incorrect-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {password.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="incorrect-password" className={classes.passwordError}>
                {password.displayError ? "Incorrect Password" : ""}
              </FormHelperText>
            </FormControl>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
              onClick={submitClick}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAuth;
