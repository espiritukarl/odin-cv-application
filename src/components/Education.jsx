import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";
import NewButton from "./FormBtn";

import Icon from "@mdi/react";
import {
  mdiDelete,
  mdiDeleteEmpty,
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowClose,
  mdiPlusBox,
} from "@mdi/js";

function Education({ updateCV, educationData, school, index }) {
  const [info, setInfo] = useState(school);
  const [isHovered, setIsHovered] = useState(false);
  const [showEducationContent, setShowEducationContent] = useState(false);
  const showAddEducation = educationData.length > index;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function editEntry() {
    let updatedEducation = [...educationData];
    updatedEducation[index] = info;
    updateCV("education", updatedEducation);
  }

  function removeEntry() {
    let updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    updateCV("education", updatedEducation);
  }

  function handleSubmit() {
    const updatedEducation = [...educationData, info];
    updateCV("education", updatedEducation);

    handleEducationContent();
    setInfo(placeholder.education);
  }

  function handleEducationContent() {
    setShowEducationContent(!showEducationContent);
  }

  const isFormValid = ["school", "title", "startdate", "enddate", "loc"].every(
    (key) => info[key] && info[key].trim() !== ""
  );

  return (
    <>
      {showAddEducation ? (
        <div className="list-header">
          <span className="poppins-regular">{school.school}</span>
          <span className="list-button-container">
            <Icon
              path={
                showEducationContent ? mdiWindowMinimize : mdiWindowMaximize
              }
              size={0.8}
              onClick={handleEducationContent}
              className="section-expand"
            />
            <Icon
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={removeEntry}
              path={isHovered ? mdiDeleteEmpty : mdiDelete}
              size={0.85}
              className="section-remove"
            />
          </span>
        </div>
      ) : !showEducationContent ? (
        <>
          <span className="new-form">
            <button
              className="poppins-regular"
              onClick={handleEducationContent}
            >
              <span>Add New School</span>
              <Icon path={mdiPlusBox} size={0.85} />
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="close-form">
            <button onClick={handleEducationContent}>
              <Icon path={mdiWindowClose} size={0.8} />
            </button>
          </span>
        </>
      )}

      {showEducationContent && (
        <section className="education poppins-regular">
          <label htmlFor="school">
            Institution Name
            <input
              type="text"
              name="school"
              value={info.school}
              placeholder="e.g. University of the Philippines"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="title">
            Program of Study
            <input
              type="text"
              name="title"
              value={info.title}
              placeholder="e.g. Bachelor of Science in Computer Science"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="startdate">
            Start Date
            <input
              type="text"
              name="startdate"
              placeholder="e.g March 2018"
              value={info.startdate}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="enddate">
            End Date
            <input
              type="text"
              name="enddate"
              placeholder="e.g. March 2024"
              value={info.enddate}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="loc">
            Location
            <input
              type="text"
              name="loc"
              placeholder="e.g. Katipunan, QC"
              value={info.loc}
              onChange={handleChange}
            />
          </label>

          {showAddEducation ? (
            <NewButton
              onClick={handleSubmit}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Education"
            />
          ) : (
            <NewButton
              onClick={editEntry}
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
