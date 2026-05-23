pipeline {
    agent any

    environment {
        // AWS Credentials should be configured in Jenkins Credentials
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION    = 'us-east-1' 
        
        S3_BUCKET             = 'homedine-frontend-bucket-047399020926-us-east-1-an' // REPLACE THIS with your bucket name
        CLOUDFRONT_DIST_ID    = 'D3CZZAQNPSJLX6' 
        
        EC2_PUBLIC_IP         = '54.236.34.160' 
        DOCKER_IMAGE          = 'homedine-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy Frontend to S3') {
            steps {
                sh "aws s3 sync frontend/dist/ s3://${S3_BUCKET} --delete"
                sh "aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DIST_ID} --paths '/*'"
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Deploy Backend to EC2') {
            steps {
                // This assumes Jenkins has SSH access to the backend EC2
                // and the image is shared or pushed to a registry.
                // For simplicity, if Jenkins is on the same machine or can SSH:
                script {
                    def remote = [:]
                    remote.name = 'backend-server'
                    remote.host = EC2_PUBLIC_IP
                    remote.user = 'ubuntu'
                    remote.allowAnyHosts = true
                    
                    // Note: You need to setup SSH credentials in Jenkins
                    withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'identity')]) {
                        remote.identityFile = identity
                        
                        // Copy the docker image or use a registry. 
                        // Using a registry is better. For now, let's assume we push to ECR.
                        // If not using registry, we can save and load (less efficient)
                        sh "docker save ${DOCKER_IMAGE}:latest | ssh -i ${identity} ubuntu@${EC2_PUBLIC_IP} 'docker load'"
                        
                        // Restart the container
                        sh "ssh -i ${identity} ubuntu@${EC2_PUBLIC_IP} 'docker stop homedine-api || true && docker rm homedine-api || true && docker run -d --name homedine-api -p 5000:5000 --env-file /home/ubuntu/.env ${DOCKER_IMAGE}:latest'"
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
