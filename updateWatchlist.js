import { Alert } from 'react-native'

export function insertToList(crypto, condition, threshold, data, setInputName, host) {
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

export function removeFromList(){
    
}