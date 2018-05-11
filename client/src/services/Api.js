import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `https://192.168.1.8/api/`,
        withCredentials: true // 有這行 cookie 才可使用
    })
}