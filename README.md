# CIS
Child Impact Statements - NestJS Backend

## Context

The Child Impact Statements Map is a public tool that we believe can aid Shelby County policy makers in answering fundamental questions about how a policy may benefit or harm a child. There is various data within the map that can give more insight on youth and the institutions that shape them in Shelby County.

## Setup

1. Ensure the npm dependencies are installed: `npm i`.
2. Create a `.env` file based on the template:
```text
CENSUS_API_KEY=123123123123123123123
NODE_ENV=development
```

Also note that the Census API key (`CENSUS_API_KEY`) is optional here. 
If you do not have a key or you wish to run the backend without a key,
just omit this line in your `.env` file.

Additionally, to use a Redis instance for caching, please set the `REDIS_URL` environment variable,
either in your `.env` file or passing it in the execution context.

3. Start the backend by running either `npm run start` or `npm run start:dev`

## Building
To build the server, please run `npm run build`. The resulting files will be available in `dist/`.

## Deploying

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/COMP-4882-CIS/CIS)


## Notes
If you plan to build and run this application for local development, please run `npm run start:dev`, 
otherwise you will have to manually restart the server each time you make a change.

### Updating SCS Data
By default, without a `membership.json` file in `src/schools/data`, the application service will try and parse
`membership.xlsx` in `src/schools/data`, which is available at https://www.tn.gov/content/dam/tn/education/data/membership201920.xlsx.

Note, parsing the Excel spreadsheet in its default form will take a lot of memory and a good bit of time. It is recommended that you shrink
the data in the Excel spreadsheet to only include the Shelby Country district.

Once the Excel spreadsheet is parsed, the data is cached in `membership.json`.

### Help

[Maintenance and Help Guide](https://github.com/COMP-4882-CIS/CIS/blob/main/Maintenance%20and%20Help%20Guide.pdf)

[Softwware Architecture Document](https://github.com/COMP-4882-CIS/CIS/blob/main/CIS-Software-Architecture-Document.pdf)

[Source Code Document](https://github.com/COMP-4882-CIS/CIS/blob/main/CIS-Source-Code-Document.pdf)
