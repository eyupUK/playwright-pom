import { test as setup } from '@playwright/test';
import { loadEnv } from '../../src/utils/env';
import { LoginPage } from '../../src/pages/login.page';
import * as fs from 'fs';
import * as path from 'path';

const env = loadEnv();
const statePath = path.resolve('storage/authState.json');

setup('authenticate and save storage state', async ({ page }) => {
    // Ensure storage directory exists
    fs.mkdirSync(path.dirname(statePath), { recursive: true });

    // Log in using the POM
    const loginPage = new LoginPage(page);
    await loginPage.open(); // update to '/login' if needed
    await loginPage.login(env.USER_EMAIL ?? 'standard_user', env.USER_PASSWORD ?? 'secret_sauce');
    
    // Save session for reuse
    await page.context().storageState({ path: statePath });
});
