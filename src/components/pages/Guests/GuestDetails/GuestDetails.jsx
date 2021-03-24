import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import GuestNotes from './components/GuestNotes';
import GuestMoreInfo from './components/GuestMoreInfo';
import Family from '../../FamilyMembers/Family';
import FamilyDetails from './components/FamilyDetails';

import { Button, Card } from 'antd';

const GuestDetails = () => {
  const history = useHistory();
  const params = useParams();
  //User ID
  const { id } = params;

  const [memberInfo, setMemberInfo] = useState({});
  const [tabCard, setTabCard] = useState({
    key: 'tab4',
  });

  useEffect(() => {
    axiosWithAuth()
      .get(`/members/${id}`)
      .then(res => {
        setMemberInfo(res.data);
      })
      .catch(err => {
        alert('error');
        console.log(err.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTabChange = (key, type) => {
    setTabCard({ [type]: key });
  };

  const tabList = [
    {
      key: 'tab1',
      tab: 'Guest Info',
    },
    {
      key: 'tab2',
      tab: 'Family Info',
    },
    {
      key: 'tab3',
      tab: 'Flag Guest',
    },
    {
      key: 'tab4',
      tab: 'Notes',
    },
  ];

  const contentList = {
    tab1: (
      <div className="tabContainer">
        <GuestMoreInfo memberInfo={memberInfo} />
      </div>
    ),
    tab2: (
      <div className="tabContainer">
        <Family familyId={memberInfo.family_id} />
        <FamilyDetails familyId={memberInfo.family_id} />
      </div>
    ),
    tab3: (
      <div className="tabContainer">
        <p>Flag Guest</p>
      </div>
    ),
    tab4: (
      <div className="tabContainer">
        <GuestNotes memberInfo={memberInfo} />
      </div>
    ),
  };

  console.log(memberInfo);

  return (
    <div style={{ marginLeft: '14%' }}>
      <Card
        style={{ width: '80%', margin: '5% auto' }}
        title="Guest and Family Details"
        extra={
          <Button type="primary" onClick={() => history.push('/guests')}>
            Back To Guest Dash
          </Button>
        }
        tabList={tabList}
        activeTabKey={tabCard.key}
        onTabChange={key => {
          onTabChange(key, 'key');
        }}
      >
        {contentList[tabCard.key]}
      </Card>
    </div>
  );
};

export default GuestDetails;
