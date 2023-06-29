pipeline {
    agent any
    
    environment {
        DATABASE_URL=""
    }
    stages {
        stage('Flask Unit Testing') {
            steps {
                git branch: 'dev', url: 'https://github.com/ranjeet692/flask-react-app-demo.git'
                sh 'pip install -r requirements.txt'
                sh 'python -m unittest test.py'
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
        }

        stage('Flask App Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh 'sonar-scanner'
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
        
        stage('React App Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    dir('frontend') {
                        sh 'sonar-scanner'
                    }
                }
            }
            post {
                success {
                    echo 'React Sonarcube Test was Successful!'
                }
                failure {
                    echo 'React Sonarcube Test Failed!'
                }
            }
        }
        
        stage('Merge to Main') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
                sh 'git merge dev'
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
