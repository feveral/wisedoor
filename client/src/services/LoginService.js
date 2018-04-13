import Api from '@/services/Api'

export default {
    loginLocal (imageData) {
        return Api().post('login', { image: imageData })
    },
    facebookLogin () {
        return Api().get('auth/facebook')
    }
}