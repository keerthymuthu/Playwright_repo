export function contructDateLoc(travelType: string=`Arrival`, day: number): string{
    const currentDate: Date = new Date();
    const futureDate: Date = new Date(currentDate);
    futureDate.setDate(futureDate.getDate()+day);
    let splitDay: string[] = futureDate.toString().split(" ");
    let dateLoc: string = ``;
    if(travelType === `Arrival`)
        dateLoc = `(//span[contains(text(),'${splitDay[1]}')])[1]//parent::div//following-sibling::div[@class='days__Xlsua']//span[text()='${Number(splitDay[2])}']//parent::div`; 
    else
        dateLoc = `(//span[contains(text(),'${splitDay[1]}')])[2]//parent::div//following-sibling::div[@class='days__Xlsua']//span[text()='${Number(splitDay[2])}']//parent::div`; 
    console.log(`Date Locator: ${dateLoc}`);
    return dateLoc;
}