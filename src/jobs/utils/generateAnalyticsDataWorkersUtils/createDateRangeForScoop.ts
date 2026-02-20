export function createDateRangeForScoop(scoop: "day" | "week" | "month" | "year") : {startDate: Date, endDate: Date}{
    let startDate = new Date(Date.now());
    let endDate = new Date(Date.now());
    switch(scoop){
        case "day": 
            startDate.setHours(0,0,0,0);
            endDate.setHours(23)
            break;
        case "week": 
            startDate = getDateOfFirstDayOfTheWeek()
            endDate = getDateOfLastDayOfTheWeek()
            break;
        case "month": 
            endDate.setMonth(endDate.getMonth() + 1, 1)
            endDate.setDate(1)
            endDate.setHours(0,0,0,0)
            break;
        case "year":
            startDate.setMonth(0,1)
            startDate.setHours(0,0,0,0)
            endDate.setFullYear(endDate.getFullYear() + 1, 0);
            endDate.setHours(0,0,0,0)
    }
    return {endDate: endDate, startDate: startDate}
}

function getDateOfFirstDayOfTheWeek() {
  const date = new Date(Date.now());
  const currentDay = date.getDay();
  const diff = date.getDate() - currentDay;
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getDateOfLastDayOfTheWeek() {
  const date = new Date(Date.now());
  const currentDay = date.getDay();
  const toBeSet = date.getDate() + (6-currentDay);

  date.setDate(toBeSet);
  date.setHours(23, 0, 0, 0);
  return date;
}
