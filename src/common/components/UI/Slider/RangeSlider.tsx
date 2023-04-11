import React from 'react';
import Slider from '@mui/material/Slider';
import './RangeSlider.scss';

interface Props {
  label: string;
  min: number;
  minFixed: number;
  max: number;
  maxFixed: number;
  step: number;
  minDistance: number;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<Props> = ({
  label,
  min,
  minFixed,
  max,
  maxFixed,
  step,
  minDistance,
  onChange,
}) => {
  const marks = [
    { value: min, label: min },
    { value: max, label: max },
  ];

  let newMin: number = min;
  let newMax: number = max;

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {
      newMin = Math.min(newValue[0], max - minDistance);
    } else {
      newMax = Math.max(newValue[1], min + minDistance);
    }

    onChange(newMin, newMax);
  };

  return (
    <div className='range-slider'>
      {label}
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={[newMin, newMax]}
        step={step}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={minFixed}
        max={maxFixed}
        disableSwap
      />
    </div>
  );
};

export default RangeSlider;
