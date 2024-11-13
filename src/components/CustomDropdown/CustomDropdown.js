import Select from "react-select";

function CustomDropdown({ options, placeholder, isSearchable, isMulti, value, onChange }) {
    return (
        <Select
            options={options}
            placeholder={placeholder}
            isSearchable={isSearchable}
            isMulti={isMulti}
            value={value}
            onChange={onChange}
        />
    );
}

export default CustomDropdown;