import {test as base} from "@playwright/test";
import { PkgSearchPage } from "../pages/pkgsearch.page";

type PageFixtures = {
    pkgSearchPage: PkgSearchPage;
};

export const test = base.extend<PageFixtures>({
    pkgSearchPage: async({page,context},use)=>{
        const pkgSearchPage = new PkgSearchPage(page,context);
        await pkgSearchPage.navigateToLoginPage("");
        await use(pkgSearchPage);
    }
});

export {expect} from "@playwright/test";