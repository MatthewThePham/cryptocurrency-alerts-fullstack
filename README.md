## Live deployment 

https://cryptocurrency-alerts-fullstack.vercel.app/
Will be a crypto alerting and charting fullstack website, in freshing up my skills with next.js and spring boot. 
Infrastructure mainly azure containers and cosmosdb nosql. 

## Workflow

![My PNG Workflow](https://github.com/MatthewThePham/cryptocurrency-alerts-fullstack/blob/main/V1StockApp-2024-08-06.png)

The backend is a dockerized spring boot application, deployed on azure container apps. 
The frontend is a next.js app, deployed on vercel.

## General setup

Frontend setup....

From your terminal, run:

```
npm install
# or
yarn install
```

This will take a minute or two, but once that's done, you should be able to run the following command:

```
npm run dev
# or
yarn dev
```

This will start your project on `localhost:3000`


Backend setup...

I am using intellj, so I setup the pom.xml with the corresponding build run.
```
mvn spring-boot:run
```
    Specifics...
        Java 21.0.4
            Docker Openjdk:21
        Spring Boot 3.3.3
        Apache-maven-3.9.7


## More details in the backend and frontend folder.

