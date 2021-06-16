class CustomErrorHandler extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
    static invalidCredentials(message="Invalid credentials"){
        return new CustomErrorHandler(401,message);
    }
}

module.exports=CustomErrorHandler;