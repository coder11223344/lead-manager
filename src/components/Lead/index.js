import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './style.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarkerAlt, faBriefcase, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import mockAPI from "../../api/mockApi"

function Lead(props) {
	const {leadInfo, refreshRenderedLeads} = props

	function handleStatusUpdate(status) {
		mockAPI.updateLeadStatus(leadInfo.id, status).then((result) => {
			if(result){
				leadInfo.status = status
				refreshRenderedLeads(leadInfo)
			}
		})
	}

	let leadInvitation =
		<Badge pill={true} className='lead-invitation'>
			<span className='price'>${Number.parseFloat(leadInfo.price).toFixed(2)}</span>&nbsp;
			<span className='label'>Lead Invitation</span>
		</Badge>

	let footer = null
	if(leadInfo.status === 'new'){
		footer =
			<ListGroupItem className='lead-buttons'>
				<Button onClick={() => handleStatusUpdate('accepted')} className='button primary accept shadow-none'>Accept</Button>
				<Button onClick={() => handleStatusUpdate('declined')} className='button primary decline shadow-none'>Decline</Button>
				{leadInfo.status === 'new' && leadInvitation}
			</ListGroupItem>
	}

	let leadContact = null
	if(leadInfo.status === 'accepted'){
		leadContact =
			<ListGroupItem className='lead-contact'>
				<Badge pill={true}><span className='icon'><FontAwesomeIcon icon={faPhone}/></span> <span
					className='data'>{leadInfo.phone}</span></Badge>
				<Badge pill={true}><span className='icon'><FontAwesomeIcon icon={faEnvelope}/></span> <span
					className='data'>{leadInfo.email}</span></Badge>
			</ListGroupItem>
	}
	return (
		<Card className='lead'>
			<Card.Body className="p-0">
				<Card.Title className='lead-title'>
					<Container>
						<Row>
							<Col xs={4} md={2}>
								<div className='lead-avatar float-right'>{leadInfo.name.charAt(0).toUpperCase()}</div>
							</Col>
							<Col className='d-flex justify-content-center flex-column'>
								<span className='lead-name'>{leadInfo.name}</span>
								<span className='lead-time text-muted'>{leadInfo.date}</span>
							</Col>
						</Row>
					</Container>
				</Card.Title>
			</Card.Body>
			<ListGroup className="list-group-flush">
				<ListGroupItem className='lead-metadata'>
					<Badge pill={true}><span className='icon'><FontAwesomeIcon icon={faMapMarkerAlt}/></span> <span
						className='data'>{leadInfo.suburb}</span></Badge>
					<Badge pill={true}><span className='icon'><FontAwesomeIcon icon={faBriefcase}/></span> <span
						className='data'>{leadInfo.category}</span></Badge>
					<Badge pill={true} className='data'>Job ID: {leadInfo.id}</Badge>
					{leadInfo.status === 'accepted' && leadInvitation}
				</ListGroupItem>
				{leadContact}
				<ListGroupItem className='lead-description'>
					{leadInfo.description}
				</ListGroupItem>
				{footer}
			</ListGroup>
		</Card>
	)
}

export default Lead