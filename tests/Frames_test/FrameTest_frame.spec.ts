import {expect, test} from "@playwright/test";

test(`Frame test using page.frames()`,async({page})=>{
    await page.goto(`https://leafground.com/frame.xhtml`,{waitUntil: `load`});
    const frame = page.frame({url: `https://leafground.com/default.xhtml`});
    
    await frame?.click(`#Click`);
    console.log(await frame?.innerText(`#Click`));

     await page.locator(`.card`).filter({hasText: `Inside frame`}).frameLocator(`iframe`)
    .getByRole(`button`,{name: `Hurray! You Clicked Me.`}).click();
    
    const frame1 = page.frame({url: `https://leafground.com/page.xhtml`});
    await frame1?.frameLocator(`#frame2`).getByText(`Click Me`).click();
    const text = await frame1?.frameLocator(`#frame2`).locator(`#Click`).innerText();
    expect(text).toEqual(`Hurray! You Clicked Me.`);

    await page.locator(`.card`).filter({hasText:`frames in this page?`}).frameLocator(`iframe`)
    .getByText(`Count Frames`).click();

    await page.waitForTimeout(6000);
});