import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useNOC } from '../../context/NOCContext';

const NewRequestForm = ({ onRequestCreated }) => {
  const { createRequest } = useNOC();
  const [success, setSuccess] = useState(false);

  const initialValues = {
    departments: [],
    purpose: '',
    additionalInfo: ''
  };

  const validationSchema = Yup.object({
    departments: Yup.array()
      .min(1, 'Select at least one department')
      .required('Required'),
    purpose: Yup.string().required('Required')
  });

  const departmentOptions = [
    { value: 'Library', label: 'Library' },
    { value: 'TPO', label: 'Training & Placement Office' },
    { value: 'Computer Science', label: 'Computer Science Department' },
    { value: 'Electrical', label: 'Electrical Department' },
    { value: 'Mechanical', label: 'Mechanical Department' },
    { value: 'Civil', label: 'Civil Department' }
  ];

  const handleSubmit = (values, { resetForm }) => {
    createRequest(values);
    resetForm();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
    if (onRequestCreated) onRequestCreated();
  };

  return (
    <div className="card">
      <div className="card-header bg-light">
        <h5 className="mb-0">Create New NOC Request</h5>
      </div>
      <div className="card-body">
        {success && (
          <div className="alert alert-success">
            Your NOC request has been submitted successfully!
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <div className="form-group mb-4">
                <label className="form-label">Select Departments for Approval *</label>
                <div className="mb-2 small text-muted">
                  Select all departments from which you need approval for your NOC.
                </div>
                
                <FieldArray name="departments">
                  {({ push, remove }) => (
                    <div>
                      {departmentOptions.map((option) => (
                        <div key={option.value} className="form-check mb-2">
                          <input
                            type="checkbox"
                            id={`department-${option.value}`}
                            name="departments"
                            value={option.value}
                            checked={values.departments.includes(option.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                push(option.value);
                              } else {
                                const idx = values.departments.indexOf(option.value);
                                if (idx >= 0) remove(idx);
                              }
                            }}
                            className="form-check-input"
                          />
                          <label 
                            htmlFor={`department-${option.value}`}
                            className="form-check-label"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage name="departments" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="purpose" className="form-label">Purpose of NOC *</label>
                <Field
                  as="textarea"
                  id="purpose"
                  name="purpose"
                  className="form-control"
                  placeholder="Explain why you need this No Objection Certificate"
                  rows="3"
                />
                <ErrorMessage name="purpose" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="additionalInfo" className="form-label">Additional Information</label>
                <Field
                  as="textarea"
                  id="additionalInfo"
                  name="additionalInfo"
                  className="form-control"
                  placeholder="Any additional details that might help with your request"
                  rows="2"
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || values.departments.length === 0}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit NOC Request'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewRequestForm;