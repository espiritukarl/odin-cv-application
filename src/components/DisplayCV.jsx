function DisplayCV({ cvData }) {
  return (
    <>
      <h1>CV Display</h1>
      <h2>General Information</h2>
      <p>Name: {cvData.generalInfo.name}</p>
      <p>Email: {cvData.generalInfo.email}</p>
      <p>Phone: {cvData.generalInfo.tel}</p>
      <h2>Education</h2>
      {cvData.education.length > 0 ? (
        cvData.education.map((edu, index) => (
          <div key={index}>
            <p>Institution Name: {edu.school}</p>
            <p>Degree Name: {edu.title}</p>
            <p>
              Date of Study: {edu.startdate} - {edu.enddate}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <p>No education details available.</p>
      )}
      <h2>Work</h2>
      {cvData.experience.length > 0 ? (
        cvData.experience.map((work, index) => (
          <div key={index}>
            <p>Company Name: {work.company}</p>
            <p>Position Title: {work.position}</p>
            <p>Main Responsibilities: {work.responsibilities}</p>
            <p>
              Date of Work: {work.startdate} - {work.enddate}
            </p>
            <hr />
          </div>
        ))
      ) : (
        <p>No work experience details available.</p>
      )}
    </>
  );
}

export default DisplayCV;
