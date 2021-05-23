import Lead from '../Lead'
import Alert from 'react-bootstrap/Alert'
import React from "react"

function LeadList(props){
	const {refreshRenderedLeads, leadList, listType, fetchInProgress} = props
	let listToRender =
		<Alert variant='primary'>
			{fetchInProgress ? 'Fteching leads...' : 'No leads to display!'}
		</Alert>
	if(leadList && leadList.length){
		listToRender = leadList.map((lead, leadIndex) => {
			if(lead.status === listType){
				lead.index = leadIndex
				return <Lead key={lead.email} leadInfo={lead} refreshRenderedLeads={refreshRenderedLeads} />
			}
			return null
		})
	}
	return (
		<React.Fragment>
			{ listToRender }
		</React.Fragment>
	)
}

export default LeadList