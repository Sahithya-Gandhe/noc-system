import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNOC } from '../../context/NOCContext';
import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PendingRequests = ({ requests, refreshRequests }) => {
  const { currentUser } = useAuth();
  const { updateRequestStatus } = useNOC();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const handleAction = (request, actionType) => {
    setSelectedRequest(request);
    setAction(actionType);
    setRejectionReason('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setAction('');
    setRejectionReason('');
  };

  const handleConfirmAction = () => {
    if (!selectedRequest) return;

    if (action === 'approve') {
      updateRequestStatus(selectedRequest.id, currentUser.department, 'approved');
    } else if (action === 'reject') {
      updateRequestStatus(selectedRequest.id, currentUser.department, 'rejected', rejectionReason);
    }

    handleCloseModal();
    refreshRequests();
  };

  if (requests.length === 0) {
    return (
      <div className="alert alert-info">
        <p className="mb-0">There are no pending NOC requests for your department.</p>
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <div className="card-header bg-light">
          <h5 className="mb-0">Pending NOC Requests</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Purpose</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>#{request.id.slice(-6)}</td>
                    <td>
                      <div>{request.studentName}</div>
                      <small className="text-muted">{request.studentEmail}</small>
                    </td>
                    <td>{formatDate(request.createdAt)}</td>
                    <td>{request.purpose}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => handleAction(request, 'approve')}
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleAction(request, 'reject')}
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 'approve' ? 'Approve Request' : 'Reject Request'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <p><strong>Student:</strong> {selectedRequest.studentName}</p>
              <p><strong>Purpose:</strong> {selectedRequest.purpose}</p>
              
              {action === 'approve' ? (
                <p>Are you sure you want to approve this NOC request?</p>
              ) : (
                <>
                  <p>Please provide a reason for rejection:</p>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Reason for rejection"
                    required
                  />
                </>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button 
            variant={action === 'approve' ? 'success' : 'danger'}
            onClick={handleConfirmAction}
            disabled={action === 'reject' && !rejectionReason.trim()}
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PendingRequests;