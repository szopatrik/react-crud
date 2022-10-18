# React CRUD app

Simple Node.js/Typescript app where backend is also serving React frontend. Allows user to craate, read, update and delete data from Firebase db.

## Deployment

1. run `cd backend`
2. optionally: `chmod +x ./deploy.sh`
3. run `./deploy.sh`

## Developer notes

*Optional refactoring needed, for example:*
- basic auth is not considered as safe method, could be replaced
- deployment could be using CI/CD pipeline instead of bash script
- app could be dockerized and run in Kubernetes cluster

## Test the app

You are welcome to test the app at https://europe-west3-react-crud-2e223.cloudfunctions.net/react-crud
Username and password on request.