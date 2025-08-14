import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { auth } from '../firebaseconfig';

const SendRequests = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { displayName, email } = location.state || {};

  const [rollNo, setRollNo] = useState('');
  const [purpose, setPurpose] = useState('');
  const [branch, setBranch] = useState('');
  const [examinationBranch, setExaminationBranch] = useState('');
  const [library, setLibrary] = useState('');
  const [top, setTop] = useState('');
  const [sports, setSports] = useState('');
  const [ieee, setIeee] = useState('');
  const [alumniAssociation, setAlumniAssociation] = useState('');
  const [mentor, setMentor] = useState('');

  useEffect(() => {
    if (!displayName || !email) {
      // Redirect to login if display name or email is not available
      navigate('/');
    }
  }, [displayName, email, navigate]);

  const handleExaminationBranchSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'Examination Branch NOC',
      examinationBranch,
    });
    alert(`Examination Branch NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleLibrarySubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'Library NOC',
      library,
    });
    alert(`Library NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleTopSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'TOP NOC',
      top,
    });
    alert(`TOP NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleSportsSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'Sports NOC',
      sports,
    });
    alert(`Sports NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleIeeeSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'IEEE NOC',
      ieee,
    });
    alert(`IEEE NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleAlumniAssociationSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'Alumni Association NOC',
      alumniAssociation,
    });
    alert(`Alumni Association NOC Request Submitted!\nRoll No: ${rollNo}\nName: ${displayName}\nEmail: ${email}\nPurpose: ${purpose}\nMentor: ${mentor}`);
  };

  const handleMentorSubmit = () => {
    console.log({
      rollNo,
      name: displayName,
      email,
      purpose,
      requestType: 'Mentor NOC',
      mentor,
    });
    alert('Mentor NOC Request Submitted!');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Send New Request</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="rollNo" className="form-label">Roll No</label>
          <input
            type="text"
            className="form-control"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={displayName || ''}
            readOnly
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email || ''}
            readOnly
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="purpose" className="form-label">Purpose</label>
          <input
            type="text"
            className="form-control"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mentor" className="form-label">Mentor</label>
          <input
            type="text"
            className="form-control"
            id="mentor"
            value={mentor}
            onChange={(e) => setMentor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <input
            type="text"
            className="form-control"
            id="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>
      </form>

      <div className="mt-4">
        <h4>Specific Request Types</h4>
        <div className="d-grid gap-2">
          <button className="btn btn-outline-primary" onClick={handleExaminationBranchSubmit}>Request Examination Branch NOC</button>
          <button className="btn btn-outline-primary" onClick={handleLibrarySubmit}>Request Library NOC</button>
          <button className="btn btn-outline-primary" onClick={handleTopSubmit}>Request TOP NOC</button>
          <button className="btn btn-outline-primary" onClick={handleSportsSubmit}>Request Sports NOC</button>
          <button className="btn btn-outline-primary" onClick={handleIeeeSubmit}>Request IEEE NOC</button>
          <button className="btn btn-outline-primary" onClick={handleAlumniAssociationSubmit}>Request Alumni Association NOC</button>
          <button className="btn btn-outline-primary" onClick={handleMentorSubmit}>Request Mentor NOC</button>
        </div>
      </div>
    </div>
  );
};

export default SendRequests;

//       </form>
//     </div>
//   );
// };

// export default SendRequests;