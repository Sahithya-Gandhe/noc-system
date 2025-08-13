import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNOC } from '../../context/NOCContext';
import { useAuth } from '../../context/AuthContext';
import { FaArrowLeft, FaDownload, FaPrint } from 'react-icons/fa';

const GenerateNOC = () => {
  const { requestId } = useParams();
  const { getRequestById } = useNOC();
  const { currentUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const nocRef = useRef(null);

  useEffect(() => {
    const nocRequest = getRequestById(requestId);
    setRequest(nocRequest);
    setLoading(false);
  }, [requestId, getRequestById]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handlePrint = () => {
    const printContents = nocRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
      <html>
        <head>
          <title>NOC Certificate</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .noc-certificate { max-width: 800px; margin: 0 auto; padding: 40px; }
            .college-header { text-align: center; margin-bottom: 30px; }
            .college-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
            .college-address { font-size: 14px; margin-bottom: 5px; }
            .certificate-title { text-align: center; font-size: 20px; font-weight: bold; margin: 30px 0; text-decoration: underline; }
            .certificate-body { line-height: 1.8; text-align: justify; }
            .signature-section { display: flex; justify-content: space-between; margin-top: 80px; }
            .signature-block { text-align: center; width: 200px; }
            .signature-line { border-top: 1px solid #000; margin-bottom: 5px; }
            .approval-list { margin: 30px 0; }
            .approval-item { margin-bottom: 15px; }
            @media print {
              body { padding: 0; margin: 0; }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;

    window.print();
    document.body.innerHTML = originalContents;
  };

  if (loading) {
    return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"></div></div>;
  }

  if (!request) {
    return (
      <div className="alert alert-danger">
        Request not found. The request may have been deleted or you don't have permission to view it.
      </div>
    );
  }

  if (request.status !== 'approved') {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          <h4>NOC Not Available</h4>
          <p>This NOC cannot be generated because it has not been approved by all departments yet.</p>
          <Link to={`/student/request/${requestId}`} className="btn btn-primary">
            <FaArrowLeft /> Back to Request Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <Link to={`/student/request/${requestId}`} className="btn btn-outline-secondary me-2">
            <FaArrowLeft /> Back to Request Details
          </Link>
          <button onClick={handlePrint} className="btn btn-primary me-2">
            <FaPrint /> Print NOC
          </button>
          <button onClick={handlePrint} className="btn btn-success">
            <FaDownload /> Download as PDF
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="noc-certificate" ref={nocRef}>
                <div className="college-header">
                  <div className="college-name">COLLEGE OF ENGINEERING</div>
                  <div className="college-address">123 Education Street, Knowledge City - 123456</div>
                  <div className="college-address">Phone: (123) 456-7890 | Email: info@college.edu</div>
                </div>

                <div className="certificate-title">
                  NO OBJECTION CERTIFICATE
                </div>

                <div className="certificate-body">
                  <p>Reference No: NOC-{request.id.slice(-6)}</p>
                  <p>Date: {formatDate(new Date().toISOString())}</p>
                  <p>This is to certify that the college has no objection for {currentUser.name} (ID: {currentUser.studentId}) of {currentUser.department} department regarding {request.purpose}.</p>
                  <p>This certificate is issued upon the student's request and after verification that all departmental clearances have been obtained.</p>
                  
                  <div className="approval-list">
                    <p><strong>Departmental Approvals:</strong></p>
                    {request.approvals.map((approval, index) => (
                      <div key={index} className="approval-item">
                        <strong>{approval.department}:</strong> Approved by {approval.facultyName} on {formatDate(approval.updatedAt)}
                      </div>
                    ))}
                  </div>

                  <p>This NOC is valid for a period of 6 months from the date of issue.</p>

                  <div className="signature-section">
                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div>Student Signature</div>
                      <div>{currentUser.name}</div>
                    </div>

                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div>Principal</div>
                      <div>College of Engineering</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateNOC;