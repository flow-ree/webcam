import React from 'react'
import {Modal, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap'
const axios = require('axios')
const URL = 'https://webcam.flow-ree.com'
const TIMELAPSE_URL = `${URL}/api/timelapse`

class Timelapse extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.setNextVideo = this.setNextVideo.bind(this)
		this.setCurrentVideo = this.setCurrentVideo.bind(this)
		this.state = {
			videos: [],
			current: null
		}

	}
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.show){
			let self = this
			axios.get(TIMELAPSE_URL)
				.then(function (response) {
					// handle success
					let data = response.data
						.sort()
					// .reverse()
					let current = data.length > 0 ? data[data.length-1] : null
					self.setState({videos: data, current: current})
				})
				.catch(function (error) {
					// handle error
					console.log('error!!!!')
					console.log(error)
				})
				.then(function () {
					// always executed
				})
		}
	}

	setCurrentVideo (vid) {
		return () => {
			this.setState({current: vid})
		}
	}

	setNextVideo() {
		let idx = this.state.videos.findIndex(el => this.state.current === el)
		if(idx < this.state.videos.length - 1){
			this.setState({current: this.state.videos[idx+1]})
		}
	}

	render() {
		const parseDropdownItems = dateString => {
			let day = dateString.split('_')[0]
			day = day.split('-')
			return `${day[2]}.${day[1]}.`
		}
		const video = this.state.current ?
			<video key={this.state.current} onEnded={this.setNextVideo} style={{width: '100%'}} controls autoPlay name="media">
				<source src={`${URL}/timelapse/${this.state.current}`} type="video/mp4"/>
			</video> :
			<div>
				no video available.
			</div>
		return <Modal size='lg'
					  centered
					  onHide={this.props.hide}
					  show={this.props.show}>
			<Modal.Header closeButton>
				<Modal.Title style={{width: '100%'}}>
					<Row>
						<Col sm={5}>
							Timelapse
						</Col>
						<Col sm={2}>
							<DropdownButton variant="secondary" title={this.state.current ? parseDropdownItems(this.state.current) : ''}>
								{this.state.videos.map((vid, idx) => {
									return <Dropdown.Item onClick={this.setCurrentVideo(vid)} key={idx}>{parseDropdownItems(vid)}</Dropdown.Item>
								})}
							</DropdownButton>
						</Col>
					</Row>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{video}
				{/*<Player*/}
				{/*	src="2019-05-02_15.mp4"*/}
				{/*/>*/}
				{/*<video src="2019-05-02_15.mp4" type="video/ogg" width="100%" height="auto" autoPlay loop>*/}
				{/*	cannot play file.*/}
				{/*</video>*/}

			</Modal.Body>
		</Modal>
	}
}
export default Timelapse
