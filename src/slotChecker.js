const Slot = require('./models/Slot')
const { format } = require('date-fns') ;

let SlotChecker = () => {
    // Массив, в который добавляется запись об успешном напоминании. Если в массиве уже есть конкретная запись, то напоминание не осуществляется
    let reminded = []
    let count = 0
    // Каждую секунду проверяем Базу Данных и в зависимости от условий, выводим в консоль инфу о предстоящей записи - т.е. напоминаем
    setInterval(async () => {
        // Массив. Если записей нет, то он пустой
        let slots = await Slot.find()
        // Условие - Если в массиве есть слоты, т.е. имеются записи к врачам
        if (slots.length !== 0) {
            slots.forEach(slot => {
                try {
                    let currentDate = format((Date.now()), "MM.dd.yyyy HH:mm:ss" ) 
                    let currentDateNumber = Date.now()
                    let time = new Date(Date.parse(slot.date))
                    let slotTime = format(time, "HH:mm:ss")
                    // - Напоминание за три часа -

                    // Условие - Если до записи менее трех часов
                    if (slotDateNumber - currentDateNumber < 7200000
                        // И время записи еще не наступило
                        && slotDateNumber - currentDateNumber > 0
                        // И о текущей записи еще не было напомнено за три часа
                        && !reminded.find(el => el === `${slot.date}_two_hours`)
                    ) {
                        console.log(currentDate + `| Привет, ${slot.user_name}! Вам через два часа к ${slot.doctor_spec} в ` + slotTime)
                        // Добавляем в массив reminded информацию о том, что напомнили за 2 часа 
                        reminded.push(`${slot.date}_two_hours`)
                    }

                    // - Напоминание за сутки -

                    // Условие - Если до записи более трех часов
                    if (slotDateNumber - currentDateNumber > 7200000
                        // Время записи еще не наступило
                        && slotDateNumber - currentDateNumber > 0
                        // И если до записи менее 24 часов
                        && slotDateNumber - currentDateNumber < 86400000
                        // И еще не было напомнено за 24 часа
                        && !reminded.find(el => el === `${slot.date}_day`)
                    ) {
                        console.log(currentDate + `| Привет, ${slot.user_name}! Напоминаем, что Вы записаны к ${slot.doctor_spec} в ` + slotTime)
                        // Добавляем в массив reminded информацию о том, что напомнили за 24 часа 
                        reminded.push(`${slot.date}_day`)
                    }
                } catch (e) {
                    console.log(e)
                }

            })
        }
        // Просто секундомер
        console.log(count)
        count = count + 1
    }, 1000)
}

module.exports = SlotChecker