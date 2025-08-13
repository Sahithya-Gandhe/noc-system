import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNOC } from '../../context/NOCContext';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaArrowLeft, FaFileDownload } from 'react-icons/fa';

const RequestDetail = () => {
  const { requestId } = useParams();
  const { getRequestById } = useNOC();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nocRequest = getRequestById(requestId);
    setRequest(nocRequest);
    setLoading(false);
  }, [requestId, getRequestById]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success"><FaCheckCircle /> Approved</span>;
      case 'rejected':
        return <span className="badge bg-danger"><FaTimesCircle /> Rejected</span>;
      default:
        return <span className="badge bg-warning text-dark"><FaHourglassHalf /> Pending</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not updated yet';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12">
          <Link to="/student/dashboard" className="btn btn-outline-secondary mb-3">
            <FaArrowLeft /> Back to Dashboard
          </Link>
          <h2>NOC Request Details</h2>
          <p className="text-muted">Request ID: #{request.id.slice(-6)}</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Request Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Status:</strong> {getStatusBadge(request.status)}</p>
              <p><strong>Created:</strong> {formatDate(request.createdAt)}</p>
              <p><strong>Purpose:</strong> {request.purpose}</p>
              {request.additionalInfo && (
                <p><strong>Additional Information:</strong> {request.additionalInfo}</p>
              )}
            </div>
          </div>

          {request.status === 'approved' && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Your NOC is Ready!</h5>
                <p className="card-text">All departments have approved your request. You can now generate your No Objection Certificate.</p>
                <Link 
                  to={`/student/generate-noc/${request.id}`} 
                  className="btn btn-success"
                >
                  <FaFileDownload /> Generate NOC
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Approval Status</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {request.approvals.map((approval, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{approval.department}</h6>
                        <small className="text-muted">
                          {approval.status !== 'pending' 
                            ? `Updated by ${approval.facultyName} on ${formatDate(approval.updatedAt)}` 
                            : 'Waiting for approval'}
                        </small>
                      </div>
                      <div>
                        {getStatusBadge(approval.status)}
                      </div>
                    </div>
                    {approval.status === 'rejected' && approval.comments && (
                      <div className="mt-2 alert alert-danger py-2">
                        <strong>Reason for rejection:</strong> {approval.comments}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;