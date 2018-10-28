pragma solidity ^0.4.24;

// About Vizag Top places to visit
// Tourist and commercial

contract VizagBlocks {
    enum PlaceType { Tourist, Shopping, Restaurant, Entertainment }

    uint public placeCount;

    struct Place {
        uint id;
        string name;
        string publicId;
        string dbRecordId;
        uint totalVotes;

        mapping (address => uint) votes;
    }

    // Dynamic Array
    Place[] public places;

    mapping (uint => address)  public placeToOwner;
    mapping (address => uint) public ownerPlaceCount;

    event NewPlace(uint placeId, string name, string publicId, string dbRecordId, uint placeCount);
    event NewVote (uint placeId, uint totalVotes);

    constructor() public {
        placeCount = 0;
    }

    function addPlace(string _name, string _publicId, string _dbRecordId) public {
        Place memory place = Place(placeCount, _name, _publicId, _dbRecordId, 0);
        // store in block chain
        places.push(place);
        placeToOwner[placeCount]= msg.sender;
        ownerPlaceCount[msg.sender] = ownerPlaceCount[msg.sender]++;

        emit NewPlace(placeCount,_name, _publicId, _dbRecordId, placeCount);

        placeCount += 1;
    }

    function getPlace(uint _placeId) view public returns (uint, string, string, string, uint){
        Place memory place = places[_placeId];
        return (place.id, place.name, place.publicId, place.dbRecordId, place.totalVotes);
    }

    function vote(uint _placeId) payable public returns (bool) {
        Place storage place = places[_placeId];
        require (place.votes[msg.sender] == 0);
        place.votes[msg.sender] = place.votes[msg.sender]++;
        place.totalVotes += 1;
        emit NewVote(_placeId, place.totalVotes);
        return true;
    }
}
