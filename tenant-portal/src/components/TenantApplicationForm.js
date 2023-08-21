import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { setDoc, doc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SignatureCanvas from 'react-signature-canvas';
import SignatureLine from './SignatureLine';
import stateList from '../sets/stateList';






function TenantApplicationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentStreetAddress, setCurrentStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [identificationType, setIdentificationType] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('')
  const [signature, setSignature] = useState('');
  const [signatureDate, setSignatureDate] = useState('');
  const auth = getAuth();
  const [currUser, setCurrUser] = useState(null);
  // const currUser = auth.currentUser.email ? auth.currentUser.email : null;
  const [petOwnership, setPetOwnership] = useState(null);
  const [petDescription, setPetDescription] = useState(null);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [isLoading, setIsLoading] = useState(true);
  const [signatureCanvas, setSignatureCanvas] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const { firstName, lastName } = formData;
    const isValid = firstName.trim() !== "" && lastName.trim() !== "" /* ... */;
    setIsFormValid(isValid);
  };

  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    ssn: '',
    currentStreetAddress: '',
    city: '',
    usState: '',
    zipCode: '',
    identificationType: '',
    identificationNumber: '',
    petOwnership: '',
    petDescription: '',
    address1: '',
  });

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          setCurrUser(user.email);
          const userDocRef = doc(db, 'tenant-application', user.email);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userDocData = userDocSnap.data();
            setFormData(userDocData);
          }
        } else {
          setCurrUser(null);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching document:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleSignatureSave = (signatureData) => {
    // Send the signature data to another program or process
    console.log("Signature Image:", signatureData.signatureImage);
    console.log("Signature Timestamp:", signatureData.signatureTimestamp);

    // You can further process or send this data to your desired location
  };


  const [employmentDetails, setEmploymentDetails] = useState([
    {
      employer: '',
      position: '',
      supervisor: '',
      supervisorPhone: '',
      employmentStartDate: '',
      grossMonthlySalary: '',
    },
    {
      employer: '',
      position: '',
      supervisor: '',
      supervisorPhone: '',
      employmentStartDate: '',
      grossMonthlySalary: '',
    },
    {
      employer: '',
      position: '',
      supervisor: '',
      supervisorPhone: '',
      employmentStartDate: '',
      grossMonthlySalary: '',
    },
  ]);

  const [rentalHistories, setRentalHistories] = useState([
    {
      address: '',
      city: '',
      state: '',
      landlordName: '',
      landlordPhone: '',
      landlordEmail: '',
      moveInDate: '',
      moveOutDate: '',
      monthlyRent: '',
      reasonForLeaving: '',
    },
    {
      address: '',
      city: '',
      state: '',
      landlordName: '',
      landlordPhone: '',
      landlordEmail: '',
      moveInDate: '',
      moveOutDate: '',
      monthlyRent: '',
      reasonForLeaving: '',
    },
    {
      address: '',
      city: '',
      state: '',
      landlordName: '',
      landlordPhone: '',
      landlordEmail: '',
      moveInDate: '',
      moveOutDate: '',
      monthlyRent: '',
      reasonForLeaving: '',
    },
  ]);

  const [otherOccupants, setOtherOccupants] = useState([
    {
      fullName: '',
      dateOfBirth: '',
      socialSecurityNumber: '',
    },
    {
      fullName: '',
      dateOfBirth: '',
      socialSecurityNumber: '',
    },
    {
      fullName: '',
      dateOfBirth: '',
      socialSecurityNumber: '',
    },
    {
      fullName: '',
      dateOfBirth: '',
      socialSecurityNumber: '',
    },

  ]);

  const [signatureId, setSignatureId] = useState([
    {
      sigCheckBox: '',
      sigTimestamp: '',
      signatureId: '',
    }
  ]);

  const [saveStates, setSaveStates] = useState({
    personalInfo: false,
    rentalHistory: false,
    employment: false,
    otherOccupants: false,
    signature: false
  });
  const tabOrder = ['personalInfo', 'rentalHistory', 'employment', 'otherOccupants', 'signature'];
  const handleSaveAndContinue = (section) => {
    const nextTab = handleSave(section);
    if (nextTab) {
      // Find the tab element and simulate a click event to navigate
      const nextTabElement = document.getElementById(nextTab);
      if (nextTabElement) {
        nextTabElement.click();
      }
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async (section) => {
    try {
      // Construct the reference to the document within the "tenant-application" collection
      const userDocRef = doc(db, 'tenant-application', currUser); // Assuming currUser is the user's email or user ID

      // Try to get the document snapshot
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // If the document exists, update it
        await updateDoc(userDocRef, {
          [section]: formData[section], // Use existing data for the section and update only the properties you need
        });
      } else {
        // If the document doesn't exist, create it with the user identifier as the document ID
        await setDoc(userDocRef, {
          user: currUser,
          [section]: formData[section], // Use existing data for the section
        });
      }

      // After saving, update the save state for the current section
      setSaveStates((prevState) => ({
        ...prevState,
        [section]: true,
      }));
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
     
    }
  };

  const handleFieldChange = (section, fieldName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [fieldName]: value,
      }
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  return (

    <div className="container">
      <h2 className="mt-4">Application for Tenancy</h2>
      <ul className="nav nav-tabs" id="myTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="personalInfo-tab" data-bs-toggle="tab" href="#personalInfo" role="tab" aria-controls="personalInfo" aria-selected="true">
            Personal Info
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="rentalHistory-tab" data-bs-toggle="tab" href="#rentalHistory" role="tab" aria-controls="rentalHistory" aria-selected="false">
            Rental History
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="employment-tab" data-bs-toggle="tab" href="#employment" role="tab" aria-controls="employment" aria-selected="false">
            Employment/Source of Funds
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="otherOccupants-tab" data-bs-toggle="tab" href="#otherOccupants" role="tab" aria-controls="otherOccupants" aria-selected="false">
            Other Occupants
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="signature-tab" data-bs-toggle="tab" href="#signature" role="tab" aria-controls="signature" aria-selected="false">
            Applicant's Signature
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabsContent">
        <div className="tab-pane fade show active" id="personalInfo" role="tabpanel" aria-labelledby="personalInfo-tab">
          {/* Personal Info Input Fields */}

          <div className="mb-3" style={{ marginTop: '20px' }}>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData?.personalInfo?.firstName || ''}
                  onChange={(e) => handleFieldChange('personalInfo', 'firstName', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData?.personalInfo?.lastName || ''}
                  onChange={(e) => handleFieldChange('personalInfo', 'lastName', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  defaultValue={currUser}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ maxWidth: '430px' }}
                  disabled={true} // Disable if user is signed in
                />
              </div>
            </div>
          </div>



          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <label htmlFor="birthDate" className="form-label">
                Date of Birth:
              </label>
              <input
                type="date"
                className="form-control"
                id="birthDate"
                value={formData?.personalInfo?.birthDate || ''}
                onChange={(e) => handleFieldChange('personalInfo', 'birthDate', e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="ssn" className="form-label">
                Social Security #:
              </label>
              <input
                type="text"
                className="form-control"
                id="ssn"
                placeholder="XXX-XX-XXXX"
                value={formData?.personalInfo?.ssn || ''}
                onChange={(e) => handleFieldChange('personalInfo', 'ssn', e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <PhoneInput
                country={'us'}
                id="phoneNumber"
                value={formData?.personalInfo?.phoneNumber || ''}
                onChange={(value) => handleFieldChange('personalInfo', 'phoneNumber', value)}
                required
              />
            </div>


            <div className="mb-3">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div>
                  <label htmlFor="identificationType" className="form-label">
                    Identification Type:
                  </label>
                  <select
                    className="form-select"
                    id="identificationType"
                    value={formData?.personalInfo?.identificationType || ''}
                    onChange={(e) => handleFieldChange('personalInfo', 'identificationType', e.target.value)}
                    style={{ maxWidth: '240px' }}
                    required
                  >
                    <option value="" disabled>Select Type</option>
                    <option value="driverLicense">Driver's License</option>
                    <option value="passport">Passport</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="identificationNumber" className="form-label">
                    Identification Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="identificationNumber"
                    value={formData?.personalInfo?.identificationNumber || ''}
                    onChange={(e) => handleFieldChange('personalInfo', 'identificationNumber', e.target.value)}
                    style={{ maxWidth: '275px' }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>



          <div className="mb-3">
            <label htmlFor="currentStreetAddress" className="form-label">
              Current Street Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="currentStreetAddress"
              value={formData?.personalInfo?.currentStreetAddress || ''}
              onChange={(e) => handleFieldChange('personalInfo', 'currentStreetAddress', e.target.value)}
              style={{ maxWidth: '430px' }}
              required
            />
          </div>
          <div className="mb-3">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div >
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={formData?.personalInfo?.city || ''}
                  onChange={(e) => handleFieldChange('personalInfo', 'city', e.target.value)}
                  style={{ maxWidth: '150px' }}
                  required
                />
              </div>
              <div >
                <label htmlFor="usState" className="form-label">
                  State:
                </label>
                <select
                  className="form-select"
                  id="usState"
                  value={formData?.personalInfo?.usState || ''}
                  onChange={(e) => handleFieldChange('personalInfo', 'usState', e.target.value)}
                  style={{ maxWidth: '240px' }}
                  required
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {stateList.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="zipCode" className="form-label">
                  Zip Code:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zipCode"
                  value={formData?.personalInfo?.zipCode || ''}
                  onChange={(e) => handleFieldChange('personalInfo', 'zipCode', e.target.value)}
                  style={{ maxWidth: '100px' }}
                  required
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="mb-3">
              <p>Will you have any pets living with you?</p>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="yes"
                  name="petOwnership"
                  value="yes"
                  checked={formData?.personalInfo?.petOwnership === 'yes'}
                  onChange={() => handleFieldChange('personalInfo', 'petOwnership', 'yes')}
                  required
                />
                <label className="form-check-label" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="no"
                  name="petOwnership"
                  value="no"
                  checked={formData?.personalInfo?.petOwnership === 'no'}
                  onChange={() => handleFieldChange('personalInfo', 'petOwnership', 'no')}
                  required
                />
                <label className="form-check-label" htmlFor="no">
                  No
                </label>
              </div>
              <div>
                {formData?.personalInfo?.petOwnership === 'yes' && (
                  <div className="mt-3">
                    <label htmlFor="petDescription" className="form-label">
                      Please describe the pet(s):
                    </label>
                    <textarea
                      className="form-control"
                      id="petDescription"
                      value={formData?.personalInfo?.petDescription || ''}
                      onChange={(e) => handleFieldChange('personalInfo', 'petDescription', e.target.value)}
                      rows="3"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={() => handleSave('personalInfo')}>
            Save
          </button>
          <button
            className="btn btn-primary mt-3"
            style={{ marginLeft: '20px' }}
            onClick={() => handleSaveAndContinue('personalInfo')}
          >
            Save and Continue
          </button>
        </div>


        <div className="tab-pane fade" id="rentalHistory" role="tabpanel" aria-labelledby="rentalHistory-tab">
          {/* Rental History Input Fields */}
          <div className="mb-3">
            {rentalHistories.map((rental, index) => (
              <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f8f8' }}>
                <h4>Rental #{index + 1}</h4>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor={`address${index}`} className="form-label">
                      Street Address:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`address${index}`}
                      value={formData?.rentalHistory?.[`address${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`address${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor={`city${index}`} className="form-label">
                      City:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`city${index}`}
                      value={formData?.rentalHistory?.[`city${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`city${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor={`state${index}`} className="form-label">
                      State:
                    </label>
                    <select
                      className="form-select"
                      id={`state${index}`}
                      value={formData?.rentalHistory?.[`state${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`state${index}`], e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {stateList.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor={`landlordName${index}`} className="form-label">
                      Landlord Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`landlordName${index}`}
                      value={formData?.rentalHistory?.[`landlordName${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`landlordName${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`landlordPhone${index}`} className="form-label">
                      Landlord Phone:
                    </label>
                    <PhoneInput country={'us'} id={`landlordPhone${index}`}
                      value={formData?.rentalHistory?.[`landlordPhone${index}`] || ''}
                      onChange={(value) => handleFieldChange('rentalHistory', [`landlordPhone${index}`], value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`landlordEmail${index}`} className="form-label">
                      Landlord Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id={`landlordEmail${index}`}
                      value={formData?.rentalHistory?.[`landlordEmail${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`landlordEmail${index}`], e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor={`moveInDate${index}`} className="form-label">
                      Move-In Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id={`moveInDate${index}`}
                      value={formData?.rentalHistory?.[`moveInDate${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`moveInDate${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`moveOutDate${index}`} className="form-label">
                      Move-Out Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id={`moveOutDate${index}`}
                      value={formData?.rentalHistory?.[`moveOutDate${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`moveOutDate${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`monthlyRent${index}`} className="form-label">
                      Monthly Rent:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`monthlyRent${index}`}
                      value={formData?.rentalHistory?.[`monthlyRent${index}`] || ''}
                      onChange={(e) => handleFieldChange('rentalHistory', [`monthlyRent${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor={`reasonForLeaving${index}`} className="form-label">
                    Reason for Leaving:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`reasonForLeaving${index}`}
                    value={formData?.rentalHistory?.[`reasonForLeaving${index}`] || ''}
                    onChange={(e) => handleFieldChange('rentalHistory', [`reasonForLeaving${index}`], e.target.value)}
                    required={index === 1}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={() => handleSave('rentalHistory')}>
            Save
          </button>
          <button
            className="btn btn-primary mt-3"
            style={{ marginLeft: '20px' }}
            onClick={() => handleSaveAndContinue('rentalHistory')}
          >
            Save and Continue
          </button>
        </div>


        <div className="tab-pane fade" id="employment" role="tabpanel" aria-labelledby="employment-tab">
          {/* Employment/Source of Funds Input Fields */}
          <div className="mb-3">
            {employmentDetails.map((employer, index) => (
              <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f8f8' }}>
                <h4>Employment/Funds Source #{index + 1}</h4>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`employer${index}`} className="form-label">
                      Employer:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`employer${index}`}
                      value={formData?.employment?.[`employer${index}`] || ''}
                      onChange={(e) => handleFieldChange('employment', [`employer${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`position${index}`} className="form-label">
                      Position:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`position${index}`}
                      value={formData?.employment?.[`position${index}`] || ''}
                      onChange={(e) => handleFieldChange('employment', [`position${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`supervisor${index}`} className="form-label">
                      Supervisor:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={`supervisor${index}`}
                      value={formData?.employment?.[`supervisor${index}`] || ''}
                      onChange={(e) => handleFieldChange('employment', [`supervisor${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`supervisorPhone${index}`} className="form-label">
                      Supervisor Phone:
                    </label>
                    <PhoneInput
                      country={'us'}
                      id={`supervisorPhone${index}`}
                      value={formData?.employment?.[`supervisorPhone${index}`] || ''}
                      onChange={(value) => handleFieldChange('employment', [`supervisorPhone${index}`], value)}
                      required={index === 1}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`employmentStartDate${index}`} className="form-label">
                      Employment Start Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id={`employmentStartDate${index}`}
                      value={formData?.employment?.[`employmentStartDate${index}`] || ''}
                      onChange={(e) => handleFieldChange('employment', [`employmentStartDate${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label htmlFor={`grossMonthlySalary${index}`} className="form-label">
                      Gross Monthly Salary/Funds:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id={`grossMonthlySalary${index}`}
                      value={formData?.employment?.[`grossMonthlySalary${index}`] || ''}
                      onChange={(e) => handleFieldChange('employment', [`grossMonthlySalary${index}`], e.target.value)}
                      required={index === 1}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={() => handleSave('employment')}>
            Save
          </button>
          <button
            className="btn btn-primary mt-3"
            style={{ marginLeft: '20px' }}
            onClick={() => handleSaveAndContinue('employment')}
          >
            Save and Continue
          </button>

        </div>

        {/* Other occupants Input Fields */}
        <div className="tab-pane fade" id="otherOccupants" role="tabpanel" aria-labelledby="otherOccupants-tab">

          <div className="mb-3">
            {otherOccupants.map((_, index) => {
              const fullNameId = `name${index}`;
              const dobId = `dob${index}`;
              const ssnId = `ssn${index}`;

              return (
                <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '20px', backgroundColor: '#f8f8f8' }}>
                  <h4>Occupant #{index + 1}</h4>
                  <div className="d-flex" style={{ marginTop: '30px' }}>
                    <div className="me-4">
                      <label htmlFor={fullNameId} className="form-label">
                        First and Last Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={fullNameId}
                        style={{ maxWidth: '300px' }}
                        value={formData?.otherOccupants?.[`fullNameId${index}`] || ''}
                        onChange={(e) => handleFieldChange('otherOccupants', [`fullNameId${index}`], e.target.value)}
                      />
                    </div>
                    <div className="me-4">
                      <label htmlFor={dobId} className="form-label">
                        Date of Birth:
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id={dobId}
                        style={{ maxWidth: '200px' }}
                        value={formData?.otherOccupants?.[`dobId${index}`] || ''}
                        onChange={(e) => handleFieldChange('otherOccupants', [`dobId${index}`], e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={ssnId} className="form-label">
                        Social Security #:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id={ssnId}
                        placeholder="Social Security Number"
                        style={{ maxWidth: '250px' }}
                        value={formData?.otherOccupants?.[`ssnId${index}`] || ''}
                        onChange={(e) => handleFieldChange('otherOccupants', [`ssnId${index}`], e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="btn btn-primary mt-3" onClick={() => handleSave('otherOccupants')}>
            Save
          </button>
          <button
            className="btn btn-primary mt-3"
            style={{ marginLeft: '20px' }}
            onClick={() => handleSaveAndContinue('otherOccupants')}
          >
            Save and Continue
          </button>

        </div>

        <div className="tab-pane fade" id="signature" role="tabpanel" aria-labelledby="signature-tab">
          {/* Applicant's Signature Input Fields */}

          <div className="mb-3" style={{ marginTop: '30px' }}>
            <label style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <input
                type="checkbox"
                style={{ marginRight: "10px", marginTop: "-70px" }}
                id="sigCheckbox"
                value={formData?.signature?.[`sigCheckbox`] || ''}
                onChange={(e) => handleFieldChange('signature', [`sigCheckbox`], e.target.value)}
              />
              <span>
                By checking this box I warrant that all statements contained in this application are true and accurate
                and that I have not knowingly withheld any information which would, if disclosed,
                affect my application unfavorably. I hereby provide the owner or its authorized agent
                with my consent to communicate with my current and former landlords and employers
                for the purpose of, among other things, verifying the information listed herein.
                I am aware that a credit, eviction, and criminal background check may be conducted
                in conjunction with my application.
              </span>
            </label>
            <SignatureLine onSignatureSave={handleSignatureSave} />
            {/* <SignatureLine></SignatureLine> */}
            <div className="mb-3">
              <form onSubmit={handleSubmit} className="mt-4">
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TenantApplicationForm;