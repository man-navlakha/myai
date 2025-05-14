import React from 'react';

const WaveVisualizer: React.FC = () => {
  return (
    <div className="absolute inset-0  rounded-xl flex overflow-hidden justify-center items-center z-2">
    <div className="flex sea">
      {Array.from({ length: 50 }).map((_, i) => (
        <div className="wave" key={i}>
          <div className="wave_fade" style={{ animationDelay: `${i * -30}ms` }}>
            <div className="wave_translate" style={{ animationDelay: `${i * -30 - 1000}ms` }}>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
                <div className="wave_graphic"></div>
              </div>
                <div className="wave_graphic"></div>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
              </div>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
                <div className="wave_graphic"></div>
              </div>
                <div className="wave_graphic"></div>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
              </div>
                <div className="wave_graphic"></div>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
              </div>
                <div className="wave_graphic"></div>
              <div className="wave_skew" style={{ animationDelay: `${i * -20}ms` }}>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default WaveVisualizer;