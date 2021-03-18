import React from 'react';
import { Card } from 'antd';

const RenderFormData = ({ formData, signerInfo }) => {
  const { familyInfo, familyMember } = formData;
  const {
    phone_one,
    phone_two,
    emergencyContact,
    vehicle,
    last_payment_address,
    homeless_info,
    gov_benefits,
    insurance,
    domestic_violence_info,
    pets,
  } = familyInfo;

  return (
    <div>
      <h3>Form Data Goes Here</h3>
      <Card title="User Information">
        <ul>
          <li>First Name:{signerInfo.first_name}</li>
          <li>Last Name:{signerInfo.last_name}</li>
          <li>Email: {signerInfo.email}</li>
        </ul>
      </Card>
      <Card title="Contact Information">
        <ul>
          <li>Phone Number: {phone_one.number}</li>
          <li>Phone Number: {phone_two.number}</li>
        </ul>
      </Card>
    </div>
  );
};

export default RenderFormData;
