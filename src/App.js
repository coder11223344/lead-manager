import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LeadList from './components/LeadList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { useState, useEffect } from 'react'
import mockApi from './api/mockApi'

function App() {
	const [renderedLeads, updateRenderedLeads] = useState(null)
	const [fetchInProgress, updateFetchInProgress] = useState(true)

	useEffect(()=>{
		if(!renderedLeads){
			handleTabSwitch('new')
		}
	})
	
	function handleTabSwitch(tabKey){
		updateFetchInProgress(true)
		if(tabKey === 'new'){
			mockApi.fetchNewLeads().then((data) => {
				updateRenderedLeads(data)
				updateFetchInProgress(false)
			})
		}else{
			mockApi.fetchAcceptedLeads().then((data) => {
				updateRenderedLeads(data)
				updateFetchInProgress(false)
			})
		}
	}

	function refreshRenderedLeads(lead){
		const leadClone = Object.assign({}, renderedLeads[lead.index])
		renderedLeads[lead.index] = leadClone
		updateRenderedLeads(Array.from(renderedLeads))
	}
	
	return (
		<div className="app">
			<Container>
				<Row>
					<Col>
						<Tabs defaultActiveKey="new" id="uncontrolled-tab-example"  onSelect={handleTabSwitch}>
							<Tab tabClassName='d-flex justify-content-center align-items-center' eventKey="new"
								 title="Invited">
								<LeadList
									fetchInProgress={fetchInProgress}
									refreshRenderedLeads={refreshRenderedLeads}
									leadList={renderedLeads} listType='new'
								/>
							</Tab>
							<Tab tabClassName='d-flex justify-content-center align-items-center' eventKey="accepted"
								 title="Accepted">
								<LeadList
									fetchInProgress={fetchInProgress}
									refreshRenderedLeads={refreshRenderedLeads}
									leadList={renderedLeads}
									listType='accepted'
								/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>

		</div>
	)
}

export default App
