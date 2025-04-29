import moment from "moment/min/moment-with-locales";

export const dateFormat = (date) => {
    const mDate = moment(date); // เรียก moment() เพียงครั้งเดียว
    if (!mDate.isValid()) return "Invalid date";

    const years = mDate.format('YYYY');
    const lang = localStorage?.language || 'en';
    const thYear = lang === "th" ? Number(years) + 543 : years;

    return mDate.locale(lang).format(`D MMM ${thYear}`);
}
