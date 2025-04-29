import moment from "moment/min/moment-with-locales";


export const dateFormat = (date) =>{
    // return moment(date).locale('en').format('LL')
    return moment(date).locale(localStorage?.language || 'en').format('ll')
}