import React, { useState } from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;
const tabListNoTitle = [
  {
    key: 'Demographics',
    tab: 'Demographics',
  },
  {
    key: 'Barriers',
    tab: 'Barriers',
  },
  {
    key: 'Additional Info',
    tab: 'Additional Info',
  },
];

const GuestMoreInfo = ({ memberInfo }) => {
  console.log(memberInfo);
  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'Demographics' });

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };
  let contentListNoTitle = {};
  if (memberInfo) {
    contentListNoTitle = {
      Demographics: (
        <div className="Demographics">
          <div className="addInfoText">
            <Text type="secondary" strong>
              First Name
            </Text>
            <p>
              {memberInfo.demographics.first_name
                ? memberInfo.demographics.first_name
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Last Name
            </Text>
            <p>
              {memberInfo.demographics.last_name
                ? memberInfo.demographics.last_name
                : ''}{' '}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Relationship
            </Text>
            <p>
              {memberInfo.demographics.relationship
                ? memberInfo.demographics.relationship
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary" strong>
              Gender
            </Text>
            <p>
              {memberInfo.demographics.gender
                ? memberInfo.demographics.gender
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Date Of Birth
            </Text>
            <p>
              {memberInfo.demographics.DOB ? memberInfo.demographics.DOB : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              SSN
            </Text>
            <p>
              {' '}
              {memberInfo.demographics.SSN ? memberInfo.demographics.SSN : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Employer
            </Text>
            <p>
              {memberInfo.demographics.employer
                ? memberInfo.demographics.employer
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Income
            </Text>
            <p>
              {' '}
              {memberInfo.demographics.income
                ? memberInfo.demographics.income
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Race
            </Text>
            <p>
              {memberInfo.demographics.race ? memberInfo.demographics.race : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary" strong>
              Ethnicity
            </Text>
            <p>
              {memberInfo.demographics.ethnicity
                ? memberInfo.demographics.ethnicity
                : ''}
            </p>
          </div>
        </div>
      ),
      Barriers: (
        <div className="barriers">
          <div className="addInfoText">
            <Text type="secondary">HIV/AIDS:</Text>

            {memberInfo.barriers.HIV_AIDs
              ? memberInfo.barriers.HIV_AIDs === true
                ? 'yes'
                : 'no'
              : ''}

            <br></br>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Alcohol Abuse:</Text>
            <p>
              {memberInfo.barriers.alcohol_abuse
                ? memberInfo.barriers.alcohol_abuse === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Chronic Health Issues:</Text>
            <p>
              {memberInfo.barriers.chronic_health_issues
                ? memberInfo.barriers.chronic_health_issues === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <br></br>
          <div className="addInfoText">
            <Text type="secondary">Physcial Disabilites:</Text>
            <p>
              {memberInfo.barriers.physcial_disabilites
                ? memberInfo.barriers.physcial_disabilites === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>

          <div className="addInfoText">
            <Text type="secondary">Development Disabilites:</Text>
            <p>
              {memberInfo.barriers.developmental_disabilites
                ? memberInfo.barriers.developmental_disabilites === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Drug Abuse:</Text>
            <p>
              {memberInfo.barriers.drug_abuse
                ? memberInfo.barriers.drug_abuse === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Indefinite Conditions:</Text>
            <p>
              {memberInfo.barriers.list_indefinite_conditions
                ? memberInfo.barriers.list_indefinite_conditions === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Issues:</Text>
            <p>
              {memberInfo.barriers.issues
                ? memberInfo.barriers.issues === true
                  ? 'yes'
                  : 'no'
                : ''}
            </p>
          </div>
          <br></br>
        </div>
      ),
      'Additional Info': (
        <div className="additional_info">
          <div className="addInfoText">
            <Text type="secondary">Date of Enrollment: </Text>
            <p>
              {memberInfo.date_of_enrollment
                ? memberInfo.date_of_enrollment
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Flag</Text>
            <p>{memberInfo.flag ? memberInfo.flag : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Flag Level</Text>
            <p>{memberInfo.flag_level ? memberInfo.flag_level : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Length of Stay:</Text>
            <p>{memberInfo.length_of_stay ? memberInfo.length_of_stay : ''}</p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">School: </Text>
            <p>
              {memberInfo.schools.attendance_status
                ? memberInfo.schools.attendance_status
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">School Name: </Text>
            <p>
              {memberInfo.schools.school_name
                ? memberInfo.schools.school_name
                : ''}
            </p>
          </div>
          <div className="addInfoText">
            <Text type="secondary">Mc Kinney School:</Text>
            <p>
              {memberInfo.schools.mckinney_school
                ? memberInfo.schools.mckinney_school
                : ''}
            </p>
          </div>
        </div>
      ),
    };
  }

  return (
    <div>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={tab.noTitleKey}
        onTabChange={key => {
          onTabChange(key, 'noTitleKey');
        }}
      >
        {contentListNoTitle[tab.noTitleKey]}
      </Card>
    </div>
  );
};

export default GuestMoreInfo;
