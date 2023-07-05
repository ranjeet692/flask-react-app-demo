pipeline {
    agent {
        label 'linux'
    }
    
    environment {
        DATABASE_TEST_URL = ""
    }
    stages {
        stage('Python Version Check') {
            steps {
                sh 'python3 --version'
                sh 'pip3 --version'
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
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'sonarqube-scanner'
            }
            steps {
                withSonarQubeEnv(installationName:'sonarqube-aws') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 30, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
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
            when {
                branch 'dev'
            }
            steps {
                // Merge the code to the master branch
                script {
                    git branch: 'main',
                        changelog: false,
                        credentialsId: 'git-cred',
                        fastForwardMode: 'FF',
                        strategy: 'default',
                        mergeRemote: 'origin',
                        mergeTarget: 'origin/main'
                }
            }
        }
        stage('Push to Main') {
            when {
                branch 'dev'
            }
            steps {
                // Push the changes to the master branch
                script {
                    git push 'origin', 'main'
                }
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
