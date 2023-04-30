import { postUser } from "../models/userModel.js"
import { logDate } from "./../globals/globals.js"
import { messages } from "../models/messageModel.js"
class chatService {
    constructor() {
        console.log(`${logDate} | Server Logs |Chat Service | status : Initiated | Chat Service initiated`)
    }

    async postMessage(data) {
        const { message, clientID, contID } = data

        const postSMS = new messages({
            message: message,
            clientID: clientID,
            contID: contID
        })

        try {
            const saveSMS = (await postSMS.save()).toObject()
            return saveSMS

        } catch (err) {
            console.log(err)

        }

    }
    getMessage(data) {
        console.log('get message')
    }

}

export default chatService

