import { ref } from 'vue'
import store from '../store'
import { fetchDataFromApi } from '../helpers/fetchDataFromApi'
import { useLocalStorage } from './useLocalStorage'

// Reaktive Variablen
const userData = ref(null)
const responseText = ref('')
const showForgotPasswordForm = ref(false)

const name = ref('')
const surname = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const position = ref('')
const jerseyNumber = ref(0)
const birthday = ref(new Date('1955-01-01'))
const initials = ref('')
const bgColor = ref('--primary')
const bgImage = ref(null)

const handleLogin = async (router: any) => {
  try {
    const response = await fetchDataFromApi('/users/login', 'POST', {
      username: username.value,
      password: password.value,
    })

    const token = response.token
    localStorage.setItem('token', token)

    // Abrufen der Benutzerdaten mit dem gespeicherten Token
    await fetchUserDataOnLoad(token, router)

    console.log('Erfolgreich angemeldet:', response)
    responseText.value = 'Erfolgreich angemeldet!'

    router.push('/')
  } catch (error: any) {
    console.error('Fehler bei der Anmeldung:', error)
    responseText.value = 'Fehler bei der Anmeldung: ' + error.message
  }
}

const fetchUserDataOnLoad = async (token: string | null, router?: any) => {
  if (token) {
    try {
      userData.value = await fetchDataFromApi(
        '/users/me',
        'GET',
        undefined,
        token,
      )
      store.login(true)

    } catch (error: any) {
      console.error('Fehler beim Abrufen der Benutzerdaten:', error)
      responseText.value =
        'Fehler beim Abrufen der Benutzerdaten: ' + error.message
      store.login(false)
    }

    /* add data of user to store */
    store.setUserData(userData.value)
    store.getUserAccessRights(userData.value)

    /* show tutorial based on user info */
    if(store.state.userData.watchedTutorial) {
     store.updatedWatchedTutorial(true);
    }
  }

  store.loadData(true)

  if (!store.state.isLoggedIn && !store.state.isRegisterSuccess) {
    router.push('/login')
  } else if (!store.state.isLoggedIn && store.state.isRegisterSuccess) {
    router.push('/success')
  }
}

const handleLogout = (router: any) => {
  const { value: myValue } = useLocalStorage('alreadyRegistered', 'no')
  localStorage.removeItem('token') // Token aus Local Storage entfernen
  userData.value = null
  responseText.value = 'Erfolgreich abgemeldet!'
  username.value = ''
  password.value = ''
  myValue.value = 'yes'

  /* reload page after log out */
  router.go();
}

const handleRegister = async (router: any) => {
  const { value: myValue } = useLocalStorage('alreadyRegistered', 'no')

  try {
    const payload = {
      name: name.value,
      surname: surname.value,
      username: username.value,
      email: email.value,
      /* fallback for isInjured */
      isInjuredUntil: '1955-01-01T00:00:00.000Z',
      password: password.value,
      position: position.value,
      jerseyNumber: jerseyNumber.value,
      birthday: birthday.value,
      userImage: {
        bgColor: bgColor.value,
        bgImage: bgImage.value,
        initials: initials.value,
      },
    }

    console.log(payload)

    await fetchDataFromApi('/users/register', 'POST', payload)
      .then((data) => {
        if (data) {
          // If data is returned, it's a successful request
          store.updateIsRegisterSuccess(true)
          myValue.value = 'yes'
          router.push('/success')
        }
      })
      .catch((error) => {
        // Handle error appropriately
        console.log('Etwas ist schiefgelaufen:', error.message)
      })
  } catch (error: any) {
    console.error('Fehler bei der Registrierung:', error.message)
    responseText.value = 'Fehler bei der Registrierung: ' + error.message
  }
}

export function useAuth() {
  return {
    name,
    surname,
    username,
    email,
    password,
    repeatPassword,
    position,
    jerseyNumber,
    birthday,
    initials,
    bgColor,
    bgImage,
    userData,
    responseText,
    showForgotPasswordForm,
    handleLogin,
    fetchUserDataOnLoad,
    handleLogout,
    handleRegister,
  }
}
