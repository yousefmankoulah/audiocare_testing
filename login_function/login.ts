import { Page } from "@playwright/test";
export default class LoginPage {

    constructor(public page: Page) { }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterLoginPassword(password);
        await this.clickLoginBtn();
    }

    async enterEmail(emailaddress: string) {
        await this.page.getByLabel('Username*')
            .type(emailaddress);
    }

    async enterLoginPassword(password: string) {
        await this.page.getByLabel('Password*')
            .type(password);
    }

    async clickLoginBtn() {
        await Promise.all([
            this.page.click("//button[@type='submit']")
        ])
    }

  
}