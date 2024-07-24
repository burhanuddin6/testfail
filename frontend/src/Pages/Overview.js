import React from 'react';
import Graph from '../components/Graph';
import '../styles/Overview.css';


const Overview = () => {
  return (
    <main className="overview">
      <h2>Privaci</h2>
      <Graph />
      <div className="summary">
        <span>1146 Passed</span>
        <span>7 Blocked</span>
        <span>2 Retest</span>
        <span>22 Failed</span>
        <span>3 Comments</span>
        <span>34 Partial</span>
      </div>
    </main>
  );
}

export default Overview;
