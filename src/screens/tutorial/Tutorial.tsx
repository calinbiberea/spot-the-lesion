import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Slide,
  SlideProps,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack, ArrowForward, KeyboardBackspace } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import TutorialCard from "./card/TutorialCard";
import doctor from "../../res/images/tutorial/doctor.png";
import start_screen from "../../res/images/tutorial/start screen.png";
import help from "../../res/images/tutorial/help.png";
import right_click from "../../res/images/tutorial/right click.png";
import wrong_click from "../../res/images/tutorial/wrong click.png";
import wrong_ai from "../../res/images/tutorial/wrong ai.png";
import right_ai from "../../res/images/tutorial/right ai.png";
import actual_lesion from "../../res/images/tutorial/actual lesion.png";

const slideImages = [
  doctor,
  start_screen,
  start_screen,
  help,
  right_click,
  wrong_click,
  wrong_ai,
  right_ai,
  actual_lesion,
  "",
];

const slideTexts = [
  "Welcome to Spot-the-Lesion!",
  "You’ll receive a sample of a CT scan like this one below, and you’’ll have to find the lesion present in it.",
  " You have 10 seconds to click on the region of the scan where you think the lesion is located.",
  "After 5 seconds, a hint will appear - the red circle indicates the part of the image which you should look at.",
  "If your click was correct, then you’ll see a green cross (x) on the spot you selected...",
  "...otherwise a red cross (x) will appear.",
  "You’ll also see the AI’s prediction on the lesion, marked in red if the AI was wrong...",
  "...or in green if the AI was correct.",
  "Finally, you will see the correct answer marked in yellow.",
  "That's it! Now, can you spot more lesions than the AI?",
];

const useStyles = makeStyles(() =>
  createStyles({
    backButton: {
      marginRight: 8,
    },
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    card: {
      width: "90%",
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
    },
    playButton: {
      display: (props: Record<string, unknown>) => (props.index === 9 ? "inline-flex" : "none"),
      borderRadius: 20,
      paddingLeft: 24,
      paddingRight: 24,
      fontSize: "2rem",
    },
    buttonGroup: {
      marginTop: 16,
    },
  })
);

const Tutorial: React.FC<TutorialProps> = ({ setRoute }: TutorialProps) => {
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState<SlideProps["direction"]>("down");

  const classes = useStyles({ index });

  const textContent = slideTexts[index];
  const imageContent = slideImages[index];
  const numSlides = slideTexts.length;

  const onArrowClick = (direction: SlideProps["direction"]) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    const oppDirection = direction === "left" ? "right" : "left";

    setSlideDirection(direction);
    setSlideIn(false);

    window.setTimeout(() => {
      setIndex(newIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 500);
  };

  useEffect(() => {
    const onKeyDown = (e: { keyCode: number }) => {
      if (e.keyCode === 37) {
        onArrowClick("left");
      }

      if (e.keyCode === 39) {
        onArrowClick("right");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            className={classes.backButton}
            edge="start"
            color="inherit"
            aria-label="Back"
            onClick={() => setRoute("home")}
          >
            <KeyboardBackspace />
          </IconButton>

          <Typography>Spot the Lesion</Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Slide in={slideIn} direction={slideDirection}>
          <Card className={classes.card}>
            <TutorialCard textContent={textContent} imageLink={imageContent} />

            <Button
              className={classes.playButton}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setRoute("game")}
            >
              Play
            </Button>
          </Card>
        </Slide>

        <ButtonGroup size="large" className={classes.buttonGroup}>
          <Button color="primary" variant="contained" onClick={() => onArrowClick("left")}>
            <ArrowBack>Prev</ArrowBack>
          </Button>

          <Button color="primary" variant="contained" onClick={() => onArrowClick("right")}>
            <ArrowForward>Next</ArrowForward>
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default Tutorial;