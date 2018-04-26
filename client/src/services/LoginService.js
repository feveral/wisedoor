import Api from '@/services/Api'

export default {
    
    loginLocal (email, password) {
        return Api().post('authentication/login/', { Email: email , Password: password} )
    },

    logout () {
        return Api().get('authentication/logout/')
    },

    loginFacebook () {
        return Api().get('auth/facebook/')
    },
    
    identification () {
        return Api().get('authentication/username/')
    }
}