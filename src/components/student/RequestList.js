import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaFileDownload } from 'react-icons/fa';

const RequestList = ({ requests, refreshRequests }) => {
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
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (requests.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">You haven't submitted any NOC requests yet.</p>
        <p className="mb-0">Click on "New Request" to create your first request.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h5 className="mb-0">My NOC Requests</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>#{request.id.slice(-6)}</td>
                  <td>{formatDate(request.createdAt)}</td>
                  <td>{request.purpose}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>
                    <Link 
                      to={`/student/request/${request.id}`} 
                      className="btn btn-sm btn-primary me-2"
                    >
                      View Details
                    </Link>
                    {request.status === 'approved' && (
                      <Link 
                        to={`/student/generate-noc/${request.id}`} 
                        className="btn btn-sm btn-success"
                      >
                        <FaFileDownload /> Generate NOC
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestList;