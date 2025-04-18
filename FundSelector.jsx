import React from 'react';
import Select from 'react-select';

export default function FundSelector({ options, value, onChange }) {
  return (
    <Select
      isMulti
      options={options.map(f => ({ value: f.id, label: f.name }))}
      value={options
        .filter(f => value.includes(f.id))
        .map(f => ({ value: f.id, label: f.name }))}
      onChange={selected =>
        onChange(selected.map(item => item.value))
      }
      placeholder="Select funds…"
    />
  );
}
