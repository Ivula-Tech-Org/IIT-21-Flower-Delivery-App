
const person ={
    name:'cliff',
    password:1234
}

export default function loginMiddleware(req,res,next){
    if(person.name=='cliff'&& person.password==1234){
        next();
    }
    else{
        res.send('We are not able to authenticate you in');
    }
}