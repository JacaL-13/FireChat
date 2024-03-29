import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, View, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'
import ChatScreen from './screens/chatScreen'
import LoginScreen from './screens/loginScreen'

const App = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(user => {
			user ? setUser(user) : setUser(null)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<SafeAreaView style={styles.backgroundStyle}>
			<StatusBar barStyle={'dark-content'} />
			<View style={styles.viewStyle}>
				{user ? <ChatScreen /> : <LoginScreen />}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	backgroundStyle: {
		backgroundColor: '#151718',
	},
	viewStyle: {
		height: '100%',
		alignItems: 'center',
		backgroundColor: '#151718',
	},
})

export default App
