export const fristLetterCapital=(str)=>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

export const generateOtp =()=>{
    return (Math.floor(Math.random() * 1000000));
}

