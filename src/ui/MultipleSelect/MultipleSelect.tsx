/* eslint-disable @typescript-eslint/no-explicit-any */
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { IOptions } from '../../types';

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: '15px',
  }),
};

const customStylesColor: StylesConfig<IOptions, true> = {
  control: (styles) => ({ ...styles, borderRadius: '15px', backgroundColor: 'white', minWidth: '250px' }),
  option: (styles, { data, isDisabled, isSelected }) => {
    const color = chroma(data.color as string);
    return {
      ...styles,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color as string);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  // multiValueLabel: (styles, { data }) => ({
  //   ...styles,
  //   color: data.color,
  // }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};


const MultipleSelect = ({ isCustomColor = false, ...props }: any) => (
  <Select
    noOptionsMessage={() => 'Нет доступных значений'}
    closeMenuOnSelect={false}
    isMulti
    styles={isCustomColor ? customStylesColor : customStyles}
    {...props}
  />
);

export default MultipleSelect;
