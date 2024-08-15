import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import placeholder from "./data/placeholder.json";

import Icon from "@mdi/react";
import {
  mdiTriangleDown,
  mdiTriangleDownOutline,
  mdiTriangle,
  mdiTriangleOutline,
  mdiArrowLeft,
  mdiMenu,
} from "@mdi/js";
import "./styles/App.css";
import "./styles/index.css";

function App() {
  const [info, setInfo] = useState(cvData);
  const [showButton, setShowButton] = useState({
    showGeneralInfo: true,
    showEducation: false,
    showWork: false,
  });
  const [showSidebar, setshowSidebar] = useState(true);
  const [isHovered, setIsHovered] = useState({
    hoverGeneralInfo: false,
    hoverEducation: false,
    hoverWork: false,
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

  function updateHoverState(section) {
    setIsHovered((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }

  function hoveredArrowUp(section) {
    if (isHovered[section]) return mdiTriangle;
    return mdiTriangleOutline;
  }

  function hoveredArrowDown(section) {
    if (isHovered[section]) return mdiTriangleDown;
    return mdiTriangleDownOutline;
  }

  return (
    <>
      {showSidebar && (
        <section className="sidebar">
          <Icon
            path={mdiArrowLeft}
            size={1.5}
            className="sidebar-toggle"
            onClick={() => setshowSidebar(!showSidebar)}
          />

          <article
            className={
              showButton.showGeneralInfo
                ? "component-shown"
                : "component-hidden"
            }
          >
            <button
              className="component-header poppins-semibold"
              onClick={() => handleComponent("showGeneralInfo")}
              onMouseEnter={() => updateHoverState("hoverGeneralInfo")}
              onMouseLeave={() => updateHoverState("hoverGeneralInfo")}
            >
              General Information
              <Icon
                path={
                  showButton.showGeneralInfo
                    ? hoveredArrowUp("hoverGeneralInfo")
                    : hoveredArrowDown("hoverGeneralInfo")
                }
                size={0.9}
              />
            </button>

            {showButton.showGeneralInfo && (
              <GeneralInfo updateCV={updateCV} cvData={info} />
            )}
          </article>

          <article
            className={
              showButton.showEducation ? "component-shown" : "component-hidden"
            }
          >
            <button
              className="component-header poppins-semibold"
              onClick={() => handleComponent("showEducation")}
              onMouseEnter={() => updateHoverState("hoverEducation")}
              onMouseLeave={() => updateHoverState("hoverEducation")}
            >
              Education
              <Icon
                path={
                  showButton.showEducation
                    ? hoveredArrowUp("hoverEducation")
                    : hoveredArrowDown("hoverEducation")
                }
                size={0.9}
              />
            </button>

            {showButton.showEducation && (
              <>
                {JSON.stringify(info.education) !==
                  JSON.stringify(placeholder.education) &&
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
                <Education
                  updateCV={updateCV}
                  educationData={info.education}
                  school={placeholder.education}
                />
              </>
            )}
          </article>

          <article
            className={
              showButton.showWork ? "component-shown" : "component-hidden"
            }
          >
            <button
              className="component-header poppins-semibold"
              onClick={() => handleComponent("showWork")}
              onMouseEnter={() => updateHoverState("hoverWork")}
              onMouseLeave={() => updateHoverState("hoverWork")}
            >
              Experience
              <Icon
                path={
                  showButton.showWork
                    ? hoveredArrowUp("hoverWork")
                    : hoveredArrowDown("hoverWork")
                }
                size={0.9}
              />
            </button>

            {showButton.showWork && (
              <>
                {JSON.stringify(info.experience) !==
                  JSON.stringify(placeholder.experience) &&
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
                <Work
                  updateCV={updateCV}
                  workData={info.experience}
                  exp={placeholder.experience}
                />
              </>
            )}
          </article>

          <div className="template-container">
            <button className="roboto-medium" onClick={() => setInfo(cvData)}>
              Load Sample CV
            </button>
            <button
              className="roboto-medium"
              onClick={() => setInfo(placeholder)}
            >
              Remove All Data
            </button>
          </div>
        </section>
      )}

      <main>
        {!showSidebar && (
          <Icon
            path={mdiMenu}
            size={1.5}
            className="sidebar-toggle main"
            onClick={() => setshowSidebar(!showSidebar)}
          />
        )}
        <DisplayCV cvData={info} />
      </main>
    </>
  );
}

export default App;
