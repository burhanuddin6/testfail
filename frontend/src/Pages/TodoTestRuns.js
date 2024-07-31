import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // import all exports from echarts
import '../styles/TodoTestRuns.css';

const data = [
  { name: 'Passed', value: 95, fill: '#4CAF50' },
  { name: 'Failed', value: 1, fill: '#FF0000' },
  { name: 'Untested', value: 126, fill: '#CCCCCC' },
];

const TodoTestRuns = () => {
  const chartDom = useRef(null); // create a ref for the chart container

  useEffect(() => {
    const chart = echarts.init(chartDom.current); // initialize the chart
    const option = {
      series: [
        {
          type: 'pie',
          radius: '50%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
    chart.setOption(option); // set the chart options
  }, [chartDom]);

  return (
    <div className="testruns-results">
      <div className="testruns-results-header">
        <h1>Test Runs & Results</h1>
        <div className="filter-options">
          <button className="filter-button">All</button>
          <button className="filter-button">Filter</button>
        </div>
      </div>
      <div className="testruns-results-content">
        <div className="test-results-summary">
          <h2>42% passed</h2>
          <p>126/225 untested (56%).</p>
          <div ref={chartDom} style={{ width: 200, height: 200 }} /> {/* render the chart */}
        </div>
        <div className="test-cases-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Assigned To</th>
                <th>Defects</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>T2205</td>
                <td>Tickets are listed in grid.</td>
                <td>Zainab T.</td>
                <td>0</td>
                <td>Untested</td>
              </tr>
              <tr>
                <td>T2206</td>
                <td>Tickets are sortable on all fields.</td>
                <td>Zainab T.</td>
                <td>0</td>
                <td>Untested</td>
              </tr>
              <tr>
                <td>T2207</td>
                <td>Clicking on ticket opens up ticket's workspace.</td>
                <td>Zainab T.</td>
                <td>0</td>
                <td>Untested</td>
              </tr>
              <tr>
                <td>T2208</td>
                <td>Allow users to filter tickets based on type.</td>
                <td>Zainab T.</td>
                <td>0</td>
                <td>Passed</td>
              </tr>
              <tr>
                <td>T2209</td>
                <td>User can apply filter based on request type.</td>
                <td>Zainab T.</td>
                <td>0</td>
                <td>Passed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoTestRuns;