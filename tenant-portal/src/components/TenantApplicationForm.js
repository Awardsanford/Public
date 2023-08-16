import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const stateOptions = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

function TenantApplicationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentStreetAddress, setCurrentStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [usState, setUsState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [identificationType, setIdentificationType] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const auth = getAuth();
  const currUser = auth.currentUser.email ? auth.currentUser.email : null;

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber);
  };

  return (
    <div className="container">
      <h2 className="mt-4">Tenant Application for 59 Walnut St</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="d-flex" style={{ gap: '15px' }}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control me-6"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number:
          </label>
          <PhoneInput
            country={'us'}
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="currentStreetAddress" className="form-label">
            Current Street Address:
          </label>
          <input
            type="text"
            className="form-control"
            id="currentStreetAddress"
            value={currentStreetAddress}
            onChange={(e) => setCurrentStreetAddress(e.target.value)}
            style={{ maxWidth: '340px' }}
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
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ maxWidth: '340px' }}
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
        value={usState}
        onChange={(e) => setUsState(e.target.value)}
        style={{ maxWidth: '240px' }}
        required
      >
        <option value="" disabled>
          Select State
        </option>
        {stateOptions.map(option => (
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
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}        
        style={{ maxWidth: '100px' }}
        required
      />
    </div>
  </div>
</div>



        <div className="mb-3">
          <label htmlFor="birthDate" className="form-label">
            Birth Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="d-flex align-items-center mb-3">
  <label htmlFor="identificationType" className="form-label me-3">
    Identification Type:
  </label>
  <select
    className="form-select flex-grow-1"
    id="identificationType"
    value={identificationType}
    onChange={(e) => setIdentificationType(e.target.value)}
    style={{ maxWidth: '200px' }}
    required
  >
    <option value="" disabled>Select Type</option>
    <option value="driverLicense">Driver's License</option>
    <option value="passport">Passport</option>
  </select>
  <label htmlFor="identificationNumber" className="form-label ms-3">
    Identification Number:
  </label>
  <input
    type="text"
    className="form-control"
    id="identificationNumber"
    value={identificationNumber}
    onChange={(e) => setIdentificationNumber(e.target.value)}
    style={{ maxWidth: '340px' }}
    required
  />
</div>



        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={currUser}
            required
            disabled={true} // Disable if user is signed in
          />
        </div>
        {/* Rental History Section */}
        <div className="mb-3">
  <h3>Rental History</h3>
  {[1, 2, 3].map((index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <h4>Rental #{index}</h4>
      <div className="mb-3">
        <label htmlFor={`address${index}`} className="form-label">
          Street Address:
        </label>
        <input
          type="text"
          className="form-control"
          id={`address${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`city${index}`} className="form-label">
          City:
        </label>
        <input
          type="text"
          className="form-control"
          id={`city${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`state${index}`} className="form-label">
          State:
        </label>
        <select
          className="form-select"
          id={`state${index}`}
          required
        >
          <option value="" disabled>Select State</option>
          {stateOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor={`landlordName${index}`} className="form-label">
          Landlord Name:
        </label>
        <input
          type="text"
          className="form-control"
          id={`landlordName${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`landlordPhone${index}`} className="form-label">
          Landlord Phone:
        </label>
        <PhoneInput
          country={'us'}
          id={`landlordPhone${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`landlordEmail${index}`} className="form-label">
          Landlord Email:
        </label>
        <input
          type="email"
          className="form-control"
          id={`landlordEmail${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`moveInDate${index}`} className="form-label">
          Move-In Date:
        </label>
        <input
          type="date"
          className="form-control"
          id={`moveInDate${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`moveOutDate${index}`} className="form-label">
          Move-Out Date:
        </label>
        <input
          type="date"
          className="form-control"
          id={`moveOutDate${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`monthlyRent${index}`} className="form-label">
          Monthly Rent:
        </label>
        <input
          type="number"
          className="form-control"
          id={`monthlyRent${index}`}
          required
        />
      </div>
    </div>
  ))}
</div>

<div className="mb-3">
  <h3>Employment/Source of Funds</h3>
  {[1, 2, 3].map((index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <h4>Employment/Funds Source #{index}</h4>
      <div className="mb-3">
        <label htmlFor={`employer${index}`} className="form-label">
          Employer:
        </label>
        <input
          type="text"
          className="form-control"
          id={`employer${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`position${index}`} className="form-label">
          Position:
        </label>
        <input
          type="text"
          className="form-control"
          id={`position${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`supervisor${index}`} className="form-label">
          Supervisor:
        </label>
        <input
          type="text"
          className="form-control"
          id={`supervisor${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`supervisorPhone${index}`} className="form-label">
          Supervisor Phone:
        </label>
        <PhoneInput
          country={'us'}
          id={`supervisorPhone${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`employmentStartDate${index}`} className="form-label">
          Employment Start Date:
        </label>
        <input
          type="date"
          className="form-control"
          id={`employmentStartDate${index}`}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor={`grossMonthlySalary${index}`} className="form-label">
          Gross Monthly Salary/Funds:
        </label>
        <input
          type="number"
          className="form-control"
          id={`grossMonthlySalary${index}`}
          required
        />
      </div>
    </div>
  ))}
</div>

<div className="mb-3">
  <h3>Applicant's Signature</h3>
  <div className="mb-3">
    <p>
      I warrant that all statements contained in this application are true and accurate
      and that I have not knowingly withheld any information which would, if disclosed,
      affect my application unfavorably. I hereby provide the owner or its authorized agent
      with my consent to communicate with my current and former landlords and employers
      for the purpose of, among other things, verifying the information listed herein.
      I am aware that a credit, eviction, and criminal background check may be conducted
      in conjunction with my application.
    </p>
    <div className="mb-3">
      <label htmlFor="signature" className="form-label">
        Signature:
      </label>
      <input
        type="text"
        className="form-control"
        id="signature"
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="signatureDate" className="form-label">
        Date:
      </label>
      <input
        type="date"
        className="form-control"
        id="signatureDate"
        required
      />
    </div>
  </div>
</div>




        {/* Other input fields */}
        <button type="submit" className="btn btn-primary">
          Submit Application
        </button>
      </form>
    </div>
  );
}



export default TenantApplicationForm;