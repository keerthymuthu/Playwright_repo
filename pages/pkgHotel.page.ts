import { BasePage } from "./base.page";
import {BrowserContext,Page, Locator, expect} from "@playwright/test";

export class PkgHotelPage extends BasePage{

    readonly ele_hotelNames:string = `//div[@class='oj-title-hotel']//span[@class='name']`;

    constructor(readonly page:Page, readonly context:BrowserContext){
            super(page,context);
            this.page = page;
            this.context = context;
    }

    async getHotelNames(): Promise<void>{
        const hotels:string[] = await this.hotelNames(this.page,this.ele_hotelNames,`hotelNames`);
        console.log(`----In hotel name`);
        console.log(`Length: ${hotels.length}`);
        for(let i=0;i<hotels.length;i++){
            console.log(`Hotel Name: ${hotels[i]}`);
        }
    }

}