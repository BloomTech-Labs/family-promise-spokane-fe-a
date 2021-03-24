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
    noTitleKey: 'app',
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
      tab: 'tab1',
    },
    {
      key: 'tab2',
      tab: 'tab2',
    },
  ];

  const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
  };

  const tabListNoTitle = [
    {
      key: 'article',
      tab: 'article',
    },
    {
      key: 'app',
      tab: 'app',
    },
    {
      key: 'project',
      tab: 'project',
    },
  ];

  const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>,
  };

  return (
    <div>
      <h1>Guest Detail Placeholder</h1>
      <Button type="primary" onClick={() => history.push('/guests')}>
        Back To Guest Dash
      </Button>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
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
