import { useEffect, useState } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native/types'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import Chat from '../components/Chat'
import Input from '../components/Input'
import SendButton from '../components/SendButton'

function ChatScreen() {
	const [text, setText] = useState('')
	const [chats, setChats] = useState([])
	const [loading, setLoading] = useState(true)
	const timestamp = firestore.FieldValue.serverTimestamp()

	async function sendMessage(e) {
		const { uid, photoURL } = auth().currentUser

		if (text.length > 0 && text.length < 255) {
			try {
				e.preventDefault()
				setLoading(true)

				await firestore().collection('chats').doc().set({
					owner: uid,
					image: photoURL,
					text: text,
					created: timestamp,
				})

				setText('')
				setLoading(false)
			} catch (error) {
				setLoading(false)
				Alert.alert('Error', error.message)
			}
		} else {
			setLoading(false)
			Alert.alert('Message must be between 1 and 255 characters')
		}
	}

	useEffect(() => {
		const unsubscribe = firestore()
			.collection('chats')
			.orderBy('createdAt')
			.limitToLast(15)
			.onSnapshot(querySnapshot => {
				const chatsArr = []
				querySnapshot.forEach(doc => {
					const id = doc.id
					const data = doc.data()

					chatsArr.push({ id, ...data })
				})
				setChats(chatsArr)
				setLoading(false)
			})
		return () => {
			unsubscribe()
			setLoading(false)
		}
	}, [])

	if (loading) {
		return <ActivityIndicator />
	} else {
		return (
			<View style={styles.container}>
				<View style={styles.chatStyle}>
					{chats && (
						<FlatList
							data={chats}
							renderItem={({ item }) => (
								<Chat key={item.id} chat={item} />
							)}
						/>
					)}
				</View>

				<View style={styles.inputContainer}>

				</View>
			</View>
		)
	}
}

export default ChatScreen
