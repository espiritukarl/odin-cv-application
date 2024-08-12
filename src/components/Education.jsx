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
} from "@mdi/js";

function Education({ updateCV, educationData, school, index }) {
  const [info, setInfo] = useState(school);
  const [isHovered, setIsHovered] = useState(false);
  const [showEducationContent, setShowEducationContent] = useState(false);
  const showAddEducation = school === placeholder.education;

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

    setInfo(placeholder.education);
  }

  function handleEducationContent() {
    setShowEducationContent(!showEducationContent);
  }

  const isFormValid = Object.values(info).every((value) => value.trim() !== "");

  return (
    <>
      {!showAddEducation ? (
        <div className="education-header">
          <span className="poppins-regular">{school.school}</span>
          <span className="education-button-container">
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
      ) : (
        <>
          <span className="new-form poppins-regular">Add New School</span>
        </>
      )}

      {(showEducationContent || showAddEducation) && (
        <section className="education">
          <input
            type="text"
            name="school"
            value={info.school}
            placeholder="Institution Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={info.title}
            placeholder="Degree Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="startdate"
            placeholder="Start date"
            value={info.startdate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="enddate"
            placeholder="End date"
            value={info.enddate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="loc"
            placeholder="Location"
            value={info.loc}
            onChange={handleChange}
          />

          {showAddEducation ? (
            <NewButton
              onClick={handleSubmit}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Education"
            />
          ) : (
            <>
              <NewButton
                onClick={editEntry}
                isFormValid={isFormValid}
                className="section-edit"
                buttonText="Edit"
              />
            </>
          )}
        </section>
      )}
    </>
  );
}

export default Education;
