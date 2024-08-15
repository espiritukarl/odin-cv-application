import { useState } from "react";
import placeholder from "../data/placeholder.json";
import "../styles/form.css";
import Icon from "@mdi/react";
import {
  mdiDelete,
  mdiDeleteEmpty,
  mdiWindowMinimize,
  mdiWindowMaximize,
  mdiWindowClose,
  mdiPlusBox,
  mdiPlusCircle,
} from "@mdi/js";
import NewButton from "./FormBtn";
import TextArea from "./TextArea";

function Work({ updateCV, workData, exp, index }) {
  const [info, setInfo] = useState(exp);
  const [isHovered, setIsHovered] = useState(false);
  const [showWorkContent, setShowWorkContent] = useState(false);
  const [newResponsibility, setNewResponsibility] = useState("");
  const showAddWork = workData.length > index;

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function handleDescription(e) {
    const { value } = e.target;
    setNewResponsibility(value);
  }

  function addResponsibility() {
    const updatedResponsibilities = [
      ...info.responsibilities,
      newResponsibility,
    ];

    setInfo((prevInfo) => ({
      ...prevInfo,
      responsibilities: updatedResponsibilities,
    }));
    responsibilityChanges(workData, updatedResponsibilities);
    setNewResponsibility("");
  }

  function updateResponsibility(data) {
    const updatedResponsibilities = [...data];

    setInfo((prevInfo) => ({
      ...prevInfo,
      responsibilities: updatedResponsibilities,
    }));

    let updatedExperience = [...workData];
    updatedExperience[index] = {
      ...info,
      responsibilities: updatedResponsibilities,
    };
    responsibilityChanges(workData, updatedResponsibilities);
  }

  function removeResponsibility(idx) {
    let updatedExperience = [...workData];
    updatedExperience[index].responsibilities.splice(idx, 1);
    updateCV("experience", updatedExperience);
  }

  function responsibilityChanges(data, updatedData) {
    let updatedExperience = [...data];
    updatedExperience[index] = {
      ...info,
      responsibilities: updatedData,
    };

    updateCV("experience", updatedExperience);
  }

  function editEntry() {
    let updatedExperience = [...workData];
    updatedExperience[index] = info;
    updateCV("experience", updatedExperience);
  }

  function removeEntry() {
    let updatedExperience = [...workData];
    updatedExperience.splice(index, 1);
    updateCV("experience", updatedExperience);
  }

  function handleSubmit() {
    const updatedExperience = [...workData, info];
    updateCV("experience", updatedExperience);

    setInfo(placeholder.experience);
  }

  function handleWorkContent() {
    setShowWorkContent(!showWorkContent);
  }

  const isFormValid = [
    "company",
    "position",
    "startdate",
    "enddate",
    "loc",
  ].every((key) => info[key] && info[key].trim() !== "");

  return (
    <>
      {showAddWork ? (
        <div className="list-header">
          <span className="poppins-regular">{exp.company}</span>
          <span className="list-button-container">
            <Icon
              path={showWorkContent ? mdiWindowMinimize : mdiWindowMaximize}
              size={0.8}
              onClick={handleWorkContent}
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
      ) : !showWorkContent ? (
        <>
          <span className="new-form">
            <button className="poppins-regular" onClick={handleWorkContent}>
              <span>Add New Company</span>
              <Icon path={mdiPlusBox} size={0.85} />
            </button>
          </span>
        </>
      ) : (
        <>
          <span className="close-form">
            <button onClick={handleWorkContent}>
              <Icon path={mdiWindowClose} size={0.8} />
            </button>
          </span>
        </>
      )}

      {showWorkContent && (
        <section className="work-experience poppins-regular">
          <label htmlFor="company">
            Company Name
            <input
              type="text"
              name="company"
              value={info.company}
              placeholder="e.g. Netflix Inc."
              onChange={handleChange}
            />
          </label>

          <label htmlFor="position">
            Job Title
            <input
              type="text"
              name="position"
              value={info.position}
              placeholder="e.g. Junior Web Developer"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="responsibilities">Job Responsibilities</label>
          {exp.responsibilities &&
            exp.responsibilities.map((resp, i) => (
              <div className="responsibilities" key={`${resp}${i}`}>
                <TextArea
                  data={resp}
                  workData={exp}
                  index={i}
                  updateResponsibility={updateResponsibility}
                  removeResponsibility={removeResponsibility}
                />
              </div>
            ))}

          <textarea
            type="text"
            name="responsibilities"
            value={newResponsibility}
            placeholder="e.g. Developed and maintained web applications"
            onChange={handleDescription}
          />
          <button className="add-responsibility" onClick={addResponsibility}>
            <Icon path={mdiPlusCircle} size={1} />
          </button>

          <label htmlFor="startdate">
            Start Date
            <input
              type="text"
              name="startdate"
              value={info.startdate}
              placeholder="e.g. September 2021"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="enddate">
            End Date
            <input
              type="text"
              name="enddate"
              value={info.enddate}
              placeholder="e.g. March 2024"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="loc">
            Location
            <input
              type="text"
              name="loc"
              placeholder="e.g. New Delhi, India"
              value={info.loc}
              onChange={handleChange}
            />
          </label>

          {!showAddWork ? (
            <NewButton
              onClick={handleSubmit}
              isFormValid={isFormValid}
              className="section-submit"
              buttonText="Add Work Experience"
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

export default Work;
