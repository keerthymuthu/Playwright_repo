export function contructDateLoc(travelType: string=`Departure`, day: number): string{
    const currentDate: Date = new Date();
    const futureDate: Date = new Date(currentDate);
    futureDate.setDate(futureDate.getDate()+day);
    let splitDay: string[] = futureDate.toString().split(" ");
    let dateLoc: string = ``;
    if(travelType === `Departure`)
        dateLoc = `(//span[contains(text(),'${splitDay[1]}')])[1]//parent::div//following-sibling::div[@class='days__Xlsua']//span[text()='${Number(splitDay[2])}']//parent::div`; 
    else
        dateLoc = `(//span[contains(text(),'${splitDay[1]}')])[2]//parent::div//following-sibling::div[@class='days__Xlsua']//span[text()='${Number(splitDay[2])}']//parent::div`; 
    console.log(`Date Locator: ${dateLoc}`);
    return dateLoc;
}

export function constructDateMonth(day: number): string{
    const currentDate: Date = new Date();
    const futureDate: Date = new Date(currentDate);
    futureDate.setDate(futureDate.getDate()+day);
    let month: string = String(futureDate.getMonth()+1).padStart(2,"0");
    let dayNum: string = String(futureDate.getDate()).padStart(2,"0");
    let targetDate: string = month.concat(dayNum);
    return targetDate;
}