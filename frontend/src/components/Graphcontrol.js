import React, { useState } from 'react';
import download from '../images/download.png';
import copy from '../images/copy.png';
import reset from '../images/reset.png';
import refine from '../images/refine.png';
import line from '../images/line.png';
import grouped from '../images/groupedbar.png';
import horizontal from '../images/horizontal.png';
import stacked from '../images/stacked.png';
import '../styles/components/GraphController.css';


const Graphcontrol = () => {
    const [showButtons, setShowButtons] = useState(false);
  

  const handleFormat = () => {
    setShowButtons(!showButtons);
  };

    return (
        <div className="chartControls">
        
        <button className="controlButtons">
           {/* <a href='chart.png' download={chart}> */}
              <span className="tooltip">Download</span>
              <img src={download} alt="Download" className="controlsIcon"></img>
            {/* </a> */}
        </button>
        
        <button className="controlButtons">
            <span className="tooltip">Copy</span>
            <img src={copy} alt="Copy" className="controlsIcon"></img>
        </button>
        <button className="controlButtons">
            <span className="tooltip">Reset</span>
            <img src={reset} alt="Reset" className="controlsIcon"></img>
        </button>
        <button className="controlButtons">
            <span className="tooltip">Line (Click to Change)</span>
            <img src={line} alt="Line Format" className="controlsIcon" onClick={handleFormat}></img>
        </button>
        <button className="controlButtons">
            <img src={refine} alt="Refine" className="refineIcon"></img>
        </button>

        {showButtons && (
          <div className="formatChange">
            <button className="controlButtons">
              <span className="tooltip">Line</span>
              <img src={line} alt="Line" className="controlsIcon"></img>
            </button>
            <button className="controlButtons">
                <span className="tooltip">Horizontal</span>
                <img src={horizontal} alt="Horizontal" className="controlsIcon" ></img>
            </button>
            <button className="controlButtons">
              <span className="tooltip">Stacked</span>
              <img src={stacked} alt="Stacked" className="controlsIcon"></img>
            </button>
            <button className="controlButtons">
                <span className="tooltip">Grouped</span>
                <img src={grouped} alt="Grouped" className="controlsIcon" ></img>
            </button>
          </div>
        )}

      </div>
    );
};

export default Graphcontrol;