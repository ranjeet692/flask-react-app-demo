# Demo Flask and React App

## Running App

### Prerequisite

1. Python 3.9
2. Pip
3. NodeJS 16
4. npm
5. Postgresql 14

Goto app home folder

**Install python dependencies**

```
python3 -m pip install -r requirements.txt
```

**Build react app**

```
cd frontend
npm install
npm run build
```

** Environment Variable**

```
cd ..
touch .env
```

add DATABASE_URL variable and its value.
example
DATABASE_URL=postgresql+psycopg2://user:password@url/db_name

**Run python app**

```
python run.py
```

Open the App at [http://127.0.0.1:8000](http://127.0.0.1:8000/)

### How to use app

**Home Page**
![App UI](assets/app-sample.png)

Currently, this app has only one page. This page has three functions

1. Upload a File - Sample files are available in sample_data folder
2. Data Table - Sorting and Edit Action
3. Edit Record - Can update gdp numbers for 2019, 2020 and 2021

## CI/CD Pipeline

On push to dev branch, a jenkins job get triggers and execute a jenkins pipeline.

**[Jenkinsfile](Jenkinsfile)**

Jenkins Server: [http://18.139.225.122:8080/](http://18.139.225.122:8080/)

Sonarqube Server: [https://13.214.174.15/](https://13.214.174.15/)

![Jenkins UI](assets/jenkins-screen.png)

## Known Issues

* UI needs more refinement and there is an issue with axios libray in react to parse json data while fethcing data from flask app for some version of axios. Still trying to find the suitable version. [ Issue Link](https://github.com/axios/axios/issues/1723)

* I am using Sonarqube by Bitnami on AWS, it has ssl certification issue. This is making sonar-scanner scan to fail

* Current I am running a free version of micro instance for Jenkins Server, That server is unable to build react app. while attempting builds, server is getting unresponsive and need to restart. Need to create a seperate node/agent for pipeline execution.

![spnarqube](assets/sonarqube-fail.png)

## Future Work

* Seprate Node to run the pipeline. Currently pipeline is using same jenkins server to run the pipeline. I am planning to create a seperate node through docker on aws to run the pipeline.

* Seprate pages for upload and display datatable
* Add pagination in data table

## References

App: Flask + React
https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
https://dev.to/matheusguimaraes/fast-way-to-enable-cors-in-flask-servers-42p0

Jenkins Server
https://hub.docker.com/_/jenkins/

https://plugins.jenkins.io/pipeline-github/
https://www.cprime.com/resources/blog/how-to-integrate-jenkins-github/
https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/

Sonarqube
https://docs.sonarqube.org/10.1/analyzing-source-code/scanners/sonarscanner/