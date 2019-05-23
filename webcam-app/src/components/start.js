import React from 'react'
import backgroundLogo from 'Src/assets/images/trees_md.jpg'
import ImageGallery from 'react-image-gallery'
import History from './history'
import {Button, Modal, Container, Row, Col, Spinner} from 'react-bootstrap'
import Timelapse from './timelapse'
import 'react-image-gallery/styles/css/image-gallery.css'
import Image from 'react-bootstrap/Image'
import hornet from 'Src/assets/images/hornet.png'
import { FaVideo, FaImages, FaClock} from 'react-icons/fa'

class Start extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.handleShowLiveCam = this.handleShowLiveCam.bind(this)
		this.hideLiveCam = this.hideLiveCam.bind(this)
		this.handleShowTimelapse = this.handleShowTimelapse.bind(this)
		this.hideTimelapse = this.hideTimelapse.bind(this)
		this.handleShowGallery = this.handleShowGallery.bind(this)
		this.hideGallery = this.hideGallery.bind(this)
		this.stopLoading = this.stopLoading.bind(this)
		this.state = {
			showLiveCam: false,
			showGallery: false,
			showTimelapse: false,
			loading: true,
		}
	}

	handleShowLiveCam() {
		this.setState({ showLiveCam: true, loading: true })
	}
	handleShowGallery() {
		this.setState({ showGallery: true })
	}
	handleShowTimelapse () {
		this.setState({ showTimelapse: true })
	}
	hideLiveCam() {
		this.setState({ showLiveCam: false })
	}
	hideGallery() {
		this.setState({ showGallery: false })
	}
	hideTimelapse () {
		this.setState({ showTimelapse: false })
	}
	stopLoading() {
		this.setState({loading: false})
	}
	render() {
		const images = [
			{
				original: 'http://emils-webcam.ddns.net?action=stream'
			}
		]
		const buttonStyle= {
			margin: 5
		}
		return (
			<div style={{width: '100%', height: '100%', display: '-webkit-box'}}>
				<div style={{
					width: '100%',
					height: '100%',
					position: 'absolute',
					backgroundSize: 'cover',
					filter: 'brightness(40%)',
					backgroundImage: `url(${backgroundLogo})`,
					backgroundPosition: 'bottom'}}>

				</div>

				<Modal size='lg'
					   centered
					   onHide={this.hideLiveCam}
					   show={this.state.showLiveCam}>
					<Modal.Header closeButton>
						<Modal.Title>Live-Cam</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.state.loading ?
							<Row className='w-100 text-center' style={{margin: '10px'}}>
								<Col xs={{span: 11, offset: 0}} sm={{span: 10, offset: 0}} md={{span: 6, offset: 2}}>
									<Spinner site='lg' animation="grow" variant="success" />
								</Col>
							</Row> : null}
						<ImageGallery
							showThumbnails={false}
							showPlayButton={false}
							onImageLoad={this.stopLoading}
							items={images} />
					</Modal.Body>
				</Modal>

				<Modal size='xl'
					   centered
					   onHide={this.hideGallery}
					   show={this.state.showGallery}>
					<Modal.Header closeButton>
						<Modal.Title>Galerie</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<History/>
					</Modal.Body>
				</Modal>
				<Timelapse show={this.state.showTimelapse} hide={this.hideTimelapse}/>
				<div  style={{position: 'absolute', width: '100%', height: '100%'}}>
					<Container className='d-flex h-100 text-center'>
						<Row className='align-self-center w-100 text-center' style={{margin: 'auto'}}>
							{/*<Row className='w-100 text-center' >*/}
							{/*	<Col xs={{span: 12, offset: 0}} sm={{span: 10, offset: 1}} md={{span: 6, offset: 3}}>*/}
							{/*		<Image src={hornet} />*/}
							{/*	</Col>*/}
							{/*</Row>*/}
							<Row className='w-100' style={{margin: '10px'}}>
								<Col xs={{span: 12, offset: 0}} sm={{span: 10, offset: 1}} md={{span: 6, offset: 3}}>
									<Button onClick={this.handleShowLiveCam} block variant='outline-light' size='lg'>
										Live Cam <FaVideo style={buttonStyle}/>
									</Button>
								</Col>
							</Row>
							<Row className='w-100' style={{margin: '10px'}}>
								<Col xs={{span: 12, offset: 0}} sm={{span: 10, offset: 1}} md={{span: 6, offset: 3}}>
									<Button onClick={this.handleShowGallery} block variant='outline-light' size='lg'>
										Gallery <FaImages style={buttonStyle}/>
									</Button>
								</Col>
							</Row>
							<Row className='w-100' style={{margin: '10px'}}>
								<Col xs={{span: 12, offset: 0}} sm={{span: 10, offset: 1}} md={{span: 6, offset: 3}}>
									<Button onClick={this.handleShowTimelapse} block variant='outline-light' size='lg'>
										Timelapse <FaClock style={buttonStyle}/>
									</Button>
								</Col>
							</Row>
						</Row>
					</Container>
				</div>
			</div>)}
}
export default Start
