import { Alert } from 'react-native'

export function insertToList(crypto, condition, threshold, data, setInputName, host) {

	//add crypto and its condition to a flatList (named data)
	threshold=parseFloat(threshold)
	data.push({ name: crypto, price: condition+threshold })
	setInputName('')

    //send get request    
	let params = new URLSearchParams()
	params.append('crypto', crypto)
	params.append('condition', condition)
	params.append('threshold', threshold)

	fetch(`http://${host}:8000/api/add-watchlist?${params}`)
	.then(response => response.text())
	.then(result => Alert.alert(result))
	.catch(err => Alert.alert(err))
	/*

	CHECK IF CRYPTO NAME MATCH WITH BITKUB HTML, RETURN ERROR IF NOT

	*/	
}

export function removeFromList(data, setData, itemToRemove, host) {

	//remove a crypto from a flatList (named data)
	const filteredData = data.filter(function (el) {
		return el.name !== itemToRemove.name ||
			   el.price !== itemToRemove.price
	})
	setData(filteredData)    

    //send get request    
	let params = new URLSearchParams()
	params.append('crypto', itemToRemove.name)
	params.append('condition', itemToRemove.price.substring(0, 1))
	params.append('threshold', itemToRemove.price.substring(1))

	fetch(`http://${host}:8000/api/remove-watchlist?${params}`)
	.then(response => response.text())
	.then(result => Alert.alert(result))
	.catch(err => Alert.alert(err))
	/*


	REMOVE itemToRemove FROM THE DATABASE


	*/	
}