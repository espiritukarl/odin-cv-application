import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";
import Icon from "@mdi/react";
import useHover from "../hooks/useHover";
import InputField from "./InputField";
import {
  mdiDelete,
  mdiDeleteEmpty,
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowClose,
  mdiPlusBox,
} from "@mdi/js";
import NewButton from "./NewButton";

function Education({ updateCV, educationData, school, index }) {
  const [info, setInfo] = useState(school);
  const [isHovered, handleMouseEnter, handleMouseLeave] = useHover();
  const [showEducationContent, setShowEducationContent] = useState(false);
  const showAddEducation = educationData.length > index;
  const noEntry =
    JSON.stringify(info.education) === JSON.stringify(placeholder.education);

  const showForm = () => {
    if (showEducationContent) {
      return (
        <span className="close-form">
          <button
            onClick={() => setShowEducationContent(!showEducationContent)}
          >
            <Icon path={mdiWindowClose} size={0.8} />
          </button>
        </span>
      );
    } else {
      return (
        <span className="new-form">
          <button
            className="poppins-regular"
            onClick={() => setShowEducationContent(!showEducationContent)}
          >
            <span>Add New School</span>
            <Icon path={mdiPlusBox} size={0.85} />
          </button>
        </span>
      );
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  function handleEntry(action) {
    const updatedEducation = [...educationData];
    if (action === "edit") {
      updatedEducation[index] = info;
    } else if (action === "remove") {
      updatedEducation.splice(index, 1);
    }
    updateCV("education", updatedEducation);
    setShowEducationContent(false);
  }

  function handleSubmit(action) {
    if (action === "add") {
      updateCV("education", [...educationData, info]);
    } else if (action === "empty") {
      updateCV("education", [info]);
    }
    setInfo(placeholder.education[0]);
    setShowEducationContent(false);
  }

  const isFormValid = ["school", "title", "startdate", "enddate", "loc"].every(
    (key) => info[key] && info[key].trim() !== ""
  );

  return (
    <>
      {showAddEducation
        ? school.school && (
            <div className="list-header">
              <span className="poppins-regular">{school.school}</span>
              <span className="list-button-container">
                <Icon
                  path={
                    showEducationContent ? mdiWindowMinimize : mdiWindowMaximize
                  }
                  size={0.8}
                  onClick={() => setShowEducationContent(!showEducationContent)}
                  className="section-expand"
                />
                <Icon
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleEntry("remove")}
                  path={isHovered ? mdiDeleteEmpty : mdiDelete}
                  size={0.85}
                  className="section-remove"
                />
              </span>
            </div>
          )
        : showForm()}

      {showEducationContent && (
        <section className="education poppins-regular">
          <InputField
            name="school"
            value={info.school}
            placeholder="e.g. University of the Philippines"
            onChange={handleChange}
            label="Institution Name"
          />
          <InputField
            name="title"
            value={info.title}
            placeholder="e.g. Bachelor of Science in Computer Science"
            onChange={handleChange}
            label="Program of Study"
          />
          <InputField
            name="startdate"
            value={info.startdate}
            placeholder="e.g March 2018"
            onChange={handleChange}
            label="Start Date"
          />
          <InputField
            name="enddate"
            value={info.enddate}
            placeholder="e.g. March 2024"
            onChange={handleChange}
            label="End Date"
          />
          <InputField
            name="loc"
            value={info.loc}
            placeholder="e.g. Katipunan, QC"
            onChange={handleChange}
            label="Location"
          />

          {!showAddEducation ? (
            <NewButton
              onClick={() => handleSubmit(noEntry ? "empty" : "add")}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Education"
            />
          ) : (
            <NewButton
              onClick={() => handleEntry("edit")}
              isFormValid={isFormValid}
              className="section-edit"
              buttonText="Edit"
            />
          )}
        </section>
      )}
    </>
  );
}

export default Education;
