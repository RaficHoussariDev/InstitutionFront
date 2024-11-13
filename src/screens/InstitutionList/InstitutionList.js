import React, {useEffect, useState} from 'react';
import './InstitutionList.css';
import {getInstitutions} from "../../services/institutionService";
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

function InstitutionList() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getInstitutions().then((response) => {
            setInstitutions(response);
            setIsLoading(false);
        }).catch(() => {
            toast.error("Unable to get institutions! Try again later.");
            setIsLoading(false);
        });
    }, []);

    const dropdownOptions = institutions.map((institution) => ({
        value: institution.id,
        label: institution.name,
    }));

    function onSelectInstitution(selectedOptions) {
        setSelectedInstitutions(selectedOptions);
    }

    function onCheckedActiveOnly() {
        setShowActiveOnly(!showActiveOnly);
    }

    const filteredInstitutions = selectedInstitutions.length
        ? institutions.filter(institution =>
            selectedInstitutions.some(selected => selected.value === institution.id)
        )
        : institutions;

    const finalFilteredInstructions = showActiveOnly
        ? filteredInstitutions.filter(institution => institution.isActive)
        : filteredInstitutions;

    function renderStatus(isActive) {
        return isActive
            ? (<span className="status-circle active" title="Active"></span>)
            : (<span className="status-circle inactive" title="Inactive"></span>);
    }

    if(isLoading) {
        return (
            <div className="loader-container">
                <CustomLoader />
            </div>
        );
    }

    return (
        <div className="institution-list-container">
            <h2>Institutions</h2>

            <div className="filter-container">
                <CustomDropdown
                    options={dropdownOptions}
                    placeholder="Search and select an institution"
                    isSearchable
                    isMulti
                    value={selectedInstitutions}
                    onChange={onSelectInstitution}
                />
                <div className="checkbox-filter-container">
                    <label>
                        <input
                            type="checkbox"
                            checked={showActiveOnly}
                            onChange={onCheckedActiveOnly}
                        />
                        Show Active Institutions Only
                    </label>
                </div>
            </div>

            <table className="institution-table">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {finalFilteredInstructions.map((institution, index) => (
                        <tr key={index}>
                            <td>{institution.code}</td>
                            <td>{institution.name}</td>
                            <td>{renderStatus(institution.isActive)}</td>
                            <td>
                                <CustomButton title="Edit" width="50%" />
                            </td>
                            <td>
                                <CustomButton title="Delete" backgroundColor="red" width="50%" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ToastContainer/>
        </div>
    );
}

export default InstitutionList;