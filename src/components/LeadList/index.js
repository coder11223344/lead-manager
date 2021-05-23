import Lead from '../Lead'
import fragment from 'react'
import Alert from 'react-bootstrap/Alert'

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
		<fragment>
			{ listToRender }
		</fragment>
	)
}

export default LeadList