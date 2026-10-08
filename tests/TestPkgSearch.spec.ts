import {test} from '../fixtures/page.fixture';

test.describe(`Book package`,async()=>{
    test(`Book package`,async({pkgSearchPage})=>{
        await pkgSearchPage.selectPackage();
        await pkgSearchPage.enterFrom(process.env.FROM!);
        await pkgSearchPage.enterTo(process.env.TO!);
        await pkgSearchPage.addPax();
        await pkgSearchPage.chooseDepDate();
        await pkgSearchPage.chooseReturnDate();
        await pkgSearchPage.clickFindVacationBtn();
    });
});
