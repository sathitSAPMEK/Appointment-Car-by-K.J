const { format, addDays } = require('date-fns');

const datetimeNow = () =>{
    let datetime = format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
    return datetime;
}

const dateNow = () =>{
    let date = format(Date.now(), 'yyyy-MM-dd');
    return date;
}

const PACKAGEFORMAT = () =>{
    var package = format(Date.now(), "yyyyMMdd");
    return package
}
  
const formatDateNowToMonth = () =>{
    let dateMonth = format(Date.now(), 'yyyy-MM');
    return dateMonth;
}

const fromatToDateMonth = (dateISO) =>{
    let dateMonth = format(dateISO, 'yyyy-MM');
    return dateMonth;
}

const formatDateTime = (dateISO) =>{
    let datetime = format(new Date(dateISO), 'yyyy-MM-dd HH:mm:ss');
    return datetime;
}

const formatDate = (dateTime) =>{
    let dateISO = new Date(dateTime);
    let date = format(dateISO, 'yyyy-MM-dd');
    return date;
}

const addDay = (dateCurrent, dateAdd) =>{
    var dateISO = new Date(dateCurrent);
    let newDate = addDays(dateISO, dateAdd);
    return formatDateTime(newDate);
}

const delDay = (dateCurrent, dateAdd) =>{
    var dateISO = new Date(dateCurrent);
    let newDate = addDays(dateISO, dateAdd);
    return formatDate(newDate);
}

const formatSlipClaim = () =>{
    let datetime = format(Date.now(), 'yyyy-MM-dd-HHmmss');
    return datetime;
}

const customDate = (custom) =>{
    let dateFormat = format(Date.now(), custom);
    return dateFormat;
}

module.exports = {
    datetimeNow,
    dateNow,
    formatDateTime,
    formatDate,
    addDay,
    delDay,
    formatDateNowToMonth,
    fromatToDateMonth,
    formatSlipClaim,
    PACKAGEFORMAT,
    customDate
}