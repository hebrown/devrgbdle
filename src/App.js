import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Logo from "./components/Logo";
import Answer from "./components/Answer";
import Guesses from "./components/Guesses";
import HelpModal from "./components/HelpModal";

import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [guessNum, setGuessNum] = useState(1);
  const [lose, setLose] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (guessNum > 6) {
      setLose(true);
    }
  }, [guessNum]);

  return (
    <div className="App">
      <CssBaseline />
      <IconButton style={{ position: "fixed" }} onClick={openModal}>
        <HelpIcon />
      </IconButton>
      <HelpModal open={modalOpen} passModalOpen={setModalOpen} />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Logo />
        <Answer lose={lose.toString()} />
        <Guesses
          num={guessNum}
          passGuessNo={setGuessNum}
          passGuessInfo={setGuesses}
        />
        {/* <HintBtn num={guessNum} /> */}
      </div>
    </div>
  );
}

export default App;
