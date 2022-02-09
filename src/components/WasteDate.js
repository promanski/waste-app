import React , {useEffect, useState} from "react";
import moment from "moment";
import 'moment/locale/pl'  

const WasteDate = ({data}) => {

const getTimeDiff = (date) =>{
    let today = moment().startOf('day');
    let targetDate = moment(date).startOf('day');
   return targetDate.diff(today, 'days', true);    
}

const daysDiffToText = (number) => {
 switch (number){
     case 0: return 'dzisiaj'
     case 1: return 'jutro';
     case 2: return 'pojutrze'
     default: return `za ${number} dni`;
 }
}


return(<>

<h2> Następny wywóz w {data.name} </h2>
    Odpady biodegradowalne: {daysDiffToText(getTimeDiff(data.waste_pickup_dates['bio'][0])) }

 </>);


}

export default WasteDate;