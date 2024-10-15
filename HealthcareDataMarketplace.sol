// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthcareDataMarketplace {
    
    // Struct to hold patient data
    struct Patient {
        address patientAddress;
        string medicalDataHash; // IPFS or other decentralized storage link
        bool exists;
    }
    
    // Mapping from patient address to medical data
    mapping(address => Patient) public patients;
    
    // Event to log when data is accessed or shared
    event DataAccessGranted(address patient, address researcher);
    event DataAccessRevoked(address patient, address researcher);
    
    // Register a patient with medical data hash
    function registerPatient(string memory _medicalDataHash) public {
        require(!patients[msg.sender].exists, "Patient already registered");
        patients[msg.sender] = Patient(msg.sender, _medicalDataHash, true);
    }
    
    // Grant access to a researcher (paid access)
    function grantAccess(address _researcher) public payable {
        require(patients[msg.sender].exists, "Patient not registered");
        require(msg.value >= 1 ether, "Insufficient payment to access data");
        emit DataAccessGranted(msg.sender, _researcher);
    }
    
    // Revoke access to a researcher
    function revokeAccess(address _researcher) public {
        require(patients[msg.sender].exists, "Patient not registered");
        emit DataAccessRevoked(msg.sender, _researcher);
    }
    
    // Retrieve medical data hash for the researcher
    function getMedicalData(address _patient) public view returns (string memory) {
        require(patients[_patient].exists, "Patient not registered");
        return patients[_patient].medicalDataHash;
    }
}
