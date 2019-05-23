import React from 'react'
import ImageGallery from 'react-image-gallery'
import {Carousel, Row, Col, DropdownButton, Dropdown} from 'react-bootstrap'
import 'react-image-gallery/styles/css/image-gallery.css'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { FaBeer } from 'react-icons/fa'
import Slider from 'react-rangeslider'

const axios = require('axios')
const URL = 'https://webcam.flow-ree.com'
const API_URL = `${URL}/api`
const HISTORY_URL = `${URL}/history`

class History extends React.Component {
	constructor(props, context) {
		super(props, context)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.onSlide = this.onSlide.bind(this)
		this.state = {
			loading: true,
			data: [],
			index: 0,
			imageIndex: 0
		}
		this.imageGalleryRef = null
		this.setImageGalleryRef = element => {
			this.imageGalleryRef = element
		}
	}

	componentDidMount() {
		let self = this
		axios.get(API_URL)
			.then(function (response) {
				// handle success
				let data = Object.keys(response.data)
					.sort()
					.reverse()
					.map(folder => { return {folder: folder, files: response.data[folder]}})
				self.setState({data: data})
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

	handleOnChange(value) {
		this.setState({
			imageIndex: value
		})
		this.imageGalleryRef.slideToIndex(value)
	}
	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex
		})
		this.imageGalleryRef.slideToIndex(0)
	}
	onSlide(slideIdx) {
		this.setState({imageIndex: slideIdx})
	}
	render() {
		let images = []
		if(this.state.data.length > 0){
			let currentData = this.state.data[this.state.index]
			images = currentData.files
				.sort()
				.reverse()
				.map(filename => {
					let prettyFilename = filename.split('_')[1].split('-')
					prettyFilename = `${prettyFilename[0]}:${prettyFilename[1]}`
					return {
						original: `${HISTORY_URL}/${currentData.folder}/${filename}.jpg`,
						thumbnail: `${HISTORY_URL}/${currentData.folder}/.thumbnails/${filename}_thumb.jpg`,
						thumbnailLabel: prettyFilename,
						thumbnailTitle: prettyFilename,
						originalTitle: 'OrigTitle'
					}
				})
		}
		let max = this.state.data.length > 0 ? this.state.data[this.state.index].files.length - 1 : 0
		let content = Object.keys(this.state.data).length > 0 ? (
			<div>
				<Carousel
					style={{marginBottom: '10px'}}
					interval={null}
					onSelect={this.handleSelect}
					prevIcon=<IoIosArrowBack style={{color: 'black'}} />
					nextIcon=<IoIosArrowForward style={{color: 'black'}} />
				>
					{this.state.data
						.map((item, idx) => {
							let prettyFoldername = item.folder.split('_')[0].split('-')
							prettyFoldername = `${prettyFoldername[2]}.${prettyFoldername[1]}.${prettyFoldername[0]}`
							return <Carousel.Item key={idx} className='text-center'>
								{prettyFoldername}
							</Carousel.Item>})}
				</Carousel>
				<ImageGallery
					ref={this.setImageGalleryRef}
					lazyload
					showThumbnails={true}
					showPlayButton={false}
					thumbnailPosition='right'
					items={images}
					onSlide={this.onSlide}
					renderCustomControls= {() => {
						return <div className='rangeslider-ctl'>
							<Row style={{alignItems: 'center', margin: '0px 10px'}}>
								<Col xs={11}>
									<Slider
										min={0}
										max={max}
										step={1}
										onChange={this.handleOnChange}
										value={this.state.imageIndex}
										orientation="horizontal"
										format={value => {return `${this.state.data[this.state.index].files[value].split('_')[1].split('-')[0]}:${this.state.data[this.state.index].files[value].split('_')[1].split('-')[1]}`}}
										style={{position: 'absolute', zIndex: 1, width: '80%', bottom: 0, margin: '25px 12%'}}
									/>
								</Col>
							</Row>
						</div>
					}}
					// onImageLoad={this.stopLoading}
				/>
			</div>) :
			<div className='text-center'>Daten konnten nicht geladen werden!</div>
		return (
			<div>
				{content}
			</div>)

	}
}
export default History
