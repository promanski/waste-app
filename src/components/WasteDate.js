import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/pl";

const WasteDate = ({ data }) => {
  const [previousWastePickupData, setPreviousWastePickupData] = useState({
    mixed_waste: "",
    segregated: "",
    big_size: "",
  });
  const [currentWastePickupData, setCurrentWastePickupData] = useState({
    mixed_waste: "",
    segregated: "",
    big_size: "",
  });
  const [futureWastePickupData, setFutureWastePickupData] = useState({
    mixed_waste: "",
    segregated: "",
    big_size: "",
  });

  const setWastePickupData = (dateArray) => {
    let today = moment().startOf("day").unix();
    let smallerDates = [];
    let biggerDates = [];

    //
    dateArray.map((element) => {
      if (moment(element).startOf("day").unix() < today) {
        smallerDates.push(element);
      } else {
        biggerDates.push(element);
      }
    });

    if (smallerDates.length === 0) {
      smallerDates.push("nie wiem kiedy");
    }
    return [
      smallerDates[smallerDates.length - 1],
      biggerDates[0],
      biggerDates[1],
    ];
  };
  useEffect(() => {
    // console.log(setWastePickupData(data.waste_pickup_dates.mixed_waste));
    // setWastePickupData(data.waste_pickup_dates.mixed_waste);

    setCurrentWastePickupData({
      mixed_waste: setWastePickupData(data.waste_pickup_dates.mixed_waste)[1],
      segregated: setWastePickupData(data.waste_pickup_dates.segregated)[1],
      big_size: setWastePickupData(data.waste_pickup_dates.big_size)[1],
      bio: setWastePickupData(data.waste_pickup_dates.bio)[1],
    });
    setPreviousWastePickupData({
      mixed_waste: setWastePickupData(data.waste_pickup_dates.mixed_waste)[0],
      segregated: setWastePickupData(data.waste_pickup_dates.segregated)[0],
      big_size: setWastePickupData(data.waste_pickup_dates.big_size)[0],
      bio: setWastePickupData(data.waste_pickup_dates.bio)[0],
    });
    setFutureWastePickupData({
      mixed_waste: setWastePickupData(data.waste_pickup_dates.mixed_waste)[2],
      segregated: setWastePickupData(data.waste_pickup_dates.segregated)[2],
      big_size: setWastePickupData(data.waste_pickup_dates.big_size)[2],
      bio: setWastePickupData(data.waste_pickup_dates.bio)[2],
    });
  }, []);

  const getTimeDiff = (stardDate, endDate) => {
    let start = moment(stardDate).startOf("day");
    let end = moment(endDate).startOf("day");
    return end.diff(start, "days", true);
  };

  const daysDiffToText = (number) => {
    if (number >= 0) {
      switch (number) {
        case 0:
          return "dzisiaj";
        case 1:
          return "jutro";
        case 2:
          return "pojutrze";
        default:
          return `za ${number} dni`;
      }
    } else {
      switch (number) {
        case -2:
          return "przedwczoraj";
        case -1:
          return "wczoraj";
        default:
          return `${Math.abs(number)} dni temu`;
      }
    }
  };

  return (
    <>
      <h2> Następny wywóz odpadów w {data.name} </h2>
      <div>
        Odpady biodegradowalne:{" "}
        <b>
          {" "}
          {daysDiffToText(getTimeDiff(moment(), currentWastePickupData.bio))}
        </b>{" "}
        , ostatnio były{" "}
        {daysDiffToText(getTimeDiff(moment(), previousWastePickupData.bio))}.
        Kolejny termin będzie{" "}
        {daysDiffToText(getTimeDiff(moment(), futureWastePickupData.bio))}
      </div>
      <div>
        Odpady zmieszane:{" "}
        <b>
          {" "}
          {daysDiffToText(
            getTimeDiff(moment(), currentWastePickupData.mixed_waste)
          )}
        </b>{" "}
        , ostatnio były{" "}
        {daysDiffToText(
          getTimeDiff(moment(), previousWastePickupData.mixed_waste)
        )}
        . Kolejny termin będzie{" "}
        {daysDiffToText(
          getTimeDiff(moment(), futureWastePickupData.mixed_waste)
        )}
      </div>
      <div>
        Odpady segregowalne:{" "}
        <b>
          {daysDiffToText(
            getTimeDiff(moment(), currentWastePickupData.segregated)
          )}
        </b>{" "}
        , ostatnio były{" "}
        {daysDiffToText(
          getTimeDiff(moment(), previousWastePickupData.segregated)
        )}
        . Kolejny termin będzie{" "}
        {daysDiffToText(
          getTimeDiff(moment(), futureWastePickupData.segregated)
        )}
      </div>
      <div>
        Odpady wielkogabarytowe:{" "}
        <b>
          {daysDiffToText(
            getTimeDiff(moment(), currentWastePickupData.big_size)
          )}
        </b>{" "}
        , ostatnio były{" "}
        {daysDiffToText(
          getTimeDiff(moment(), previousWastePickupData.big_size)
        )}
        . Kolejny termin będzie{" "}
        {daysDiffToText(getTimeDiff(moment(), futureWastePickupData.big_size))}
      </div>
    </>
  );
};

export default WasteDate;
