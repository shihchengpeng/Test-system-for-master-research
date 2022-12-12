const Web3 = require('web3');
const web3 = new Web3('http://172.16.1.3:8543');

var argv = process.argv.slice(1);
var node = argv[2];
var resolverAddress = argv[1];
var resolverAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"string","name":"addr","type":"string"},{"indexed":false,"internalType":"string","name":"sig","type":"string"}],"name":"AddrChanged","type":"event"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"DNSrr","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"IPaddr","type":"string"},{"internalType":"string","name":"Signature","type":"string"}],"name":"setDNSrr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

var resolverIns = new web3.eth.Contract(resolverAbi,resolverAddress);

query();
async function query(){
        const result = await resolverIns.methods.DNSrr(node).call();
        var ip_addr = result[0];
	var sig = result[1];
	console.log("IP address:", result[0]);
        console.log("Signature:", result[1]);

	var signer_addr = web3.eth.accounts.recover(ip_addr, sig);
        console.log("The ethereum address of signer is:", signer_addr);
	process.exit();
}
