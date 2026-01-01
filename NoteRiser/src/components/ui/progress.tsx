import React from 'react';

type Props = { value?: number; max?: number };

export const Progress: React.FC<Props> = ({ value = 0, max = 100 }) => (
  <progress value={value} max={max} />
);

export default Progress;
