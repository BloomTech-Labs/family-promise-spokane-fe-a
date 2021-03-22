import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import EditFamMembers from './EditFamMembers';
import { connect, useSelector } from 'react-redux';
import actions from '../../../../state/actions/families';
import styled from 'styled-components';

const EditGuestInformation = ({ fetchHousehold, fetchMembers }) => {
  const [familyInfo, setFamilyInfo] = useState({});
  const [membersInfo, setMembersInfo] = useState({});

  const user = useSelector(state => state.CURRENT_USER);

  const fetchFamilyHousehold = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);
      const family = res.data.family;
      setFamilyInfo(family);
      fetchHousehold(family.id);
    } catch (error) {
      alert('error');
    }
  };

  const fetchMembersData = async () => {
    try {
      const res = await axiosWithAuth().get(
        `/families/${familyInfo.id}/members`
      );
      console.log('Members ', res.data);
      setMembersInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFamilyHousehold();
    // eslint-disable-next-line
  }, []);
  console.log('state ', familyInfo);

  useEffect(() => {
    fetchMembersData();
  }, [familyInfo, fetchMembersData]);

  const StyledEditForm = styled.div`
    max-width: 750px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  `;

  return (
    <StyledEditForm>
      {Object.keys(membersInfo).map((member, key) => {
        return (
          <>
            <h2>
              {membersInfo[member].demographics.first_name}{' '}
              {membersInfo[member].demographics.last_name}
            </h2>
            <EditFamMembers member={membersInfo[member]} key={key} />
          </>
        );
      })}
    </StyledEditForm>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    household: state.HOUSEHOLD,
    loading: state.LOADING,
    family: state.FAMILY,
  };
}

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchMembers: actions.fetchMembers,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGuestInformation);
