import UserModel from "../models/User.js"
import bcrypt from 'bcrypt'






class UserController{
    static home =  (req,res)=>{
        res.render("index")
    }

    static registration =  (req,res)=>{
        res.render("registration")
    }




    static createUserDoc = async(req,res)=>{
        const hashPassword =  await bcrypt.hash(req.body.password,10)
        try {
            //creating new document

                const doc = new UserModel({
                    name:req.body.name,
                    email:req.body.email,
                    password:hashPassword,
                })

                //saving document
                await doc.save()
                res.redirect('/login')

        } catch (error) {
            console.log(error)
            
        }
    }

    static verifyLogin = async(req,res)=>{
        
        try {
            const {email,password}= req.body
          
            const result = await UserModel.findOne({email:email})

            // console.log(result)
            if(result == null){
              

                res.send(`<h1>email and password is not valid</h1>`)

            }

            const isMatch = await bcrypt.compare(password, result.password)


           if(result.email == email && isMatch){
            res.send(`<h1>dashboard ---- ${result}</h1>`)
           }
           else{
            res.send(`<h1>email and password is not valid</h1>`)
           }
           
          



        } catch (error) {
            console.log(error)
        }
    }



    static login =  (req,res)=>{
        res.render("login")
    }
}



export default UserController