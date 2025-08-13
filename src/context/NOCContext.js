import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NOCContext = createContext();

export const useNOC = () => useContext(NOCContext);

export const NOCProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Load requests from localStorage
    const savedRequests = localStorage.getItem('nocRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      // Initialize with empty array if no requests exist
      setRequests([]);
      localStorage.setItem('nocRequests', JSON.stringify([]));
    }
    setLoading(false);
  }, []);

  // Save requests to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('nocRequests', JSON.stringify(requests));
    }
  }, [requests, loading]);

  // Create a new NOC request
  const createRequest = (requestData) => {
    const newRequest = {
      id: Date.now().toString(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      department: currentUser.department,
      createdAt: new Date().toISOString(),
      status: 'pending',
      approvals: requestData.departments.map(dept => ({
        department: dept,
        status: 'pending',
        facultyId: null,
        facultyName: null,
        updatedAt: null,
        comments: null
      })),
      purpose: requestData.purpose,
      additionalInfo: requestData.additionalInfo || ''
    };

    setRequests(prevRequests => [...prevRequests, newRequest]);
    return newRequest;
  };

  // Get requests for a specific student
  const getStudentRequests = (studentId) => {
    return requests.filter(req => req.studentId === studentId);
  };

  // Get requests pending for a specific faculty department
  const getFacultyRequests = (department) => {
    return requests.filter(req => 
      req.approvals.some(approval => 
        approval.department === department && 
        approval.status === 'pending'
      )
    );
  };

  // Update request approval status
  const updateRequestStatus = (requestId, department, status, comments = '') => {
    setRequests(prevRequests => 
      prevRequests.map(req => {
        if (req.id === requestId) {
          // Update the specific department approval
          const updatedApprovals = req.approvals.map(approval => {
            if (approval.department === department) {
              return {
                ...approval,
                status: status,
                facultyId: currentUser.id,
                facultyName: currentUser.name,
                updatedAt: new Date().toISOString(),
                comments: comments
              };
            }
            return approval;
          });

          // Check if all departments have approved
          const allApproved = updatedApprovals.every(approval => approval.status === 'approved');
          const anyRejected = updatedApprovals.some(approval => approval.status === 'rejected');

          // Update overall status
          let overallStatus = 'pending';
          if (allApproved) {
            overallStatus = 'approved';
          } else if (anyRejected) {
            overallStatus = 'rejected';
          }

          return {
            ...req,
            approvals: updatedApprovals,
            status: overallStatus
          };
        }
        return req;
      })
    );
  };

  // Get a specific request by ID
  const getRequestById = (requestId) => {
    return requests.find(req => req.id === requestId) || null;
  };

  const value = {
    requests,
    loading,
    createRequest,
    getStudentRequests,
    getFacultyRequests,
    updateRequestStatus,
    getRequestById
  };

  return (
    <NOCContext.Provider value={value}>
      {!loading && children}
    </NOCContext.Provider>
  );
};