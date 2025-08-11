 const credentials = {
        "idp"      : process.env.SOLID_IDP,
        "username" : process.env.SOLID_USERNAME,                 
        "password" : process.env.SOLID_PASSWORD,
    }
    const vaultBaseUrl = process.env.SOLID_VAULT_BASE_URL
    const auth = require('solid-auth-cli')
    const FC   = require('solid-file-client')
    const fc   = new FC( auth )
    async function run(){
        let session = await auth.currentSession()
        if (!session) { session = await auth.login(credentials) }
        console.log(`Logged in as ${session.webId}.`)
        if( fc.itemExists(  )) {
             try {
                let content = await fc.readFile( vaultBaseUrl )
                console.log('found it')

            //now set up 'content' as graphql
            //how do i save a variable in node to be used by another script??

            }
            catch(error) {
                //console.log( error )         // A full error response 
                console.log( error.status )  // Just the status code of the error
                console.log( error.message ) // Just the status code and statusText
            }

        }
    }
        
    run()