import React, { Component } from 'react';
import axios from 'axios';

class Fibonacci extends Component {
	state = {
		seenIndexes: [],
		values: {},
		index: ''
	};

	handleSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		await axios.post('/api/values', {
			index: this.state.index
		});
		this.setState({index: ''});
	};

	componentDidMount(): void {
		this.fetchValues();
		this.fetchIndexes();
	}

	async fetchValues() {
		const values = await axios.get('/api/values/current');
		this.setState({values: values.data});
	}

	async fetchIndexes() {
		const seenIndexes = await axios.get('/api/values/all');
		this.setState({seenIndexes: seenIndexes.data});
	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>Enter index</label>
					<input
						value={this.state}
						onChange={event => this.setState({index: event.target.value})}
					/>
					<button>Submit</button>
				</form>
				<h3>Indexes Seen</h3>
				{
					this.renderSeenIndexes()
				}
				<h3>Calculated Values</h3>
				{
					this.renderValues()
				}
			</div>
		);
	}

	private renderSeenIndexes() {
		return this.state.seenIndexes.map(({number}) => number).join(', ');
	}

	private renderValues() {
		const entries = [];
		for(let key in this.state.values) {
			// @ts-ignore
			entries.push(
				<div key={key}>
					For index {key}, {this.state.values[key]} was calculated
				</div>
			)
		}
		return entries;
	}
}

export default Fibonacci;