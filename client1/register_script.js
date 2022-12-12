const Web3 = require('web3');
const web3 = new Web3('http://172.16.1.3:8543');
const namehash = require('eth-ens-namehash')

var registryAddress = "0x4Dfd21ca8923ebf78260ec4A398BA63B1bFCA1C3"
var registryAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"label","type":"bytes32"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"address","name":"resolver","type":"address"}],"name":"NewResolver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"uint64","name":"ttl","type":"uint64"}],"name":"NewTTL","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"recordExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"resolver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"resolver","type":"address"},{"internalType":"uint64","name":"ttl","type":"uint64"}],"name":"setRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"address","name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"label","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"}],"name":"setSubnodeOwner","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"label","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"resolver","type":"address"},{"internalType":"uint64","name":"ttl","type":"uint64"}],"name":"setSubnodeRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"uint64","name":"ttl","type":"uint64"}],"name":"setTTL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"bytes32","name":"label","type":"bytes32"}],"name":"test","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"ttl","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"}]

var registrarAddress = "0xE57FFc64e77a5AaeB3391B247dc9B7f2D70bf897"
var registrarAbi = [{"inputs":[{"internalType":"contract ENS","name":"ensAddr","type":"address"},{"internalType":"bytes32","name":"node","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ens","outputs":[{"internalType":"contract ENS","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"label","type":"bytes32"},{"internalType":"address","name":"owner","type":"address"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rootNode","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}]

var resolverAddress = "0xdbeBCF2617A1170b89fbdCC5Cef1d0c087F050b2"
var resolverAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"node","type":"bytes32"},{"indexed":false,"internalType":"string","name":"addr","type":"string"},{"indexed":false,"internalType":"string","name":"sig","type":"string"}],"name":"AddrChanged","type":"event"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"DNSrr","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"},{"internalType":"string","name":"IPaddr","type":"string"},{"internalType":"string","name":"Signature","type":"string"}],"name":"setDNSrr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

var registryIns = new web3.eth.Contract(registryAbi,registryAddress);
var registrarIns = new web3.eth.Contract(registrarAbi,registrarAddress);
var resolverIns = new web3.eth.Contract(resolverAbi,resolverAddress);

var argv = process.argv.slice(1);
var hexMessage = Web3.utils.utf8ToHex(argv[1]);
var node = Web3.utils.soliditySha3(hexMessage);
var owner = argv[2];
var IPaddr = argv[3];

console.log("hash: ", node);
console.log("owner: ", owner)

register_domain();

async function register_domain(){
        var unlocked = await web3.eth.personal.unlockAccount(owner, "password", 10000);
        if(unlocked == true){
                console.log("Your account is unlocked.");
        }
        else{
                console.log("! Something went wrong while unlocking your account.")
        }

        console.log("Wait to be mined...");
        var register_hash = await registrarIns.methods.register(node, owner).send({from: owner});
        if(register_hash){
                console.log("Your register transaction has been succeeded.");
        }
        else{
                console.log("! Something went wrong while submitting your register transaction.")
        }

        node = namehash.hash(argv[1]);
        var ttl = 10;

        console.log("Wait to be mined...");
        var setRecord_hash = await registryIns.methods.setRecord(node, owner, resolverAddress, ttl).send({from: owner});
        if(setRecord_hash){
                console.log("Your setRecord transaction has been succeeded.");
        }
        else{
                console.log("! Something went wrong while submitting your setRecord transaction.")
        }

        var signature;
        await web3.eth.personal.sign(IPaddr, owner, 'password').then(function(result){
            signature = result;
        });
        console.log("The signature of your data is: ", signature);

        console.log("Wait to be mined...");
        var setDNSrr_hash = await resolverIns.methods.setDNSrr(node, IPaddr, signature).send({from: owner});
        if(setDNSrr_hash){
                console.log("Your setDNSrr transaction has been succeeded.");
        }
        else{
                console.log("! Something went wrong while submitting your setDNSrr transaction.")
        }
        console.log("All steps of register have been done.");
        process.exit();
}
