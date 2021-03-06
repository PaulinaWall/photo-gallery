import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { BarLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const signin = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const signout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const updateEmail = (email) => {
		return currentUser.updateEmail(email)
	}

	const updatePassword = (password) => {
		return currentUser.updatePassword(password)
	}

	const updateProfile = (name) => {
		return currentUser.updateProfile({
			displayName: name
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		loading,
		signin,
		signout,
		resetPassword,
		signup,
		updateEmail,
		updatePassword,
		updateProfile,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && (<div className="d-flex justify-content-center my-5"><BarLoader color={"#888"} size={100} /></div>)}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, useAuth, AuthContextProvider as default }
