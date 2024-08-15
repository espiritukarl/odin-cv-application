import { useState } from "react";
import DisplayCV from "./components/DisplayCV";
import GeneralInfo from "./components/GeneralInfo";
import Education from "./components/Education";
import Work from "./components/Work";
import cvData from "./data/data.json";
import placeholder from "./data/placeholder.json";
import useHover from "./hooks/useHover";
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
  const [showSidebar, setShowSidebar] = useState(true);

  const [
    hoverGeneralInfo,
    handleMouseEnterGeneralInfo,
    handleMouseLeaveGeneralInfo,
  ] = useHover();
  const [hoverEducation, handleMouseEnterEducation, handleMouseLeaveEducation] =
    useHover();
  const [hoverWork, handleMouseEnterWork, handleMouseLeaveWork] = useHover();

  function updateCV(section, data) {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [section]: data,
    }));
  }

  function updateInfo(data) {
    setInfo(data);
  }

  function handleComponent(component) {
    setShowButton((prevShowButton) => ({
      ...prevShowButton,
      [component]: !prevShowButton[component],
    }));
  }

  function getIconPath(isHovered, isSectionVisible) {
    return isSectionVisible
      ? isHovered
        ? mdiTriangle
        : mdiTriangleOutline
      : isHovered
      ? mdiTriangleDown
      : mdiTriangleDownOutline;
  }

  return (
    <>
      {showSidebar && (
        <section className="sidebar">
          <Icon
            path={mdiArrowLeft}
            size={1.5}
            className="sidebar-toggle"
            onClick={() => setShowSidebar(!showSidebar)}
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
              onMouseEnter={handleMouseEnterGeneralInfo}
              onMouseLeave={handleMouseLeaveGeneralInfo}
            >
              General Information
              <Icon
                path={getIconPath(hoverGeneralInfo, showButton.showGeneralInfo)}
                size={0.9}
              />
            </button>
            {showButton.showGeneralInfo && (
              <GeneralInfo updateCV={updateCV} cvData={info.generalInfo} />
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
              onMouseEnter={handleMouseEnterEducation}
              onMouseLeave={handleMouseLeaveEducation}
            >
              Education
              <Icon
                path={getIconPath(hoverEducation, showButton.showEducation)}
                size={0.9}
              />
            </button>
            {showButton.showEducation && (
              <>
                {JSON.stringify(info.education) !==
                  JSON.stringify(placeholder.education) &&
                  info.education.map((school, index) => (
                    <Education
                      updateCV={updateCV}
                      educationData={info.education}
                      school={school}
                      index={index}
                      key={`${school.school}-${school.title}-${index}`}
                    />
                  ))}
                <Education
                  updateCV={updateCV}
                  educationData={info.education}
                  school={placeholder.education[0]}
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
              onMouseEnter={handleMouseEnterWork}
              onMouseLeave={handleMouseLeaveWork}
            >
              Experience
              <Icon
                path={getIconPath(hoverWork, showButton.showWork)}
                size={0.9}
              />
            </button>
            {showButton.showWork && (
              <>
                {JSON.stringify(info.experience) !==
                  JSON.stringify(placeholder.experience) &&
                  info.experience.map((exp, index) => (
                    <Work
                      updateCV={updateCV}
                      workData={info.experience}
                      exp={exp}
                      index={index}
                      key={`${exp.company}-${exp.position}-${index}`}
                    />
                  ))}
                <Work
                  updateCV={updateCV}
                  workData={info.experience}
                  exp={placeholder.experience[0]}
                />
              </>
            )}
          </article>

          <div className="template-container">
            <button
              className="roboto-medium"
              onClick={() => updateInfo(cvData)}
            >
              Load Sample CV
            </button>
            <button
              className="roboto-medium"
              onClick={() => updateInfo(placeholder)}
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
            onClick={() => setShowSidebar(!showSidebar)}
          />
        )}
        <DisplayCV cvData={info} />
      </main>
    </>
  );
}

export default App;
