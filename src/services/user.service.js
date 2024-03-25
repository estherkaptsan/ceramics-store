import { asyncStorageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    sendPasswordResetEmail,
    resetPassword,
    getByResetToken
}

window.userService = userService

function getUsers() {
    return asyncStorageService.query('user')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await asyncStorageService.get('user', userId)

    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return asyncStorageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    // const user = await asyncStorageService.get('user', _id)
    let user = getById(_id)
    
    // await asyncStorageService.put('user', user)

    user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    console.log(userCred);
    // const users = await asyncStorageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}

// // login without backend
// function login(userCred) {
//     const loggedInUser = { username: 'esther', password: '123' }
//     if (loggedInUser && loggedInUser.username === userCred.username && loggedInUser.password === userCred.password) {
//       return loggedInUser;
//     }
//     return null;
//   }

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await asyncStorageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, username: user.username, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function sendPasswordResetEmail(email) {
     await httpService.post('auth/sreset-password', {email});
}

async function resetPassword(token, newPassword) {
   await httpService.put('auth/reset-password', {token, newPassword});
}

async function getByResetToken(token) {
    try {
      const response = await httpService.get(`user/validate-reset-token/${token}`);
      console.log('response.message',response.message)
      return response.message
      ;
    } catch (error) {
      console.error('Error validating reset token:', error);
      throw error;
    }
}

function onUserUpdate(user) {
    // showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    // store.dispatch({ type: 'setWatchedUser', user })
}