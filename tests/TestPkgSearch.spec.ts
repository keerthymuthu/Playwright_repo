import {test,expect} from '../fixtures/page.fixture';
import { PkgHotelPage } from '../pages/pkgHotel.page';
import { getRowByColumnValue } from '../utils/excelReader';
import * as path from 'path';

const EXCEL_FILE = path.resolve(__dirname, '../testdata/TestData.xlsx');

test.describe(`Book package`,async()=>{
    test(`Book package`,async({context,pkgSearchPage})=>{
        const testId = process.env.TEST_ID ?? 'VPRASXP-301';
        const row = getRowByColumnValue(EXCEL_FILE, 'TestId', testId);
        expect(row, `No row found for TestId "${testId}"`).toBeDefined();
        await pkgSearchPage.selectPackage();
        await pkgSearchPage.enterFrom(row!['cityPair'].substring(0,3));
        await pkgSearchPage.enterTo(row!['cityPair'].substring(3));
        await pkgSearchPage.addPax();
        await pkgSearchPage.chooseDepDate(row!['DepDate']);
        await pkgSearchPage.chooseReturnDate(row!['ArrDate']);
        await pkgSearchPage.clickFindVacationBtn();
        const pages = context.pages();
        console.log(`No of open pages: ${pages.length}`);
        const newWindow = pages[pages.length-1];
        await newWindow.bringToFront();
        const packageHotelPage = new PkgHotelPage(newWindow,context);
        await packageHotelPage.getHotelNames();
    });
});
