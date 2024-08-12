import "../styles/displayCV.css";
import Icon from "@mdi/react";
import { mdiEmail, mdiPhone, mdiHome } from "@mdi/js";

function DisplayCV({ cvData }) {
  const putEducLine = cvData.education.length > 1;
  const putExpLine = cvData.experience.length > 1;

  return (
    <div className="display-cv roboto-thin">
      <article className="general-info-container">
        <h1 className="data-cv poppins-semibold">{cvData.generalInfo.name}</h1>
        <div className="general-info-cv">
          {cvData.generalInfo.email !== "" ? (
            <span className="email">
              <Icon path={mdiEmail} size={1} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.email}
              </span>
            </span>
          ) : null}
          {cvData.generalInfo.tel !== "" ? (
            <span className="tel">
              <Icon path={mdiPhone} size={1} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.tel}
              </span>
            </span>
          ) : null}
          {cvData.generalInfo.loc !== "" ? (
            <span className="loc">
              <Icon path={mdiHome} size={1} />
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.loc}
              </span>
            </span>
          ) : null}
        </div>
        <div className="general-info-cv">
          {cvData.generalInfo.linkedin !== "" ? (
            <div className="linkedin">
              <i class="devicon-linkedin-plain"></i>
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.linkedin}
              </span>
            </div>
          ) : null}
          {cvData.generalInfo.github !== "" ? (
            <div className="github">
              <i class="devicon-github-plain"></i>
              <span className="data-cv poppins-regular">
                {cvData.generalInfo.github}
              </span>
            </div>
          ) : null}
        </div>
      </article>

      <h2>Education</h2>
      {cvData.education.length > 0 ? (
        cvData.education.map((edu, index) => (
          <article className="education-cv" key={index}>
            <p>
              <span className="input-title">Institution Name: </span>
              <span className="data-cv poppins-regular">{edu.school}</span>
            </p>
            <p>
              <span className="input-title">Degree Name: </span>
              <span className="data-cv poppins-regular">{edu.title}</span>
            </p>
            <p>
              <span className="input-title">Date of Study: </span>
              <span className="data-cv poppins-regular">
                {edu.startdate} - {edu.enddate}
              </span>
            </p>
            {putEducLine && index != cvData.education.length - 1 ? (
              <hr />
            ) : null}
          </article>
        ))
      ) : (
        <span className="missing-details poppins-light-italic">
          No education details available.
        </span>
      )}

      <h2>Work</h2>
      {cvData.experience.length > 0 ? (
        cvData.experience.map((work, index) => (
          <article className="experience-cv" key={index}>
            <p>
              <span className="input-title">Company Name: </span>
              <span className="data-cv poppins-regular">{work.company}</span>
            </p>
            <p>
              <span className="input-title">Position Title: </span>
              <span className="data-cv poppins-regular">{work.position}</span>
            </p>
            <p>
              <span className="input-title">Main Responsibilities: </span>
              <span className="data-cv poppins-regular">
                {work.responsibilities}
              </span>
            </p>
            <p>
              <span className="input-title">Date of Work: </span>
              <span className="data-cv poppins-regular">
                {work.startdate} - {work.enddate}
              </span>
            </p>
            {putExpLine && index != cvData.experience.length - 1 ? (
              <hr />
            ) : null}
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
