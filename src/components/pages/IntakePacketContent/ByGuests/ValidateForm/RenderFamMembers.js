import React from 'react';

const RenderFamilyMembers = ({ member }) => {
  const { demographic, race, barriers, schools } = member;

  return (
    <div>
      <h3>Family Members</h3>
    </div>
  );
};

export default RenderFamilyMembers;
