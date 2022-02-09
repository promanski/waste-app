import React , {useEffect, useState} from "react";
import moment from "moment";
import 'moment/locale/pl'  

const WasteDate = ({data}) => {

    const [currentWastePickupData, setCurrentWastePickupData] = useState();
    const [previousWastePickupData, setPreviousWastePickupData] = useState();
    const [futureWastePickupData, setFutureWastePickupData ] = useState();

    const setWastePickupData = (dateArray) =>{
        let today = moment().startOf('day');
        let array = [];

        // ["2022-02-11","2022-02-12"]
        dateArray.map( element =>{
            array.push(getTimeDiff(element));
        })
    }

const getTimeDiff = (date) =>{
    let today = moment().startOf('day');
    let targetDate = moment(date).startOf('day');
   return targetDate.diff(today, 'days', true);    
}

const daysDiffToText = (number) => {
    if (number >=0){
        switch (number){
            case 0: return 'dzisiaj'
            case 1: return 'jutro';
            case 2: return 'pojutrze'
            default: return `za ${number} dni`;
        }
    }
    else{
        switch (number){
            case -2: return 'przedwczoraj'
            case -1: return 'wczoraj'
            default: return `${number} dni temu`;
        }    
    }
}


return(<>

<h2> Następny wywóz w {data.name} </h2>
    Odpady biodegradowalne: {daysDiffToText(getTimeDiff(data.waste_pickup_dates['bio'][0])) }

 </>);


}

export default WasteDate;