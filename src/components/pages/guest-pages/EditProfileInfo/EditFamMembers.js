import React from 'react';
import { Typography } from 'antd';
import { Form, Input } from 'antd';

const { Title } = Typography;

const RenderFamilyMembers = ({ member }) => {
  const { demographics, barriers, schools } = member;
  console.log(member);

  const handleChange = () => {
    console.log('changing');
  };

  const submitChanges = () => {
    console.log('submit');
  };

  return (
    <div>
      <Title level={5}>Basic Information</Title>
      <div className="formDiv basic-info">
        <Form onSubmit={submitChanges} layout={'inline'}>
          <Form.Item label="Gender:">
            <Input
              name="gender"
              type="text"
              value={demographics.gender}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Relationship:">
            <Input
              name="gender"
              type="text"
              value={demographics.relationship}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Date of Birth:">
            <Input
              name="gender"
              type="text"
              value={demographics.DOB}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Monthly Income">
            <Input
              name="gender"
              type="text"
              value={demographics.income}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </div>
      <Title level={5}>Barriers</Title>
      <div className="formDiv barriers">
        <Form onSubmit={submitChanges} layout={'inline'}>
          <Form.Item label="Alcohol Abuse">
            <Input
              name="gender"
              type="text"
              value={barriers.alcohol_abuse ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Chronic health issues">
            <Input
              name="chronic_issues"
              type="text"
              value={barriers.chronic_health_issues ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Drug abuse">
            <Input
              name="drug_abuse"
              type="text"
              value={barriers.drug_abuse ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="HIV/AIDS">
            <Input
              name="hiv"
              type="text"
              value={barriers.HIV_AIDs ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Menatal Illness">
            <Input
              name="mental_illness"
              type="text"
              value={barriers.mental_illness ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Physical Disabilities">
            <Input
              name="physical_disabilities"
              type="text"
              value={barriers.physical_disabilities ? 'Yes' : 'No'}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </div>
      {demographics.relationship === 'Child' && (
        <>
          <Title level={5}>Education:</Title>
          <div className="formDiv education">
            <form onSubmit={submitChanges}>
              <label>
                Highest Completed Grade:
                <input
                  name="grade_completed"
                  type="text"
                  value={schools.highest_grade_completed}
                  onChange={handleChange}
                />
              </label>
              <label>
                Are they currently enrolled:
                <input
                  name="currently_enrolled"
                  type="text"
                  value={schools.enrolled_status ? 'Yes' : 'No'}
                  onChange={handleChange}
                />
              </label>
              {!schools.enrolled_status && (
                <label>
                  Reason they are not Enrolled:
                  <input
                    name="enrolled"
                    type="text"
                    value={schools.reason_not_enrolled}
                    onChange={handleChange}
                  />
                </label>
              )}
              {schools.enrolled_status && (
                <>
                  <label>
                    Attendance Status:
                    <input
                      name="attendance"
                      type="text"
                      value={schools.attendance_status}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Type of School:
                    <input
                      name="school_type"
                      type="text"
                      value={schools.school_type}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Name of School:
                    <input
                      name="school_name"
                      type="text"
                      value={schools.school_name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Is the school associated with McKinney:
                    <input
                      name="school_associations"
                      type="text"
                      value={schools.mckinney_school ? 'Yes' : 'No'}
                      onChange={handleChange}
                    />
                  </label>
                </>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RenderFamilyMembers;
