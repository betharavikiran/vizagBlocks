import React, { Component } from 'react';



import vizagBlocksContract from "./../setup";
import Place from './Place';

class ListPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeCount :  0,
        };
        this.listenToEvent = this.listenToEvent.bind(this);
    }


    componentDidMount() {
        vizagBlocksContract.NewPlace({}, {
            fromBlock: 0,
            toBlock: 'latest'
        }).watch(this.listenToEvent);
    }

    listenToEvent(error, event ) {
        if (event.event === "NewPlace") {
            // Kick a refresh
            this.setState({placeCount: Number(event.args.placeCount)})
        }
    }

    renderPlaces(placeCount){
        const indents = [];
        for (let i = 0; i < placeCount; i++) {
            const place = vizagBlocksContract.getPlace(i);
            indents.push(<Place key={Number(place[0])} id={Number(place[0])} name={place[1]} publicId={place[2]} dbRecordId={place[3]} totalVotes={Number(place[4])} />);
            indents.push(<hr/>);
        }
        return indents;
    }

    render() {
        const placeCount =vizagBlocksContract.placeCount().toNumber();
        return (
            <div>
                <h3>Places {placeCount}</h3>
                {this.renderPlaces(placeCount)}
            </div>
        )
    }
}

export default ListPlaces;
