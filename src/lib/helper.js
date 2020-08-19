export const fristLetterCapital=(str)=>{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

export const generateOtp =()=>{
    return (Math.floor(Math.random() * 1000000));
}

export const removeTags=(str)=> {
	if ((str===null) || (str==='')){
		return str;
	}else{
		str = str.toString();
		return str.replace( /(<([^>]+)>)/ig, '');
	}
}

export const findOrderStatus=(str)=>{
			   // 0 pending
      //          1 processing
      //          2 Hold
      //          3 dispatched
      //          4 completed
      //          5 cancelled
      //          6 refunded
      //          7 failed

      if(str == 0){
      	return "Pending";
      }else if(str == 1){
      	return "processing";
      }else if(str == 2){
      		return "Hold";
      }else if(str == 3){
      		return "Dispatched";
      }else if(str == 4){
      		return "Completed";
      }else if(str == 5){
      		return "Cancelled";
      }else if(str == 6){
      		return "Refunded";
      }else if(str == 5){
      		return "Failed";
      }
}