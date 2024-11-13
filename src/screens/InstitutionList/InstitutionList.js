import React, {useEffect, useState} from 'react';
import './InstitutionList.css';
import {getInstitutions} from "../../services/institutionService";
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import CustomButton from "../../components/CustomButton/CustomButton";

function InstitutionList() {
    const [institutions, setInstitutions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
                    {institutions.map((institution, index) => (
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