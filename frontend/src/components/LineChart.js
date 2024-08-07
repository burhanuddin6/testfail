// src/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = ({ data = {} }) => {
  const defaultData = {
    labels: [],
    passed: [],
    blocked: [],
    retest: [],
    failed: [],
    comments: [],
    partial: [],
  };

  // Ensure data has default structure
  const actualData = { ...defaultData, ...data };

  const sum_passed = actualData.passed.reduce((acc, val) => acc + val, 0);
  const sum_blocked = actualData.blocked.reduce((acc, val) => acc + val, 0);
  const sum_retest = actualData.retest.reduce((acc, val) => acc + val, 0);
  const sum_failed = actualData.failed.reduce((acc, val) => acc + val, 0);
  const sum_comments = actualData.comments.reduce((acc, val) => acc + val, 0);
  const sum_partial = actualData.partial.reduce((acc, val) => acc + val, 0);

  const total_cases = sum_blocked + sum_comments + sum_failed + sum_partial + sum_passed + sum_retest;

  const passed_percent = Math.round((sum_passed / total_cases) * 100);
  const blocked_percent = Math.round((sum_blocked / total_cases) * 100);
  const retest_percent = Math.round((sum_retest / total_cases) * 100);
  const failed_percent = Math.round((sum_failed / total_cases) * 100);
  const comments_percent = Math.round((sum_comments / total_cases) * 100);
  const partial_percent = Math.round((sum_partial / total_cases) * 100);

  const chartData = {
    labels: actualData.labels,
    datasets: [
      {
        label: `${sum_passed} Passed (${passed_percent}% set to Passed)`,
        data: actualData.passed,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: false,
      },
      {
        label: `${sum_blocked} Blocked (${blocked_percent}% set to Blocked)`,
        data: actualData.blocked,
        borderColor: 'gray',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        fill: false,
      },
      {
        label: `${sum_retest} Retest (${retest_percent}% set to Retest)`,
        data: actualData.retest,
        borderColor: 'yellow',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        fill: false,
      },
      {
        label: `${sum_failed} Failed (${failed_percent}% set to Failed)`,
        data: actualData.failed,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: false,
      },
      {
        label: `${sum_comments} Comments (${comments_percent}% set to Comments)`,
        data: actualData.comments,
        borderColor: 'purple',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        fill: false,
      },
      {
        label: `${sum_partial} Partial (${partial_percent}% set to Partial)`,
        data: actualData.partial,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'In the past 5 Days',
      },
    },
  };

  return <Line data={chartData} options={options}/>;
};

export default LineChart;