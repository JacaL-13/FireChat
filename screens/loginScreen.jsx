import { View, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'
import {
	GoogleSigninButton,
	GoogleSignin,
} from '@react-native-google-signin/google-signin'

function LoginScreen() {
	// Initialize Google Sign-In
	GoogleSignin.configure({
		webClientId:
			'467870692645-f5t6p5omkohfdjpb2tga6lmoh7gvbul1.apps.googleusercontent.com',
	})

	async function hdlLogin() {
		try {
			const { idToken } = await GoogleSignin.signIn()
			const googleCredential = auth.GoogleAuthProvider.credential(idToken)

			return auth().signInWithCredential(googleCredential)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View style={styles.container}>
			<GoogleSigninButton
				style={styles.googleButton}
				size={GoogleSigninButton.Size.Wide}
				color={GoogleSigninButton.Color.Dark}
				onPress={hdlLogin}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: '#151718',
		alignItems: 'center',
		justifyContent: 'center',
	},
	googleButton: { width: 225, height: 60 },
})

export default LoginScreen
