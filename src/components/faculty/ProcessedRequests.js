import React, { useEffect, useState } from 'react';
import { useNOC } from '../../context/NOCContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ProcessedRequests = ({ department }) => {
  const { requests } = useNOC();
  const [processedRequests, setProcessedRequests] = useState([]);

  useEffect(() => {
    // Filter requests that have been processed by this department
    const filtered = requests.filter(req => 
      req.approvals.some(approval => 
        approval.department === department && 
        approval.status !== 'pending'
      )
    );
    setProcessedRequests(filtered);
  }, [requests, department]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success"><FaCheckCircle /> Approved</span>;
      case 'rejected':
        return <span className="badge bg-danger"><FaTimesCircle /> Rejected</span>;
      default:
        return null;
    }
  };

  if (processedRequests.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">You haven't processed any NOC requests yet.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h5 className="mb-0">Processed NOC Requests</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Student</th>
                <th>Date Processed</th>
                <th>Purpose</th>
                <th>Your Decision</th>
                <th>Overall Status</th>
              </tr>
            </thead>
            <tbody>
              {processedRequests.map((request) => {
                const departmentApproval = request.approvals.find(
                  approval => approval.department === department
                );
                
                return (
                  <tr key={request.id}>
                    <td>#{request.id.slice(-6)}</td>
                    <td>
                      <div>{request.studentName}</div>
                      <small className="text-muted">{request.studentEmail}</small>
                    </td>
                    <td>{formatDate(departmentApproval.updatedAt)}</td>
                    <td>{request.purpose}</td>
                    <td>
                      {getStatusBadge(departmentApproval.status)}
                      {departmentApproval.status === 'rejected' && departmentApproval.comments && (
                        <div className="small text-muted mt-1">
                          Reason: {departmentApproval.comments}
                        </div>
                      )}
                    </td>
                    <td>{getStatusBadge(request.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProcessedRequests;