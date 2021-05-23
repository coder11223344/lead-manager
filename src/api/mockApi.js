import data from './data'

if(!localStorage.getItem('apiData')){
	localStorage.setItem('apiData',JSON.stringify(data))
}

const mockAPI = {
	fetchNewLeads(){
		return new Promise((resolve)=> {
			setTimeout(function(){
				const data = JSON.parse(localStorage.getItem('apiData'))
				const newLeads = data.filter((lead) => lead.status === 'new')
				resolve(newLeads)
			}, 1000)
		})
	},
	fetchAcceptedLeads(){
		return new Promise((resolve)=>{
			setTimeout(function(){
				const data = JSON.parse(localStorage.getItem('apiData'))
				const acceptedLeads = data.filter((lead) => lead.status === 'accepted')
				resolve(acceptedLeads)
			}, 1000)
		})
	},
	updateLeadStatus(id, status){
		return new Promise((resolve)=>{
			setTimeout(function(){
				const data = JSON.parse(localStorage.getItem('apiData'))
				data.forEach((lead) => {
					if(lead.id === id){
						lead.status = status
					}
				})
				localStorage.setItem('apiData', JSON.stringify(data))
				resolve(true)
			}, 1000)
		})
	}
}

export default mockAPI