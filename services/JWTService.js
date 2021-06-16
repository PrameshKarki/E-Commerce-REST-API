const jwt=require("jsonwebtoken");

class JWTService{
    static sign(payload,expiry="60s",secret=process.env.JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }
}

module.exports=JWTService;