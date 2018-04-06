# ImageReconClient
This is an Angular B2B client relations management app. Features JWT sessions & validation, Data lazy loading, Immutable
state management (just in large data arrays) and AWS S3 integration

    # hosted at : https://b2b-crm-app.herokuapp.com
        
    # more info:
    - This project is deployed to heroku with an aot build script that runs on the heroku 
      server once deployed - creating the dist folder and all the necessary compiled js files 
      in it.
    - This project is served via express server serving up the index file ONLY - the rest of 
      the data is served to the client via calls to the external api b2b-crm-server 
      see repo at: https://github.com/jonsilver99/b2b-crm-server