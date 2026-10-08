import { BasePage } from "./base.page";
import {contructDateLoc} from '../utils/DateCalculator'
import test, {Locator} from "@playwright/test";

export class PkgSearchPage extends BasePage{
    readonly package: Locator = this.page.getByRole(`tab`,{name: `Flight + Hotel`,exact: true});
    readonly ele_from: Locator = this.page.getByLabel(`From`);
    readonly ele_from_loc: Locator = this.page.getByText(process.env.FROM!,{exact: true});
    readonly ele_to: Locator = this.page.getByLabel(`To`,{exact: true});
    readonly ele_to_loc: Locator = this.page.getByText(process.env.TO!,{exact: true});
    readonly ele_pax: Locator = this.page.locator(`//button[@role='button']`).filter({hasText: `Travelers`});
    readonly ele_pax_inc: Locator = this.page.getByLabel(`Increase the number of adult passengers.`);
    readonly ele_pax_dec: Locator = this.page.getByLabel(`Decrease the number of adults passengers. The minimum number is one.`);
    readonly ele_apply_btn: Locator = this.page.getByRole(`button`,{name: `Apply`});
    readonly ele_dep_date: Locator = this.page.getByText(`Depart`,{exact: true});
    readonly ele_arr_date: Locator = this.page.getByText(`Return`);
    //readonly ele_find_vacation: Locator = this.page.getByRole(`button`, {name: `Find a vacation`});
    readonly ele_find_vacation: string = `#submitVacationsBookingForm`;

    async navigateToLoginPage(url: string): Promise<void>{
        await test.step(`Login to Application ${url}`,async() => {
            await this.navigate(url);
        });
    }

    async selectPackage(): Promise<void>{
        await this.package.click();
    }

    async enterFrom(from: string): Promise<void>{
        await this.ele_from.fill(from);
        await this.ele_from_loc.click();
    }

    async enterTo(to: string): Promise<void>{
        await this.ele_to.fill(to);
        await this.ele_to_loc.click();
    }

    async addPax(): Promise<void>{
        await this.ele_pax.click();
        await this.ele_pax_inc.click();
        await this.ele_apply_btn.click();
    }

    async chooseDepDate(): Promise<void>{
        this.ele_dep_date.click();
        const departDateLoc: string = contructDateLoc('Arrival',7);
        console.log(`Date Locator: ${departDateLoc}`);
        await this.page.waitForSelector(departDateLoc);;
        await this.page.locator(departDateLoc).click({clickCount: 2});
    }

    async chooseReturnDate(): Promise<void>{
        this.ele_arr_date.click();
        const returnDateLoc: string = contructDateLoc(`Depart`,10);
        await this.page.locator(returnDateLoc).click({clickCount: 2});
    }

    async clickFindVacationBtn(): Promise<void>{
        await this.windowHandle(this.ele_find_vacation,``);
        await this.page.waitForTimeout(8000);
    }
}