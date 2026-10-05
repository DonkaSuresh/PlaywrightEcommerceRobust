import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';

import config from './playwright.config';

export default defineConfig(
    config,

    createAzurePlaywrightConfig(config, {
        exposeNetwork: '<loopback>',
        connectTimeout: 3 * 60 * 1000,
        os: ServiceOS.LINUX,
        credential: new DefaultAzureCredential(),
    }),

    {
        reporter: [
            ['list'],
            ['html', { open: 'never' }],
            ['@azure/playwright/reporter'],
        ],

        use: {
            screenshot: 'on',
            video: 'retain-on-failure',
            trace: 'on',
        },
    }
);