import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import "./styles/App.css";

function App() {
  const [info, setInfo] = useState(cvData);

  function updateCV(section, data) {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [section]: data,
    }));
  }

  return (
    <>
      <GeneralInfo updateCV={updateCV} />
      <Education updateCV={updateCV} />
      <Work updateCV={updateCV} />
      <DisplayCV cvData={info} />
    </>
  );
}

export default App;
