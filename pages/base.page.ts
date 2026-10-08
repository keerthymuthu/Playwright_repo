import { Page, test, BrowserContext, expect, Locator } from "@playwright/test";

export class BasePage{
    constructor(protected readonly page:Page, protected readonly context:BrowserContext){
        this.page = page;
        this.context = context;
    }

    async navigate(url: string): Promise<void>{
        await this.page.goto(url);
        await this.page.waitForLoadState(`load`);
        await this.page.waitForLoadState(`domcontentloaded`);
        await this.page.waitForFunction(()=>document.readyState === `complete`);
        expect(await this.page.title()).toBe(`Vacation Packages & Deals | Getaways by Southwest™`);
    }

    /**
    * Clicks on an element identified by the locator.
    * @param locator The selector to locate the element to be clicked.
    * @param name The name or description of the element to be clicked.
    * @param type The type or action being performed on the element (e.g., button, link).
    */
    async click(locator: string, name: string, type: string): Promise<void> {
        await test.step(`The ${name} ${type} is clicked`, async () => {
            await this.page.waitForSelector(locator, { state: 'attached' });
            await this.page.locator(locator).click();
        })
    }

    /**
        * Opens a new browser window by clicking on an element identified by the locator.
        * Waits for the new window to be available and returns its Page object.
        * @param locator The selector to locate the element that triggers the new window.
        * @param name The name or description of the element to be clicked.
        * @returns A promise that resolves to the Page object representing the new window.
        */
        async windowHandle(locator: string, name: string): Promise<Page> {
            return await test.step(`Window is opened`, async () => {
                console.log(`Setting up promise to wait for new page event.`);
                const windowPromise = this.context.waitForEvent('page');
    
                console.log(`Clicking on locator: ${locator} to open new window.`);
                await this.click(locator, name, "Button");
    
                console.log(`Waiting for the new window to be available.`);
                const newWindow = await windowPromise;
    
                console.log(`New window found, waiting for load state.`);
                await newWindow.waitForLoadState('load');
    
                const url = newWindow.url();
                console.log(`New window detected: URL = ${url}`);
                await expect(newWindow).toHaveURL(url);
    
                return newWindow;
            });
        }
}