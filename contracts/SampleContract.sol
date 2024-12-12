// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public owner;

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint256 votedCandidateIndex;
    }

    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    event CandidateAdded(string name);
    event VoteCasted(address voter, string candidateName);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({name: _name, voteCount: 0}));
        emit CandidateAdded(_name);
    }
    
    
    function ROwner() public view returns (address) {
    return owner; 
}
    

    function vote(uint256 candidateIndex) public {
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(candidateIndex < candidates.length, "Invalid candidate index");

        voters[msg.sender] = Voter({hasVoted: true, votedCandidateIndex: candidateIndex});
        candidates[candidateIndex].voteCount++;

        emit VoteCasted(msg.sender, candidates[candidateIndex].name);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateVotes(uint256 candidateIndex) public view returns (uint256) {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        return candidates[candidateIndex].voteCount;
    }
}
    