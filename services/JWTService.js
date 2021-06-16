const jwt=require("jsonwebtoken");

class JWTService{
    static sign(payload,expiry="60s",secret=process.env.JWT_SECRET){
        return jwt.sign(payload,secret,{expiresIn:expiry});
    }
    static verify(token,secret=process.env.JWT_SECRET){
        return jwt.verify(token,secret);
    }
}

module.exports=JWTService;