import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Collapse, Button, Checkbox } from 'antd';

import Welcome from './Welcome';
import ShelterSchedule from './ShelterSchedule';
import Inside from './Inside';
import Outside from './Outside';
import NightShelter from './NightShelter';
import Important from './Important';
import Resources from './Resources';

const { Panel } = Collapse;

const RenderShelterInfo = () => {
  const history = useHistory();
  const [hasRead, setHasRead] = useState({
    welcome: false,
    shelterSchedule: false,
    inside: false,
    outside: false,
    nightShleter: false,
    important: false,
    resources: false,
  });
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const changeHandler = e => {
    setHasRead({
      ...hasRead,
      [e.target.name]: !hasRead[e.target.name],
    });
    console.log(hasRead);
  };

  const buttonHandler = e => {};

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>
        Welcome To Family Promise of Spokane County. Here's some useful
        information.
      </h2>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Welcome" key="1">
          <Welcome />
          <Checkbox
            name="welcome"
            checked={hasRead.welcome}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="ShelterSchedule" key="2">
          <ShelterSchedule />
          <Checkbox
            name="shelterSchedule"
            checked={hasRead.shelterSchedule}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="Inside" key="3">
          <Inside />
          <Checkbox
            name="inside"
            checked={hasRead.inside}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="Outside" key="4">
          <Outside />
          <Checkbox
            name="outside"
            checked={hasRead.outside}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="NightShelter" key="5">
          <NightShelter />
          <Checkbox
            name="nightShelter"
            checked={hasRead.nightShelter}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="Important" key="6">
          <Important />
          <Checkbox
            name="important"
            checked={hasRead.important}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
        <Panel header="Resources" key="7">
          <Resources />
          <Checkbox
            name="resources"
            checked={hasRead.resources}
            onChange={changeHandler}
          >
            I have read and understand.
          </Checkbox>
        </Panel>
      </Collapse>
      <Button type="primary" onClick={() => history.push('/login')}>
        Return To Login
      </Button>
    </div>
  );
};

export default RenderShelterInfo;
