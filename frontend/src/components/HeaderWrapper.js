import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const HeaderWrapper = ({ userName }) => {
  const { projectId } = useParams();  // get projectId from route params
  console.log("id in headerwrapper" + projectId)

  return <Header userName={userName} projectID={projectId} />;
};

export default HeaderWrapper;
