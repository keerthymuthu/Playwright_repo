import {test} from "@playwright/test";
import { text } from "node:stream/consumers";

test(`Frame Test`,async({page}) => {
    /*await page.goto(`https://www.oneindia.com/`,{waitUntil: `load`});
    const allFrames = page.frames();
    console.log(allFrames);

    const frameCount = allFrames.length;
    console.log(`Frame count: ${frameCount}`);
    for (let iframe of allFrames){
        console.log(await iframe.title()+"\n");
    }
    await page.waitForTimeout(4000);*/

    await page.goto(`https://leafground.com/frame.xhtml`,{waitUntil: `load`});
    await page.locator(`.card`).filter({hasText: "Inside frame"}).frameLocator(`iframe`).getByText(`Click Me`).click();
    await page.waitForTimeout(8000);
});