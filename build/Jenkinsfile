pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_REGISTRY = "docker.io"
        DOCKER_BACKEND_IMAGE = "abinayabalusamy/hall-booking-backend"
        DOCKER_FRONTEND_IMAGE = "abinayabalusamy/hall-booking-frontend"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('server') {
                    sh 'docker build -t $DOCKER_BACKEND_IMAGE:$BUILD_NUMBER -t $DOCKER_BACKEND_IMAGE:latest .'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'docker build -t $DOCKER_FRONTEND_IMAGE:$BUILD_NUMBER -t $DOCKER_FRONTEND_IMAGE:latest .'
                }
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login $DOCKER_REGISTRY -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push Backend Image') {
            steps {
                sh 'docker push $DOCKER_BACKEND_IMAGE:$BUILD_NUMBER'
                sh 'docker push $DOCKER_BACKEND_IMAGE:latest'
            }
        }
        
        stage('Push Frontend Image') {
            steps {
                sh 'docker push $DOCKER_FRONTEND_IMAGE:$BUILD_NUMBER'
                sh 'docker push $DOCKER_FRONTEND_IMAGE:latest'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                // Update deployment YAML with new image tags
                sh "sed -i 's|abinayabalusamy/hall-booking-backend:.*|$DOCKER_BACKEND_IMAGE:$BUILD_NUMBER|g' k8s/deployment.yaml"
                sh "sed -i 's|abinayabalusamy/hall-booking-frontend:.*|$DOCKER_FRONTEND_IMAGE:$BUILD_NUMBER|g' k8s/deployment.yaml"
                
                // Apply the updated deployment
                sh 'kubectl apply -f k8s/deployment.yaml'
            }
        }
    }
    
    post {
        always {
            sh 'docker logout $DOCKER_REGISTRY'
            cleanWs()
        }
        success {
            echo 'Kongu Hall Booking System deployed successfully!'
        }
        failure {
            echo 'Deployment failed! Please check the logs for details.'
        }
    }
} 
