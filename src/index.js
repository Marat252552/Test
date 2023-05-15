const app = require('./app')
const mongoose = require('mongoose');

let DBconnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://tazhieffm:L69QuIpMNj2yGl0G@cluster0.yaeadqr.mongodb.net/?retryWrites=true&w=majority');
        if(mongoose.connection.readyState === 1) {
            console.log('Подключение к Базе Данных успешно')
            console.log('')
        }
    } catch(e) {
        console.log(mongoose.connection.readyState)
        console.log(e)
    }
}


const start = () => {
    let PORT = process.env.PORT || 3000
    try {
        DBconnect()
        app.listen(PORT, () => {
            
            console.log('server is running on port' + PORT)
        })
        
    } catch (e) {
        console.log(e)
    }
}

start()

