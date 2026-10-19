import {test} from "@playwright/test";

test(`Dialog test`,async({page})=>{
    await page.goto(`https://leafground.com/alert.xhtml`,{waitUntil: `load`});
    
    page.on(`dialog`,async(dialog)=>{
        const message = dialog.message();
        console.log(`Message: ${message}`);
        const type = dialog.type();
        console.log(`Type: ${type}`);
        if(type === `accept`)
            await dialog.accept();
        else if(type === `prompt`)
            await dialog.accept(`accept prompt`);
        else
            await dialog.dismiss();
    })

    await page.locator(`.card`).filter({hasText:`Prompt Dialog`}).getByText(`Show`).click();

    await page.waitForTimeout(5000);

    await page.locator(`.card`).filter({hasText: `Confirm Dialog`}).getByText(`Show`).click();

    await page.waitForTimeout(5000);
})