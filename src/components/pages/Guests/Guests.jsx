import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MaterialTable from 'material-table';

import PeopleIcon from '@material-ui/icons/People';
import { Paper } from '@material-ui/core';

import './guest.css';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { tableIcons } from '../../../utils/tableIcons';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from './GuestDetails/components/GuestNotes';
import LoadingComponent from '../../common/LoadingComponent';
import GuestMoreInfo from './GuestDetails/components/GuestMoreInfo';

Modal.setAppElement('#root');

const TitleStyled = styled.div`
  h1 {
    margin-top: 2%;
    margin-left: 11%;
  }
`;

const Guests = () => {
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
      { title: 'Reservation', field: '0.reservation_status' },
      { title: 'Checked In', field: '0.on_site_7pm' },
    ],
    data: [],
  });

  const history = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        console.log(res.data);
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            ...member.check_in,
            flag_level: 0,
            ...member,
          };
        });
        copy.data = formattedData;
        console.log(copy);

        setState(copy);
      })
      .catch(err => {
        alert('error');
      })
      .finally(() => {
        if (loading) {
          setLoading(false);
        }
      });

    console.log(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setResult(null);
  };

  //TODO will have to set result to empty when done with modal

  return (
    <TitleStyled>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {result ? <GuestMoreInfo familyInfo={result} /> : ''}
      </Modal>
      <h1>Guests</h1>
      <div className="guest-table-container">
        {isNotesOpen && <GuestNotes setIsNotesOpen={setIsNotesOpen} />}
        {isFlagOpen && (
          <FlagGuest
            setIsFlagOpen={setIsFlagOpen}
            setState={setState}
            guestId={guestId}
          />
        )}
        <div className="guest-table">
          <MaterialTable
            components={{
              Container: props => <Paper {...props} elevation={0} />,
            }}
            options={{
              exportButton: true,
              rowStyle: rowData => ({
                backgroundColor:
                  rowData.flag_level === 2
                    ? 'rgba(255, 255, 0, 0.419)'
                    : rowData.flag_level === 3
                    ? 'rgba(255, 0, 0, 0.418)'
                    : 'white',
              }),
            }}
            icons={tableIcons}
            title=""
            columns={state.columns}
            data={state.data}
            elevation={0}
            actions={[
              {
                icon: PeopleIcon,
                tooltip: 'Guest Details',
                onClick: (event, rowData) => {
                  console.log(rowData);
                  history.push(`/guests/${rowData.id}`);
                },
              },
            ]}
          />
        </div>
      </div>
    </TitleStyled>
  );
};

export default Guests;
