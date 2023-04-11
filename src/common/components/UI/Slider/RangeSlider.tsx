import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import './RangeSlider.scss';

interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  minDistance: number;
  onChange: (min: number, max: number) => void;
}

const RangeSlider: React.FC<Props> = ({ label, min, max, step, minDistance, onChange }) => {
  const [value, setValue] = useState<number[]>([min, max]);

  const marks = [
    { value: min, label: min },
    { value: max, label: max },
  ];

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], max - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], min + minDistance)]);
    }

    console.log('🚀 ~ file: RangeSlider.tsx:35 ~ handleChange ~ value:', value);
    onChange(value[0], value[1]);
  };

  return (
    <div className='range-slider'>
      {label}
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        step={step}
        marks={marks}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        disableSwap
      />
    </div>
  );
};

export default RangeSlider;
