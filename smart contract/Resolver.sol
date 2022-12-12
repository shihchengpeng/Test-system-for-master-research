pragma solidity ^0.8.13;

contract Resolver {
    event AddrChanged(bytes32 indexed node, string addr, string sig);

    address owner;
    mapping(bytes32=>string) domain_ip;
    mapping(bytes32=>string) domain_sig;

    modifier only_owner() {
        if(msg.sender != owner) revert();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function DNSrr(bytes32 node) public view returns(string memory, string memory) {
        return (domain_ip[node],domain_sig[node]);
    }

    function setDNSrr(bytes32 node, string memory IPaddr, string memory Signature) public only_owner {
        domain_ip[node] = IPaddr;
        domain_sig[node] = Signature;
        emit AddrChanged(node, IPaddr, Signature);
    }

    function supportsInterface(bytes4 interfaceID) public view returns (bool) {
        return interfaceID == 0xaabbccdd || interfaceID == 0x01ffc9a7;
    }
}
