import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `https://localhost/api/`,
        withCredentials: true // 有這行 cookie 才可使用
    })
}