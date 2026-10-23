import { BasePage } from "./base.page";
import {contructDateLoc,constructDateMonth} from '../utils/DateCalculator'
import {Locator, BrowserContext} from "@playwright/test";
import { PkgHotelPage } from "./pkgHotel.page";

export class PkgSearchPage extends BasePage{
     
    readonly package: Locator = this.page.getByRole(`tab`,{name: `Flight + Hotel`,exact: true});
    readonly ele_from: Locator = this.page.getByLabel(`From`);
    //readonly ele_from_loc: Locator = this.page.getByText(process.env.FROM!,{exact: true});
    readonly ele_to: Locator = this.page.getByLabel(`To`,{exact: true});
    //readonly ele_to_loc: Locator = this.page.getByText(process.env.TO!,{exact: true});
    readonly ele_pax: Locator = this.page.locator(`//button[@role='button']`).filter({hasText: `Travelers`});
    readonly ele_pax_inc: Locator = this.page.getByLabel(`Increase the number of adult passengers.`);
    readonly ele_pax_dec: Locator = this.page.getByLabel(`Decrease the number of adults passengers. The minimum number is one.`);
    readonly ele_apply_btn: Locator = this.page.getByRole(`button`,{name: `Apply`});
    readonly ele_dep_date: Locator = this.page.getByText(`Depart`,{exact: true});
    readonly ele_arr_date: Locator = this.page.getByText(`Return`);
    //readonly ele_find_vacation: Locator = this.page.getByRole(`button`, {name: `Find a vacation`});
    readonly ele_find_vacation: string = `#submitVacationsBookingForm`;

    async navigateToLoginPage(url: string): Promise<void>{
            await this.navigate(url);
    };

    async selectPackage(): Promise<void>{
        await this.package.click();
    }

    async enterFrom(from: string): Promise<void>{
        await this.ele_from.fill(from);
        await this.page.getByText(from,{exact: true}).click();
    }

    async enterTo(to: string): Promise<void>{
        await this.ele_to.fill(to);
        await this.page.getByText(to,{exact: true}).click();
    }

    async addPax(): Promise<void>{
        await this.ele_pax.click();
        await this.ele_pax_inc.click();
        await this.ele_apply_btn.click();
    }

    async chooseDepDate(deptDate: string): Promise<void>{
        const departDate:string = constructDateMonth(Number(deptDate));
        await this.ele_dep_date.clear();
        await this.ele_dep_date.pressSequentially(departDate);
        await this.ele_dep_date.press(`Tab`)
        //const departDateLoc: string = contructDateLoc('Arrival',7);
        //const departDateLoc: string = contructDateLoc('Departure',Number(deptDate));
        //console.log(`Date Locator: ${departDateLoc}`);
        //await this.page.waitForSelector(departDateLoc);;
        //await this.page.locator(departDateLoc).click({clickCount: 2});

    }

    async chooseReturnDate(arrDate: string): Promise<void>{
        const arrvDate:string = constructDateMonth(Number(arrDate));
        await this.ele_arr_date.clear();
        await this.ele_arr_date.pressSequentially(arrvDate);
        await this.ele_arr_date.press(`Tab`);
        //const returnDateLoc: string = contructDateLoc(`Arrival`,10);
        //const returnDateLoc: string = contructDateLoc(`Arrival`,Number(arrDate));
        //await this.page.locator(returnDateLoc).click({clickCount: 2});
    }

    async clickFindVacationBtn(): Promise<PkgHotelPage>{
        const newWindow = await this.windowHandle(this.ele_find_vacation,``);
        return new PkgHotelPage(newWindow,this.context);
    }
}