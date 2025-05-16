// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PlasticSoko {
    struct Report {
        address reporter;
        string location;
        string description;
        uint256 timestamp;
    }

    Report[] public reports;
    mapping(address => uint256) public balances;

    function reportWaste(string memory location, string memory description) public {
        reports.push(Report(msg.sender, location, description, block.timestamp));
        balances[msg.sender] += 1;
    }

    function getAllReports() public view returns (Report[] memory) {
        return reports;
    }

    function getReportCount() public view returns (uint256) {
        return reports.length;
    }

    function getMyBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
