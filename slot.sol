// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 < 0.9.0;

contract sloat{
    address payable manager;
    string[3] a1;
    mapping(address=>uint) public players;
    string[] symbols=["A","A","B","B","B","B","C","C","C","C","C","C","D","D","D","D","D","D","D","D"];

    constructor(){
        manager=payable(msg.sender);
    }
    
    receive() external payable{
        players[msg.sender]+=msg.value;
    }

    function rendom(uint i) internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.number, block.timestamp, symbols.length,msg.sender,msg.value,i)));
    }

    function rollData() public view returns(string[3] memory){
        return a1;
    }

    function roll(uint bitAmount) public {
        require(players[msg.sender]>=bitAmount ,"Out of balance");
        players[msg.sender]-=bitAmount;
        for(uint i;i<3;i++){
            uint ren = rendom(i);
            uint index = ren % symbols.length;
            a1[i]=symbols[index];
        }
        
        if(uint(keccak256(abi.encodePacked(a1[0])))==uint(keccak256(abi.encodePacked(a1[1]))) && uint(keccak256(abi.encodePacked(a1[0])))==uint(keccak256(abi.encodePacked(a1[2])))){
            if(uint(keccak256(abi.encodePacked(a1[0])))==uint(keccak256(abi.encodePacked("A")))){
                players[msg.sender]+=bitAmount*5;
            }else if(uint(keccak256(abi.encodePacked(a1[0])))==uint(keccak256(abi.encodePacked("B")))){
                players[msg.sender]+=bitAmount*4;
            }else if(uint(keccak256(abi.encodePacked(a1[0])))==uint(keccak256(abi.encodePacked("C")))){
                players[msg.sender]+=bitAmount*3;
            }else{
                players[msg.sender]+=bitAmount*2;
            }
        }
    }

    function Withdrawal(uint amount) public{
        require(players[msg.sender]>=amount && amount>0,"not valid");
            payable(msg.sender).transfer(amount);
            players[msg.sender]-=amount;
    }

    function take() public{
        require(msg.sender==manager,"not");
        manager.transfer(address(this).balance);
    }
}