//I created this website for audiocare using django, html, bootstrap and css. This website for generating qr code to our server boxes to know all the information of each box.

import { test, expect, Page } from '@playwright/test';
import LoginPage from "../login_function/login";


//test login page with different cases
test.describe('login page test cases', async () => {

    test('login with wrong username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://audiocare.pythonanywhere.com/');

        //wrong username and password
        await login.login('ymankoulah', '2676781368');
        await login.clickLoginBtn();
        expect(await page.getByText('Please enter a correct username and password. Note that both fields may be case-'));
        
    });

    test('login with right username and wrong password', async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://audiocare.pythonanywhere.com/');

        // Right username Wrong paassword
        await login.login('audiocare', '8967mcjb56');
        await login.clickLoginBtn();
        expect(await page.getByText('Please enter a correct username and password. Note that both fields may be case-'));

        await page.goto('https://audiocare.pythonanywhere.com/');    
    });


    test('login with wrong username and right password', async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://audiocare.pythonanywhere.com/');

        //Right password, wrong username
        await login.login('mankoulah', '[Acs2011029999]');
        await login.clickLoginBtn();
        expect(await page.getByText('Please enter a correct username and password. Note that both fields may be case-'));
        
    });


    test('login with right username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await page.goto('https://audiocare.pythonanywhere.com/');
        //Right username, right password
        await login.login('audiocare', '[Acs2011029999]');
        await login.clickLoginBtn();
        expect(await page.goto('https://audiocare.pythonanywhere.com/homeAcessForDashboard/'));
        
    });

})


test.describe('check all the functions on the website', async () => {
    test('Audiocare qr code generator', async ({ page }) => {

        await page.goto('https://audiocare.pythonanywhere.com/');
        //login
        await page.getByLabel('Username*').fill('audiocare');
        await page.getByLabel('Username*').press('Tab');
        await page.getByLabel('Password*').fill('[Acs2011029999]');
        await page.getByLabel('Password*').press('Enter');

        //press generate qr code with any empty input field
        await page.getByRole('link', { name: 'Generate QR (current)' }).click();
        await page.getByPlaceholder('Enter the site name').click();
        await page.getByPlaceholder('Enter the site name').fill('Denver Va');
        await page.getByPlaceholder('Enter the serial number').click();
        await page.getByPlaceholder('Enter the serial number').fill('10035');
        await page.getByRole('button', { name: 'Generate QR' }).click();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });

        //press generate qr code
        await page.locator('#roll3').selectOption('VA');
        await page.getByRole('button', { name: 'Generate QR' }).click();

        //press on the qr code to print
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('img', { name: 'qr code' }).click();
        const page1 = await page1Promise;
        
        // go to the dashboard to check all the sites
        await page.getByRole('link', { name: 'Dashboard (current)' }).click();

        //check a site detail
        //await page.getByRole('link', { name: 'Denver Va' }).click();
        await page.click("(//table[@class='table']//a)[3]");
        const page2Promise = page.waitForEvent('popup');
        //press print
        await page.getByRole('button', { name: 'Print QR Code' }).click();
        const page2 = await page2Promise;

        //return back for the dashboard
        await page.goto('https://audiocare.pythonanywhere.com/homeAcessForDashboard/');
        
        //Search for sites
        await page.getByPlaceholder('Search').click();
        await page.getByPlaceholder('Search').fill('Denver');
        await page.getByRole('button', { name: 'Search' }).click();
        
        //Logout 
        await page.getByRole('link', { name: 'logout (current)' }).click();
        expect(await page.goto('https://audiocare.pythonanywhere.com/'));

    })
})


  