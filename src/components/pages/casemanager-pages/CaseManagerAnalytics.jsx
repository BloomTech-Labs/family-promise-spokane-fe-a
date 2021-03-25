import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
//import { useHistory } from 'react-router-dom';
import { tableIcons } from '../../../utils/tableIcons';

// import { CopyrightOutlined } from '@material-ui/icons';
import Modal from 'react-modal';
import '../Guests/guest.css';
// import { CardContent, Card } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

import Visuals from './Visuals';
Modal.setAppElement('#root');

const CaseAnalytics = () => {
  const [guestId, setGuestId] = useState(null);
  // const [result, setResult] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  const [age, setAge] = useState({});
  const [members, setMembers] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
      { title: 'Guest Id', field: 'id' },
    ],
    data: [],
  });

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.id,
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            flag_level: 0,
            ...member,
          };
        });

        copy.data.push(...formattedData);

        setState(copy);
      })
      .catch(err => {
        alert('error in fetch for members');
      });
  }, [state]);

  const runVisualization = guestId => {
    console.log(guestId);
    if (guestId === null) {
      alert('You must choose ONE family member by clicking checkbox');
    }
    axiosWithAuth()
      .get(
        `http://omar-zaffar.eba-rpnihjrj.us-east-1.elasticbeanstalk.com/Visualizations/${guestId}`
      )
      .then(response => {
        console.log('im parsed', JSON.parse(response.data[0]));
        setEnrolled(JSON.parse(response.data[0]));
        setAge(JSON.parse(response.data[1]));
        setMembers(JSON.parse(response.data[2]));
      })
      .catch(err => {
        console.log(err);
        alert('error in DS API ');
      });
  };

  return (
    <>
      <div className="guest-table-container">
        <div className="guest-table">
          <h1>Case Manager Analytics</h1>
          <MaterialTable
            options={{
              exportButton: true,
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.flag_level == 2
                    ? 'rgba(255, 255, 0, 0.419)'
                    : rowData.flag_level == 3
                    ? 'rgba(255, 0, 0, 0.418)'
                    : 'white',
              }),
            }}
            icons={tableIcons}
            title="Guests"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: Checkbox,
                tooltip: 'Select One Guest',
                onClick: (event, rowsData) => {
                  setGuestId(state.data[rowsData.id - 1].id);
                },
              },
              //console.log(guestId)
            ]}
          />
          <div>
            <button onClick={() => runVisualization(guestId)}>
              Run Visualization
            </button>
          </div>
          <div>
            {!(
              Object.keys(members).length === 0 &&
              members.constructor === Object
            ) && <Visuals days={enrolled} current={age} family={members} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseAnalytics;
