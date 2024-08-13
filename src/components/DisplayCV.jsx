import "../styles/displayCV.css";
import Icon from "@mdi/react";
import { mdiEmail, mdiPhone, mdiHome } from "@mdi/js";

function DisplayCV({ cvData }) {
  return (
    <div className="display-cv roboto-thin">
      <article className="general-info-container">
        <h1 className="data-cv poppins-semibold">{cvData.generalInfo.name}</h1>
        <div className="general-info-cv">
          {cvData.generalInfo.email && (
            <span
              className={`email ${
                cvData.generalInfo.tel || cvData.generalInfo.loc
                  ? "show-border"
                  : ""
              }`}
            >
              <Icon path={mdiEmail} size={0.85} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.email}
              </span>
            </span>
          )}
          {cvData.generalInfo.tel && (
            <span
              className={`tel ${cvData.generalInfo.loc ? "show-border" : ""}`}
            >
              <Icon path={mdiPhone} size={0.85} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.tel}
              </span>
            </span>
          )}
          {cvData.generalInfo.loc && (
            <span className="loc">
              <Icon path={mdiHome} size={0.85} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.loc}
              </span>
            </span>
          )}
        </div>
        <div className="general-info-cv">
          {cvData.generalInfo.linkedin && (
            <div
              className={`linkedin ${
                cvData.generalInfo.github ? "show-border" : ""
              }`}
            >
              <i className="devicon-linkedin-plain"></i>
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.linkedin}
              </span>
            </div>
          )}
          {cvData.generalInfo.github && (
            <div className="github">
              <i className="devicon-github-plain"></i>
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.github}
              </span>
            </div>
          )}
        </div>
      </article>

      <h2>Education</h2>
      {cvData.education.length > 0 ? (
        cvData.education.map((edu, index) => (
          <article
            className={
              index === cvData.education.length - 1
                ? "education-cv add-margin-bottom"
                : "education-cv"
            }
            key={`${edu.school}${index}`}
          >
            <div className="cv-container">
              <span className="poppins-regular education-school">
                {edu.school}
              </span>
              <span className="poppins-regular-italic education-loc">
                {edu.loc}
              </span>
            </div>
            <div className="cv-container">
              <span className="poppins-light-italic education-title">
                {edu.title}
              </span>

              <span className="poppins-regular-italic education-date">
                {edu.startdate} - {edu.enddate}
              </span>
            </div>
          </article>
        ))
      ) : (
        <span className="missing-details poppins-light-italic">
          No education details available.
        </span>
      )}

      <h2>Work Experience</h2>
      {cvData.experience.length > 0 ? (
        cvData.experience.map((work, index) => (
          <article className="experience-cv" key={`${work.company}${index}`}>
            <div className="cv-container">
              <span className="poppins-regular">{work.company}</span>
              <span className="poppins-regular-italic">{work.loc}</span>
            </div>
            <div className="cv-container">
              <span className="poppins-light-italic">{work.position}</span>

              <span className="poppins-regular-italic">
                {work.startdate} - {work.enddate}
              </span>
            </div>
            <span className="cv-container">
              <ul className="poppins-regular work-responsibility">
                {work.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </span>
          </article>
        ))
      ) : (
        <span className="missing-details poppins-light-italic">
          No work experience details available.
        </span>
      )}
    </div>
  );
}

export default DisplayCV;
