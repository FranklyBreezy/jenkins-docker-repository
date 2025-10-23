// Declarative Pipeline
pipeline {
    // Run on any available Jenkins agent
    agent any

    // Tell Jenkins to install and use the Docker CLI tool
    tools {
        dockerTool 'docker-cli'
    }

    // Define environment variables
    // Define environment variables
    environment {
        // Your Docker Hub username
        DOCKERHUB_USER = "aakashsingh03"
    }

    stages {
        // Stage 1: Checkout code from GitHub
        stage('Checkout') {
            steps {
                // This will check out the code from the repo this Jenkinsfile is in
                checkout scm
            }
        }

        // Stage 2: Build, Test, and Package the User Service
        stage('Build User Service') {
            steps {
                // Change directory into the user-service folder
                dir('user-service') {
                    script {
                        // Build the Docker image. Jenkins automatically runs the
                        // 'RUN npm test' step inside the Dockerfile.
                        // If the tests fail, this 'docker.build' will fail.
                        def dockerImage = docker.build("${DOCKERHUB_USER}/user-service:latest", ".")
                    }
                }
            }
        }

        // Stage 3: Build, Test, and Package the Order Service
        stage('Build Order Service') {
            steps {
                dir('order-service') {
                    script {
                        def dockerImage = docker.build("${DOCKERHUB_USER}/order-service:latest", ".")
                    }
                }
            }
        }

        // Stage 4: Push images to Docker Hub (Task 4)
        stage('Push Images to Docker Hub') {
            steps {
                // Wrap the following steps in a 'script' block
                script {
                    // Log in to Docker Hub using the credentials ID we set up
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-creds') {
                        
                        // Push the user-service image
                        docker.image("${DOCKERHUB_USER}/user-service:latest").push()

                        // Push the order-service image
                        docker.image("${DOCKERHUB_USER}/order-service:latest").push()
                    }
                }
            }
        }

        // Stage 5: Deploy Containers (Task 5)
        stage('Deploy Services') {
            steps {
                // We use 'sh' to run shell commands. '|| true' means "don't fail the build if the container doesn't exist"
                
                // Stop and remove the old user-service container, if it exists
                sh "docker stop user-service || true"
                sh "docker rm user-service || true"
                
                // Stop and remove the old order-service container, if it exists
                sh "docker stop order-service || true"
                sh "docker rm order-service || true"
                
                // Deploy the new user-service image
                // We map host port 8000 to container port 3000
                sh "docker run -d --name user-service -p 8000:3000 ${DOCKERHUB_USER}/user-service:latest"
                
                // Deploy the new order-service image
                // We map host port 8001 to container port 3001
                sh "docker run -d --name order-service -p 8001:3001 ${DOCKERHUB_USER}/order-service:latest"
            }
        }
    }
}