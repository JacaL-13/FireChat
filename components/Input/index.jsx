import { StyleSheet, TextInput, View } from 'react-native'

function Input() {
	return (
		<TextInput
			placeholder="Type a message"
			value={text}
			onChangeText={setText}
			style={styles.textInput}
			placeholderTextColor="#8E8E8E"
		/>
	)
}

export default Input
