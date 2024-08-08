import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import placeholder from "./data/placeholder.json";
import "./styles/App.css";
import "./styles/index.css";

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
        {showButton.showEducation &&
          info.education.map((school, index) => {
            return (
              <Education
                updateCV={updateCV}
                educationData={info.education}
                school={school}
                key={`${school.school}-${school.title}-${index}`}
                index={index}
              />
            );
          })}
        {showButton.showEducation && (
          <Education
            updateCV={updateCV}
            educationData={info.education}
            school={placeholder.education}
          />
        )}
        <button
          className="component-header poppins-semibold"
          onClick={() => handleComponent("showWork")}
        >
          Experience
        </button>
        {showButton.showWork &&
          info.experience.map((exp, index) => {
            return (
              <Work
                updateCV={updateCV}
                workData={info.experience}
                exp={exp}
                key={`${exp.company}-${exp.position}-${index}`}
                data={exp}
                showAddWork={false}
                index={index}
              />
            );
          })}
        {showButton.showWork && (
          <Work
            updateCV={updateCV}
            workData={info.experience}
            exp={placeholder.experience}
          />
        )}
      </section>

      <main>
        <DisplayCV cvData={info} />
      </main>
    </>
  );
}

export default App;
