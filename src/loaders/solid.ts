/* import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import type { Loader } from 'astro/loaders';

export const inruptSolidPodLoader: Loader = {
    name: 'inruptSolidPodLoader',
    load: async (context) => {
        let response = null;
        const idp = import.meta.env.SOLID_IDP;
        const username = import.meta.env.SOLID_USERNAME;
        const password = import.meta.env.SOLID_PASSWORD;
        const path = import.meta.env.SOLID_VAULT_BASE_PATH;
        const localPath = import.meta.env.SOLID_VAULT_BASE_PATH;
        const credentials = {
                "idp"      : idp,
                "username" : username,
                "password" : password,
            }

        const auth = require('solid-auth-cli');
        const FC   = require('solid-file-client');
        const fc   = new FC( auth );

        let session = await auth.currentSession();
        if (!session) { session = await auth.login(credentials) }
             console.log(`Logged in as ${session.webId}.`);
            if(await fc.itemExists( path )) {
                try {
                    console.log(`Loading from ${path}`);
                    response = await fc.readFolder( path );
                }
                catch(error) {
                        /*  if (typeof error === 'object' && error !== null) {
                            console.log(error);  // full error response
                        }
                        if (typeof error === 'object' && error !== null && 'status' in error) {
                            console.log((error as { status: unknown }).status);  // status code
                        } 
                        if (typeof error === 'object' && error !== null && 'message' in error) {
                            console.log((error as { message: unknown }).message); // status code and statusText
                            response = ((error as { message: unknown }).message); // status code and statusText

                        }
                }
            }

        context.logger.info(JSON.stringify(response));

    }
};


*/