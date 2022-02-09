import React , {useEffect, useState, useRef} from "react";
import data from "../config/towns";
import WasteDate from './WasteDate';
import _ from "lodash";
const CityPicker = ()=>{
    const [citiesList, setCitiesList] = useState('');
    const [townList, setTownList] = useState('');
    const [selectedCity, setSelectedCity] = useState('Kocmyrzów-Luborzyca');
    const [chosenVillageName, setChosenVillageName]  = useState('');
    const [chosenVillageData, setChosenVillageData] = useState('');

    const formRef = useRef();


    useEffect(() => {
      const storedVillageChosen = localStorage.getItem('villageChosen');
      if(storedVillageChosen  !== null){
        setChosenVillageName(storedVillageChosen);
        setChosenVillageData((getVillageData(townList, storedVillageChosen)))
      }
    }, [chosenVillageName]);
    


    useEffect(() => {
        setTownList(getTownListArray(data, selectedCity))
    }, [selectedCity]);
    useEffect(() => {
        setTownList(getTownListArray(data, selectedCity))
    }, [selectedCity]);



    const resetChosenVillageHandler = () =>{
        localStorage.setItem("villageChosen", null);
        setChosenVillageData(null);
    }

    const getTownListArray = (citiesArray, city) =>{
        let array = [];

        citiesArray.filter(item => item.city === city).map(item =>(
             item.village_list.map(village => {
                 array.push(village);
             })
        ))
        return array;
    }

    const getVillageData = (villagesObject, villageName) =>{
        return _.filter(villagesObject, ['name', villageName])[0]
    }


    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let name = formRef.current.querySelector('input:checked').value;
         localStorage.setItem("villageChosen", name);
         setChosenVillageName(name)
  
        setChosenVillageData((getVillageData(townList, name)))
        // console.log()
    }

    return (<>
    {!chosenVillageData? 
<form onSubmit={onSubmitHandler} ref={formRef}>
        {/* <select onChange={handleSelectChange}>
            <option value="" selected disabled hidden>Wybierz gminę</option>
            <option value="Kocmyrzów-Luborzyca">Kocmyrzów-Luborzyca</option>
            <option value="Chrzanów">Chrzanów</option>
        </select> */}

    {   
        Object.entries(townList).map((item, idx) =>(
            <div key={idx}>
                <input type="radio" id={idx} name="village-radio-button" value={item[1].name} />
                <label  htmlFor={idx}>{item[1].name}</label>
            </div>
            
        ))
    }
    <button type="submit"> Wybierz </button>
    </form>
    : <button onClick={resetChosenVillageHandler}>Resetuj wybór</button>}
    
    {chosenVillageData? <WasteDate data={chosenVillageData} /> : ''}
    </>
    )
}

export default CityPicker;