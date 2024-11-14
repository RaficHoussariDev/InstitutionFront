import React, {useEffect, useRef, useState} from 'react';
import './InstitutionList.css';
import {deleteInstitution, getInstitutions} from "../../services/institutionService";
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";
import {useNavigate} from "react-router-dom";
import {useReactToPrint} from "react-to-print";

function InstitutionList() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    const navigate = useNavigate();
    const contentRef = useRef();
    const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        getInstitutionList();
    }, []);

    const dropdownOptions = institutions.map((institution) => ({
        value: institution.id,
        label: institution.name,
    }));

    const filteredInstitutions = selectedInstitutions.length
        ? institutions.filter(institution =>
            selectedInstitutions.some(selected => selected.value === institution.id)
        )
        : institutions;

    const finalFilteredInstructions = showActiveOnly
        ? filteredInstitutions.filter(institution => institution.isActive)
        : filteredInstitutions;

    function getInstitutionList() {
        setIsLoading(true);
        getInstitutions().then((response) => {
            setInstitutions(response);
            setIsLoading(false);
        }).catch(() => {
            toast.error("Unable to get institutions! Try again later.");
            setIsLoading(false);
        });
    }

    function onSelectInstitution(selectedOptions) {
        setSelectedInstitutions(selectedOptions);
    }

    function onCheckedActiveOnly() {
        setShowActiveOnly(!showActiveOnly);
    }

    function renderStatus(isActive) {
        return isActive
            ? (<span className="status-circle active" title="Active"></span>)
            : (<span className="status-circle inactive" title="Inactive"></span>);
    }

    function navigateToInstitutionForm(institution) {
        const id = institution ? institution.id : 0;
        navigate(
            `/institution/${id}`,
            { state: {institution} }
        );
    }

    function onDeleteInstitution(institutionId) {
        setIsLoading(true);

        deleteInstitution(institutionId).then(() => {
            getInstitutionList();
            toast.success("Institution deleted successfully!");
        }).catch(() => {
            toast.error("Unable to delete institution. Try again later!");
        });
    }

    return (
        <div className="institution-list-container">
            <h2>Institutions</h2>

            {isLoading && (
                <div className="loader-container">
                    <CustomLoader/>
                </div>
            )}

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

                <CustomButton
                    title="Create Institution"
                    onClick={ () => navigateToInstitutionForm(null) }
                />

                <CustomButton title="Print" onClick={reactToPrintFn} />
            </div>

            <div ref={contentRef}>
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
                                    <CustomButton
                                        title="Edit"
                                        width="50%"
                                        onClick={() => navigateToInstitutionForm(institution)}
                                    />
                                </td>
                                <td>
                                    <CustomButton
                                        title="Delete"
                                        backgroundColor="red"
                                        width="50%"
                                        onClick={() => onDeleteInstitution(institution.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer/>
        </div>
    );
}

export default InstitutionList;