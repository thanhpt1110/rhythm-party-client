class User {
    static TYPE_GOOGLE = 'Google'
    static TYPE_FACEBOOK = 'Facebook'
    static TYP_LOCAL_ACCOUNT = 'LocalAccount'
    constructor(id, name, avatar, email, type, isAuthentication)
    {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.email = email;
        this.isAuthentication = isAuthentication;
        this.type = type;
    }
}
module.exports = User;