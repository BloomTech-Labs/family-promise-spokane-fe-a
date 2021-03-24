import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import GuestNotes from './components/GuestNotes';
import GuestMoreInfo from './components/GuestMoreInfo';

import { Button, Card, Typography } from 'antd';
const { Title } = Typography;

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
        <p>Family Info</p>
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
    <div>
      <Title level={3}>Guest Detail Placeholder</Title>
      <Card
        style={{ width: '100%' }}
        title="Card title"
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
