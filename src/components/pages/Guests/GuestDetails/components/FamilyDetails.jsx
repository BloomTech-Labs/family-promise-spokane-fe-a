import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

const FamilyDetails = ({ familyId }) => {
  const [membersInfo, setMembersInfo] = useState([]);

  const fetchMembersInfo = async familyId => {
    try {
      const data = await axiosWithAuth()
        .get(`/families/${familyId}/members`)
        .then(res => res.data);

      const formattedData = data.map(member => ({ ...member.demographics }));
      setMembersInfo(formattedData);
    } catch (error) {
      console.log('error FamilyDetail.jsx 9');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMembersInfo(familyId);
  }, []);

  return (
    <div>
      <h2>Family Details Placeholder</h2>
    </div>
  );
};

export default FamilyDetails;
