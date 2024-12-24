// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationTracker {

    // Mapping to store total donations for each cause
    mapping(string => uint256) public donationsForCause;

    // Event to log the donation made to a specific cause
    event DonationMade(address indexed donor, string cause, uint256 amount, uint256 totalDonations);

    // Function 1: Donate Ether to a specific cause
    function donateToCause(string calldata cause) external payable {
        require(msg.value > 0, "Donation must be greater than zero");

        // Update the total donations for the specified cause
        donationsForCause[cause] += msg.value;

        // Emit event to log the donation
        emit DonationMade(msg.sender, cause, msg.value, donationsForCause[cause]);
    }

    // Function 2: Get the total donations made to a specific cause
    function getTotalDonations(string calldata cause) external view returns (uint256) {
        // Return the total donations made to the specified cause
        return donationsForCause[cause];
    }
}
