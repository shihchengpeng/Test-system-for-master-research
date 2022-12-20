# proposal_system_based_on_ENS

## Aabstract
This is a project where we tried to build a domain name system based on blockchain technology. After we investigated whether we can use ENS(Ethereum Name Service) to replace DNS, the answer is no. There are two reasons according to our study, the scalability problem of ethereum and the “full node” problem. In the PoW ethereum network, the client can not communicate with blockchain without a third party such as infura because it is impossible to ask a user to become a full node. In order to let users authenticate the data coming back from infura, we added the digital signature of domain name and ip address to the smart contract based on the ENS and implemented this system.

## System architecture
![alt text](https://github.com/shihchengpeng/proposal_system_based_on_ENS/blob/main/image/System%20Architecture.png)

## Implementation result
### Register
![alt text](https://github.com/shihchengpeng/proposal_system_based_on_ENS/blob/main/image/register.png)

### Query
![alt text](https://github.com/shihchengpeng/proposal_system_based_on_ENS/blob/main/image/query.png)
