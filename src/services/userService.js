import axios from 'axios'

export function register(user){

return axios.post("http://localhost:4500/newUser",{
    name: user.name,
    email: user.email,
    password: user.password
})
}

export function login(user){

    return axios.post("http://localhost:4500/login",{
        name: user.name,
        password: user.password
    })
    }