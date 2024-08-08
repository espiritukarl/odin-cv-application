import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import "./styles/App.css";

function App() {
  const [info, setInfo] = useState(cvData);
  const [showButton, setShowButton] = useState({
    showGeneralInfo: true,
    showEducation: false,
    showWork: false,
  });

  function updateCV(section, data) {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [section]: data,
    }));
  }

  function handleComponent(component) {
    setShowButton((prevShowButton) => ({
      ...prevShowButton,
      [component]: !prevShowButton[component],
    }));
  }

  return (
    <>
      <section className="sidebar">
        <button
          className="component-header poppins-semibold"
          onClick={() => handleComponent("showGeneralInfo")}
        >
          General Information
        </button>
        {showButton.showGeneralInfo && <GeneralInfo updateCV={updateCV} />}

        <button
          className="component-header poppins-semibold"
          onClick={() => handleComponent("showEducation")}
        >
          Education
        </button>
        {showButton.showEducation && <Education updateCV={updateCV} />}

        <button
          className="component-header poppins-semibold"
          onClick={() => handleComponent("showWork")}
        >
          Experience
        </button>
        {showButton.showWork && <Work updateCV={updateCV} />}
      </section>

      <main>
        <DisplayCV cvData={info} />
      </main>
    </>
  );
}

export default App;
