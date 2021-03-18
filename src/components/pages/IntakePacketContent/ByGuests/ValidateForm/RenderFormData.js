import React from 'react';
import { Card, Typography, Collapse } from 'antd';

import formData from './mockFormValues';

const { Title } = Typography;
const { Panel } = Collapse;

const RenderFormData = () => {
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
      <h2>Lets make sure all your information is correct!</h2>
      {/* <Card title="User Information">
        <ul>
          <li>First Name:{signerInfo.first_name}</li>
          <li>Last Name:{signerInfo.last_name}</li>
          <li>Email: {signerInfo.email}</li>
        </ul>
      </Card> */}
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Contact Information" key="1">
          <Title level={5}>{phone_one.name}</Title>
          <ul>
            <li>Phone Number: {phone_one.number}</li>
            <li>
              {phone_one.safeToLeaveMssg
                ? 'Safe to Leave Messages'
                : 'Do Not Leave Messages'}
            </li>
          </ul>
          <Title level={5}>{phone_two.name}</Title>
          <ul>
            <li>Phone Number: {phone_two.number}</li>
            <li>
              {phone_two.safeToLeaveMssg
                ? 'Safe to Leave Messages'
                : 'Do Not Leave Messages'}
            </li>
          </ul>
          <Title level={5}>Emergency Contact</Title>
          <ul>
            <li>Name: {emergencyContact.name}</li>
            <li>Phone Number: {emergencyContact.number}</li>
          </ul>
        </Panel>
        <Panel header="Vehicle Information" key="2">
          <ul>
            <li>Make: {vehicle.make} </li>
            <li>Year: {vehicle.year} </li>
            <li>Color: {vehicle.color} </li>
            <li>Model: {vehicle.model} </li>
            <li>License Plate: {vehicle.license_plate} </li>
          </ul>
        </Panel>
        <Panel header="Housing history" key="3">
          <ul>
            <li>Last Permenant Address: {last_payment_address}</li>
            <li>
              Length of stay at last permenant residence:{' '}
              {homeless_info.length_at_prior_location}
            </li>
            <li>Most recent residency: {homeless_info.prior_location}</li>
            <li>
              Length at current residence:{' '}
              {homeless_info.length_at_current_residence}
            </li>
            <li>
              Number of times homeless in the past two years:{' '}
              {homeless_info.num_times_homeless}
            </li>
            <li>
              Total length of homelessness in teh past two years:{' '}
              {homeless_info.total_len_homeless}
            </li>
            <li>
              Most recent date you became homeless:{' '}
              {homeless_info.homeless_start_date}
            </li>
          </ul>
        </Panel>
        <Panel header="Benefits and Insurance" key="4">
          <Title level={5}>Government Benefits you receive:</Title>
          <ul>
            {gov_benefits.RRH ? <li>RRH</li> : null}
            {gov_benefits.snap ? <li>SNAP</li> : null}
            {gov_benefits.cps_fps ? <li>CPS/ FPS</li> : null}
            {gov_benefits.foodstamps ? <li>Food Stamps</li> : null}
            {gov_benefits.housing_voucher ? <li>Housing Voucher</li> : null}
            {gov_benefits.veteran_services ? <li>veteran_services</li> : null}
          </ul>
          {insurance.has_insurance ? (
            <>
              <Title level={5}>Insurance</Title>
              <ul>
                <li>Members Covered under plan: {insurance.members_covered}</li>
                <li>Insurance Type: {insurance.health_insurance_type}</li>
              </ul>
            </>
          ) : null}
        </Panel>
      </Collapse>
    </div>
  );
};

export default RenderFormData;
