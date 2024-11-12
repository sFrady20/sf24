import "./sunlight.css";

export const Sunlight = function (props: {}) {
  return (
    <div id="dappled-light">
      <div id="glow"></div>
      <div id="glow-bounce"></div>
      <div className="perspective">
        <div id="leaves">
          <svg style={{ width: 0, height: 0, position: "absolute" }}>
            <defs>
              <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
                  <animate
                    attributeName="baseFrequency"
                    dur="16s"
                    keyTimes="0;0.33;0.66;1"
                    values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic">
                  <animate
                    attributeName="scale"
                    dur="20s"
                    keyTimes="0;0.25;0.5;0.75;1"
                    values="45;55;75;55;45"
                    repeatCount="indefinite"
                  />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>
        </div>
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
