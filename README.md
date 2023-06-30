# Demo Flask and React App

## Running App

### Prerequisite

1. Python 3.9
2. Pip
3. NodeJS
4. npm

Goto app home folder

Install python dependencies

```
python3 -m pip install -r requirements.txt
```

Build react app

```
cd frontend
npm install
npm run build
```

Run python app

```
python run.py
```

### References

App: Flask + React
https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
https://dev.to/matheusguimaraes/fast-way-to-enable-cors-in-flask-servers-42p0

Jenkins Server
https://hub.docker.com/_/jenkins/

docker run --name jenkins-local -d -p 8080:8080 -p 50000:50000 -v jenkins:/var/jenkins_home jenkins/jenkins
admin admin

https://plugins.jenkins.io/pipeline-github/
https://www.cprime.com/resources/blog/how-to-integrate-jenkins-github/
https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm/