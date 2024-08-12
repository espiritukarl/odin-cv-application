import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import placeholder from "./data/placeholder.json";

import Icon from "@mdi/react";
import { mdiTriangleDownOutline, mdiTriangleOutline } from "@mdi/js";
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
        <article
          className={
            showButton.showGeneralInfo ? "component-shown" : "component-hidden"
          }
        >
          <button
            className="component-header poppins-semibold"
            onClick={() => handleComponent("showGeneralInfo")}
          >
            General Information
            <Icon
              path={mdiTriangleDownOutline}
              size={0.9}
              vertical={showButton.showGeneralInfo ? true : false}
            />
          </button>

          {showButton.showGeneralInfo && <GeneralInfo updateCV={updateCV} />}
        </article>

        <article
          className={
            showButton.showEducation ? "component-shown" : "component-hidden"
          }
        >
          <button
            className="component-header poppins-semibold"
            onClick={() => handleComponent("showEducation")}
          >
            Education
            <Icon
              path={mdiTriangleDownOutline}
              size={0.9}
              vertical={showButton.showGeneralInfo ? true : false}
            />
          </button>

          {showButton.showEducation &&
            info.education.map((school, index) => {
              return (
                <Education
                  updateCV={updateCV}
                  educationData={info.education}
                  school={school}
                  index={index}
                  key={`${school.school}-${school.title}-${index}`}
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
        </article>

        <article
          className={
            showButton.showEducation ? "component-shown" : "component-hidden"
          }
        >
          <button
            className="component-header poppins-semibold"
            onClick={() => handleComponent("showWork")}
          >
            Experience
            <Icon
              path={mdiTriangleDownOutline}
              size={0.9}
              vertical={showButton.showWork ? true : false}
            />
          </button>
          {showButton.showWork &&
            info.experience.map((exp, index) => {
              return (
                <Work
                  updateCV={updateCV}
                  workData={info.experience}
                  exp={exp}
                  index={index}
                  key={`${exp.company}-${exp.position}-${index}`}
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
        </article>
      </section>

      <main>
        <DisplayCV cvData={info} />
      </main>
    </>
  );
}

export default App;
