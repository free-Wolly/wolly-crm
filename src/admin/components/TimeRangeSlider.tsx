import React, { useState, useEffect } from 'react';
import { useField } from 'payload/components/forms';

const TimeRangeSlider: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<{ startTime: number; endTime: number }>({ path });
  const [range, setRange] = useState([value?.startTime || 0, value?.endTime || 24]);

  useEffect(() => {
    if (value?.startTime !== undefined && value?.endTime !== undefined) {
      setRange([value.startTime, value.endTime]);
    }
  }, [value]);

  const handleChange = (newRange: number[]) => {
    setRange(newRange);
    setValue({ startTime: newRange[0], endTime: newRange[1] });
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time % 1) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={24}
        step={0.5}
        value={range[0]}
        onChange={(e) => handleChange([parseFloat(e.target.value), range[1]])}
      />
      <input
        type="range"
        min={0}
        max={24}
        step={0.5}
        value={range[1]}
        onChange={(e) => handleChange([range[0], parseFloat(e.target.value)])}
      />
      <div>
        Start: {formatTime(range[0])} - End: {formatTime(range[1])}
      </div>
    </div>
  );
};

export default TimeRangeSlider;