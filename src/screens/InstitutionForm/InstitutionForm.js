import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import '../../App.css';
import CustomButton from "../../components/CustomButton/CustomButton";
import './InstitutionForm.css';
import CustomError from "../../components/CustomError/CustomError";
import {upsertInstitution} from "../../services/institutionService";
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import 'react-toastify/dist/ReactToastify.css';

function InstitutionForm() {
    const location = useLocation();

    const institution = location.state?.institution;
    const isNewInstitution = !institution;

    const [newName, setNewName] = useState(isNewInstitution ? "" : institution.name);
    const [newCode, setNewCode] = useState(isNewInstitution ? "" : institution.code);
    const [isNewActive, setIsNewActive] = useState(isNewInstitution ? false : institution.isActive);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function setName(name) {
        setNewName(name);
    }

    function setCode(code) {
        setNewCode(code);
    }

    function setStatus() {
        setIsNewActive(!isNewActive);
    }

    function submitInstitution() {
        const validationErrors = [];

        if (!newName || !newCode) {
            validationErrors.push('Please fill in both name and code');
        }

        if (newName.length > 50) {
            validationErrors.push('Name cannot exceed 50 characters');
        }

        if (newCode.length > 5) {
            validationErrors.push('Code must be a maximum of 5 digits');
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors([]);

        const newInstitution = {
            id: isNewInstitution ? 0 : institution.id,
            name: newName,
            code: newCode,
            isActive: isNewActive,
        };

        setIsLoading(true);
        upsertInstitution(newInstitution).then(() => {
            toast.success(isNewInstitution ? 'Institution created successfully!' : 'Institution updated successfully!');
            setIsLoading(false);
        }).catch(() => {
            toast.error(isNewInstitution
                ? 'Unable to create institution. Please try again later!'
                : 'Unable to update Institution. Please try again later!'
            );
            setIsLoading(false);
        });
    }

    return (
        <div>
            { isLoading && <CustomLoader /> }
            <div className="form-container institution-form-container">

                {errors.length > 0 && errors.map((error, index) => {
                    return (
                        <CustomError key={index} message={error} />
                    );
                })}

                <div className="form">
                    <h2>Institution</h2>

                    <CustomInput
                        label="Name"
                        type="text"
                        value={newName}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <CustomInput
                        label="Code"
                        type="number"
                        value={newCode}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <div className="checkbox-filter-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={isNewActive}
                                onChange={setStatus}
                            />
                            Show Active Institutions Only
                        </label>
                    </div>

                    <div className="button-container institution-button-container">
                        <CustomButton
                            title={isNewInstitution ? 'Create Institution' : 'Update Institution'}
                            onClick={submitInstitution}
                        />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default InstitutionForm;