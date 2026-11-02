import {expect,test} from "@playwright/test";

test(`Test Network interception`,async({page}) => {
    page.route(`**/aura?preloadActions`,async(route,request) => {
        if(request.method() === `POST`){
            console.log(`Request URL: ${request.url()}`);
            console.log(`Request headers:`, request.headers());
            
        }
        else
            route.continue();
    })

    await page.goto(`https://login.salesforce.com`,{waitUntil: `load`});
    const loginWithUserName = page.getByText(`Log In with Username`);
    if(await loginWithUserName.isVisible())
        await loginWithUserName.click({force:true});
    await page.getByLabel(`Username`).fill(`muthukraja@gmail.com`);
    await page.locator(`#Login`).click();
    await page.getByLabel(`Password`).fill(`Uppiliappan1000*`);
    await page.locator(`#Login`).click();
    await page.waitForTimeout(9000);
    const title = await page.title();
    await expect(page).toHaveTitle(`Home | Salesforce`);
    
});