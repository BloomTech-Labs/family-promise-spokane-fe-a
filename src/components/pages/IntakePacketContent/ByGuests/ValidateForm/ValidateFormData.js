import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
import { getDocuSignUrl } from '../../../../../state/actions/index';

import { Progress, Button } from 'antd';

import RenderFormData from './RenderFormData';

import '../../../../../styles/IntakePacket/_validate-form-data.scss';

const ValidateFormData = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
  steps,
  step,
}) => {
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  //docusign
  const signerInfo = useSelector(state => state.SIGNER_INFORMATION);
  let envelopeArgs = {
    signer1Email: signerInfo.email,
    signer1Name: signerInfo.first_name + ' ' + signerInfo.last_name,
    signer1Id: signerInfo.id,
  };
  const [loadDocuSign, setLoadDocusign] = useState(false);
  const { familyInfo, familyMember } = formData;
  const { previous } = navigation;
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadDocuSign) {
      history.push('/redirect');
    }
  }, [history, loadDocuSign]);

  //Helpers
  function callDocusign() {
    // Saves family information so it does not get deleted after redirecting
    axiosWithAuth()
      .post(`/families`, familyInfo)
      .then(res => {
        const familyId = res.data.families.id;
        Object.keys(formData.familyMember).map(mem => {
          familyMember[mem]['family_id'] = familyId;
          axiosWithAuth()
            .post('/members', familyMember[mem])
            .then(res => console.log('Members added', res.data))
            .catch(err => {
              console.log('MemberError', err.response);
            });
        });
        // This axios post request calls the eg001.createController function in the backend
        axios
          .post('http://localhost:8000/callDS', envelopeArgs)
          .then(res => {
            setLoadDocusign(!loadDocuSign);
            dispatch(getDocuSignUrl(res.data));
          })
          .catch(err => console.log('DocuSign error', err));
      })
      .catch(err => {
        console.log('FamiliesError', err);
      });
  }

  const redirectToDocusign = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/callDS',
        envelopeArgs
      );
      setLoadDocusign(!loadDocuSign);
      dispatch(getDocuSignUrl(res.data));
    } catch (error) {
      console.log('Error in load docusign', error);
    }
  };

  return (
    <div style={tempFormStyle}>
      <h2>Placeholder for Data Validation</h2>
      <Progress percent={percent} status="active" showInfo={false} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <Button
          type="primary"
          htmlType="button"
          onClick={previous}
          style={{ width: '100px' }}
        >
          Previous
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={callDocusign}
          style={{ width: '100px' }}
        >
          Next
        </Button>
      </div>
      <div className="formDataContainer">
        <RenderFormData formData={formData} signerInfo={signerInfo} />
      </div>
    </div>
  );
};

export default ValidateFormData;
