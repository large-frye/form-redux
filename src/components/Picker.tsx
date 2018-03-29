import * as React from 'react';

interface IPicker { value: string, onChange: any, options: any }

const Picker = ({ value, onChange, options }: IPicker) => (
  <span>
    <h1>{value}</h1>
    <select onChange={e => onChange(e.target.value)}
            value={value}>
      {options.map((option: any) =>
        <option value={option} key={option}>
          {option}
        </option>)
      }
    </select>
  </span>
)

export default Picker