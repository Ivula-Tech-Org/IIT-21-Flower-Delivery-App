const nowDate = new Date()
const logDate = `${nowDate.toLocaleDateString("English",{weekday:'short'})} ${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()} ${nowDate.toLocaleTimeString('en-US',{hour12:false})}`


export {logDate}