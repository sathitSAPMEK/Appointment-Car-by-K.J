const resSucess = (res, status, data,message) =>{
    res.status(200).json({ status: status, data: data, message: message });
}

const resError = (res, status, message) =>{
    res.status(400).json({ status: status, message: message });
}

module.exports = {
    resSucess,
    resError
}