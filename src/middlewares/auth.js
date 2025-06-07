const isAuth=(req,res,next)=>{
    const token="xyz"
    const isAutorized=token==="xyz"
    if(!isAutorized){
       
        res.status(401).send("Unauthorised access")
    }
    next();
}
const userAuth=(req,res,next)=>{
    const token="xyz"
    const isAutorized=token==="xyz"
    if(!isAutorized){
       
        res.status(401).send("Unauthorised access")
    }
    next();
}

module.exports={
    isAuth,userAuth
}