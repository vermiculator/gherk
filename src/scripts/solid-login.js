 const credentials = {
        "idp"      : process.env.SOLID_IDP,
        "username" : process.env.SOLID_USERNAME,
        "password" : process.env.SOLID_PASSWORD,
    }
    const vaultBaseUrl = process.env.SOLID_VAULT_BASE_PATH
    const localVaultPath = process.env.LOCAL_VAULT_BASE_PATH
    const auth = require('solid-auth-cli')
    const FC   = require('solid-file-client')
    const { MERGE } = SolidFileClient
    const fc   = new FC( auth )

    async function getSession(){
        let session = await auth.currentSession()
        if (!session) { session = await auth.login(credentials) }
        console.log(`Logged in as ${session.webId}.`)
        return session
    }

    async function copy(){
        await getSession()
        if( fc.itemExists( vaultBaseUrl )) {
             try {
                console.log(`Loading from ${vaultBaseUrl}`)
                await fc.copyFolder( vaultBaseUrl, localVaultPath, {merge: MERGE.KEEP_SOURCE } )
                //this prioritises the Solid source
                //TODO how to keep most recently modified?
                // think i have to make my own sync option. ugh
                //TODO sync both ways and store sync debris

            }
            catch(error) {
                //console.log( error )         // full error response
                console.log( error.status )  // status code
                console.log( error.message ) // status code and statusText
            }
        }
    }

    copy()