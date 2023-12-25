import api from "./Api"
const updateUserInfromation = async(user,id)=>{
    return await api.put(`/api/user/${id}`,user);
}
export {updateUserInfromation};
