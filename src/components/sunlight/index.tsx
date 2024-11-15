import { Leaves } from "./leaves";
import "./sunlight.css";

export const Sunlight = function (props: {}) {
  return (
    <div id="dappled-light">
      <div id="glow"></div>
      <div id="glow-bounce"></div>
      <div className="perspective">
        {/* <Leaves /> */}
        <div id="blinds">
          <div className="shutters">
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
            <div className="shutter"></div>
          </div>
          <div className="vertical">
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div id="progressive-blur">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
