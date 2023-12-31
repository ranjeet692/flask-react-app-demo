pipeline {
    agent any
    
    environment {
        DATABASE_TEST_URL = ""
    }
    stages {
        stage('Python Version Check') {
            steps {
                sh 'python3 --version'
                sh 'pip --version'
            }
            post {
                success {
                    echo 'Python Version Check was Successful!'
                }
                failure {
                    echo 'Python Version Check Failed!'
                }
            }
        }
        stage('Flask Unit Testing') {
            steps {
                sh 'python3 -m pip install -r requirements.txt'
                sh 'python3 -m unittest test.py'
            }
            post {
                success {
                    echo 'Flask Unit Test was Successful!'
                }
                failure {
                    echo 'Flask Unit Test Failed!'
                }
            }
        }

        /* Skipping this since server size is small and it takes a lot of time to build
        Need master slave configuration to run this
        stage('Build React App') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
            post {
                success {
                    echo 'React Build was Successful!'
                }
                failure {
                    echo 'React Build Failed!'
                }
            }
        }*/
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(installationName:'sonarqube-aws') {
                    sh "sonar-scanner"
                }
            }
            post {
                success {
                    echo 'Flask Sonarcube Test was Successful!'
                }
                failure {
                    echo 'Flask Sonarcube Test Failed!'
                }
            }
        }
        
        stage('Merge to Main') {
            steps {
                git credentialsId: 'git-cred', url: 'https://github.com/ranjeet692/flask-react-app-demo.git'
                sh 'git checkout main'
                sh 'git merge origin/dev'
                sh 'git push origin main'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
