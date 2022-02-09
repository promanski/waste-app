const data = [
    {
    city:"Kocmyrzów-Luborzyca",
    village_list: 
            [
                {
                    "name":"Sulechów",
                    "id":1,
                    "waste_pickup_dates":{
                        "bio":["2022-02-09"],
                        "mixed_waste": ["2022-02-09"],
                        "segregated": ["2022-02-13"]
                    }
                },
                {
                    "name":"Głęboka",
                    "id":2,
                    "waste_pickup_dates":{
                        "bio":["2022-02-11","2022-02-12"],
                        "segregated": ["2022-02-11"]
                    }
                },
                {
                    "name":"Baranówka",
                    "id":3,
                    "waste_pickup_dates":{
                        "bio":["2022-02-22"],
                        "segregated": ["2022-02-23"]
                    }
                }
            ]  
    },
    {
        city:"Chrzanów",
        village_list: 
                [
                    {
                        "name":"Chrzanów",
                        "waste_pickup_dates":{
                            "bio":"2022-03-10",
                            "segregated": "2022-03-13"
                        }
                    }
                ]  
        }
]

export default data;