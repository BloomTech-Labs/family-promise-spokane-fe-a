import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { axiosWithAuth } from '../../../../api/axiosWithAuth';

import { Button, Card } from 'antd';

const GuestDetails = () => {
  const history = useHistory();
  const params = useParams();
  //User Id
  const { id } = params;

  const [memberInfo, setMemberInfo] = useState({});
  const [tabCard, setTabCard] = useState({
    key: 'tab1',
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
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };

  return (
    <div>
      <h1>Guest Detail Placeholder</h1>
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
