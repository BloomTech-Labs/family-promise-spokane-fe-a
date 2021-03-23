import React, { useState } from 'react';
import { Form, Input, Select, Radio, Button } from 'antd';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const RenderFamilyMembers = ({ member }) => {
  const { demographics, barriers, schools } = member;

  console.log(member);
  const [editFormValues, setEditFormValues] = useState({
    income: demographics.income,
    employer: demographics.employer,
    highest_grade_completed: schools.highest_grade_completed,
    enrolled_status: schools.enrolled_status,
    attendance_status: schools.attendance_status,
    school_type: schools.school_type,
    school_name: schools.school_name,
    mckinney_school: schools.mckinney_school,
  });

  const handleChange = e => {
    setEditFormValues({
      ...editFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const submitChanges = e => {
    console.log('hit submit');
    e.preventDefault();
    axiosWithAuth()
      .put(`/members/${member.id}`, editFormValues)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form onSubmitCapture={submitChanges}>
        <h2>Work</h2>
        <Form.Item label="Monthly Income">
          <Input
            name="income"
            type="text"
            value={editFormValues.income}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Emplyoyer:">
          <Input
            name="employer"
            type="text"
            value={editFormValues.employer}
            onChange={handleChange}
          />
        </Form.Item>
        <h2>School</h2>
        <Form.Item label="Highest Completed Grade:">
          <Input
            name="highest_grade_completed"
            type="text"
            value={editFormValues.highest_grade_completed}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Are they currently enrolled:">
          <Radio.Group
            name="enrolled_status"
            value={editFormValues.enrolled_status}
            onChange={handleChange}
          >
            <Radio value={true}>True</Radio>
            <Radio value={false}>False</Radio>
          </Radio.Group>
        </Form.Item>
        {schools.enrolled_status && (
          <>
            <Form.Item label="Attendance Status:">
              <Input
                name="attendance_status"
                type="text"
                value={editFormValues.attendance_status}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Type of School:">
              <Input
                name="school_type"
                type="text"
                value={editFormValues.school_type}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="School Name:">
              <Input
                name="school_name"
                type="text"
                value={editFormValues.school_name}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Is the school associated with McKinney:">
              <Radio.Group
                name="mckinney_school"
                value={editFormValues.mckinney_school}
                onChange={handleChange}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
          </>
        )}
        <Button onClick={submitChanges}>Edit</Button>
      </Form>
    </div>
  );
};

export default RenderFamilyMembers;
