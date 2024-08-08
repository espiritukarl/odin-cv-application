import "../styles/displayCV.css";

function DisplayCV({ cvData }) {
  const putEducLine = cvData.education.length > 1;
  const putExpLine = cvData.experience.length > 1;
  const hasGeneralInfo = Object.values(cvData.generalInfo).every(
    (value) => value === ""
  );

  return (
    <div className="display-cv roboto-thin">
      <h2>General Information</h2>
      {!hasGeneralInfo ? (
        <article className="general-info-cv">
          <p>
            {cvData.generalInfo.name !== "" ? (
              <>
                {" "}
                <span className="input-title">Name: </span>
                <span className="data-cv poppins-regular">
                  {cvData.generalInfo.name}
                </span>
              </>
            ) : null}
          </p>
          <p>
            {cvData.generalInfo.email !== "" ? (
              <>
                <span className="input-title">Email: </span>
                <span className="data-cv poppins-regular">
                  {cvData.generalInfo.email}
                </span>
              </>
            ) : null}
          </p>
          <p>
            {cvData.generalInfo.email !== "" ? (
              <>
                <span className="input-title">Phone: </span>
                <span className="data-cv poppins-regular">
                  {cvData.generalInfo.tel}
                </span>
              </>
            ) : null}
          </p>
        </article>
      ) : (
        <article className="general-info-cvmissing-details  poppins-light-italic">
          "No general information available"
        </article>
      )}

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
