import Api from '@/services/Api'

export default {
    
    loginLocal (email, password) {
        return Api().post('login/', { Email: email , Password: password} )
    },

    loginFacebook () {
        return Api().get('auth/facebook')
    },
    
    identification () {
        return Api().get('login/username/')
    }
}