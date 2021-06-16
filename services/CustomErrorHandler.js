class CustomErrorHandler extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
    static invalidCredentials(message="Invalid credentials"){
        return new CustomErrorHandler(401,message);
    }
    static unauthorize(message="Unauthorized!"){
        return new CustomErrorHandler(401,message);
    }
    static notFound(message="Not Found"){
        return new CustomErrorHandler(404,message);

    }
}

module.exports=CustomErrorHandler;