import jwt from "jsonwebtoken";
const isAuthenticated = async (req,res,next)=>{
    console.log("arrivedin authenticate")
    try {
        const token = req.cookies.token;
          console.log("token is",token);
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success:false
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success:false
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;