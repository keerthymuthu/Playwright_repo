import {test as base} from "@playwright/test";
import { PkgSearchPage } from "../pages/pkgsearch.page";
import { PkgHotelPage } from "../pages/pkgHotel.page";

type PageFixtures = {
    pkgSearchPage: PkgSearchPage,
    //pkgHotelPage: PkgHotelPage;
};

export const test = base.extend<PageFixtures>({
    pkgSearchPage: async({page,context},use)=>{
        const pkgSearchPage = new PkgSearchPage(page,context);
        await pkgSearchPage.navigateToLoginPage("");
        await use(pkgSearchPage);
        await page.close();
        await context.close();
    }
    /*pkgHotelPage: async({page,context},use)=>{
        const pkgHotelPage = new PkgHotelPage(page,context);
        await use(pkgHotelPage);
    }*/
});

export {expect} from "@playwright/test";