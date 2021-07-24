
const cron = require('node-cron');
const dayjs = require('dayjs');

const vector = [1,2,3];
let now = dayjs();
let d2 = dayjs.unix(1530471537);
calculate =()=>{
    console.log('now ' + now.format());
    console.log('unix ' + d2.format());
    console.log(...vector);
}





cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    calculate();
  });