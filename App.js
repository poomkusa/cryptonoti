import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Button, Text, TextInput, Alert, Keyboard } from 'react-native'

export default function App() {
	const [data, setData] = React.useState([
		{ name: 'BTC (for test)', price: ">50000" },
		{ name: 'ETH (for test)', price: "<1000" },
		{ name: 'ADA (for test)', price: "<15" },
		//{ name: '', price:  },
	])
	const onPressItem = (itemToRemove) => {
        Alert.alert(
            'Removal Confirmation',
            `Remove an alert for ${itemToRemove.name}?`,
            [
              {
                text: 'Cancel',
                onPress: () => { }
              },
              {
                text: 'Confirm',
                onPress: () => { 
                  console.log(itemToRemove.name)
                  console.log("..................................")
                  console.log(data)  
                  console.log("..................................") 
                  const filteredData = data.filter(function (el) {
                    return el.name !== itemToRemove.name ||
                           el.price !== itemToRemove.price
                  })
                  console.log(filteredData)
                  console.log("..................................")                  
                  setData(filteredData)
                }
              }
            ]
          )        
	}
	const renderFlatListItem = (data) => {
		//อ่านอักขระตัวแรกของชื่อสินค้า ไปใส่ใน Shape Drawable
		let firstLetter = String(data.item.name).substring(0, 1)

		return (
			<TouchableOpacity onLongPress={() => onPressItem(data.item)}>
				<View style={styles.flatListItems}>
					<View style={styles.shapeBg}>
						<Text style={styles.shapeText}>{firstLetter}</Text>
					</View>
					<Text style={styles.itemName}>{data.item.name}</Text>
					<Text style={styles.itemPrice}>{data.item.price}฿</Text>
				</View>
			</TouchableOpacity>
		)
	}

	let [inputName, setInputName] = React.useState('')
	const onPressButton = () => {
    Keyboard.dismiss()
		//ตรวจสอบค่าจาก State
		if (!(inputName === '')) {
			data.push({ name: inputName, price: "<15" })
      setInputName('')
		} else {
			msg = 'Empty input'
      Alert.alert(msg)
    }
	}

	return (
		<View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}} >
        <View style={{width:"33%"}}>
          <Text style={{alignSelf:'center'}}></Text>
        </View>
        <View style={{width:"33%"}}>
          <Text style={{ alignSelf: 'center', fontSize: 20 }}>WATCHLIST</Text>
        </View>
        <View style={{width:"33%"}}>
          <Text style={{alignSelf:'flex-end', fontSize: 10}}>Powered by POOM</Text>
        </View>
      </View>
			<FlatList
				data={data}
				renderItem={renderFlatListItem}
				keyExtractor={(item, index) => item + index}
				style={{ marginTop: 10 }}
				contentContainerStyle={{ margin: 10 }}
			/>
			<View style={styles.items}>
				<Text>Insert an abbreviation followed by {'"<"'} or {'">"'}</Text>
				<TextInput
					style={styles.textInput}
					defaultValue={inputName}
          placeholder="e.g., BTC>100000"
          autoCapitalize ={"characters"}          
					onChange={e => setInputName(e.nativeEvent.text)}
				/>
			</View>
			<View style={styles.items}>
				<Button title="Add to watchlist" onPress={onPressButton} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50,
	},
	flatListItems: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#cde',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		marginBottom: 8,
		padding: 10
	},
	shapeBg: {
		width: 40,
		height: 40,
		backgroundColor: 'green',
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		marginRight: 10
	},
	shapeText: {
		fontSize: 20,
		color: 'white',
	},
	itemName: {
		flex: 3,
		fontSize: 18,
		fontWeight: 'bold'
	},
	itemPrice: {
		flex: 1,
		fontSize: 16,
		color: 'gray',
		textAlign: 'right'
	},

	container: {
		flex: 1,
		marginTop: 70,
		marginLeft: 20,
		marginRight: 20
	},
	items: {
		marginBottom: 15
	},
	textInput: {
		height: 32,
		color: 'black',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#aaa',
		marginTop: 5,
		paddingTop: 3,
    paddingLeft: 5,
		paddingBottom: 3
	},
})
