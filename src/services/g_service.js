import { postUser } from "./../models/userModel.js"
import contractors from "./../models/contractorModel.js"

class g_service{
    async gmethod(clientID,contID){
        try {
            const getLocUser = await postUser.findById(clientID)
            const getLocCont = await contractors.findById(contID)  

        } catch (error) {
            console.log(error)
            
        }

    }
}

export default g_service