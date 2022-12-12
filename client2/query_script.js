const childProcess = require('child_process');
const namehash = require('eth-ens-namehash')

var argv = process.argv.slice(1);
console.log('input domain name: ', argv[1]);
var node = namehash.hash(argv[1]);
console.log('node: ', node);

childProcess.exec('node /home/james/query/registry_query.js ' + node, function (err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
});
