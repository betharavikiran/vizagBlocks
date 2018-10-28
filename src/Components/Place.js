import React, { Component } from 'react';
import PropTypes from 'prop-types';

import vizagBlocksContract from "./../setup";

class Place extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeId:  props.id,
            totalVotes: 0,
        };
        this.handleVoting = this.handleVoting.bind(this);
        this.listenToEvent = this.listenToEvent.bind(this);
    }

    componentDidMount() {
        vizagBlocksContract.NewVote({}, {
            fromBlock: 0,
            toBlock: 'latest'
        }).watch(this.listenToEvent);
    }

    listenToEvent(error, event ) {
        if (event.event === "NewVote") {
            if (Number(event.args.placeId) === Number(this.state.placeId)) {
                this.setState({totalVotes: Number(event.args.totalVotes)})
            }
        }
    }

    handleVoting() {
        const {id} = this.props;
        vizagBlocksContract.vote(id);
    }

    render() {
        const { id , name, publicId, totalVotes } = this.props;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">{name}</h3>
                        <h3 className="panel-title">{this.state.totalVotes}</h3>
                    </div>
                    <div className="panel-body">
                        <img className="img-rounded img-center" src={`imgs/${publicId}.jpg`}/>
                        <br/>
                        <button className="btn btn-default" type="button" onClick={this.handleVoting}>Vote</button>
                    </div>
                </div>
            </div>
        )
    }
}

Place.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    publicId: PropTypes.string.isRequired,
    dbRecordId: PropTypes.string.isRequired,
    totalVotes: PropTypes.number.isRequired,
};

export default Place;
