import api from "./Api"
const updateUserInfromation = async(user,id)=>{
    return await api.put(`/api/user/${id}`,user);
}
const createUser = async(user) =>{
    return await api.post('/api/user', user);
}
export {updateUserInfromation, createUser};
