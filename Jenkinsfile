pipeline {
    agent any

    environment {
        // AWS Credentials should be configured in Jenkins Credentials
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION    = 'us-east-1' 
        
        S3_BUCKET             = 'homedine-frontend-bucket-047399020926-us-east-1-an' // REPLACE THIS with your bucket name
        CLOUDFRONT_DIST_ID    = 'EB4MXBEK1J7N2' 
        
        EC2_PUBLIC_IP         = '54.236.34.160' 
        DOCKER_IMAGE          = 'homedine-backend'
    }

    stages {
        stage('Deploy Frontend to S3') {
            steps {
                dir('frontend') {
                    // We build locally on Jenkins only the necessary parts or sync
                    // Since GitHub built it, we can actually just sync if we have the files.
                    // For now, let's keep it simple: Jenkins will only build the Backend.
                    sh 'npm install --no-audit --no-fund'
                    sh 'npm run build'
                }
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
                script {
                    // Since Jenkins is on the same machine as the backend, 
                    // we don't need SSH. We just run docker commands directly.
                    sh "docker stop homedine-api || true"
                    sh "docker rm homedine-api || true"
                    sh "docker run -d --name homedine-api -p 5000:5000 --env-file /home/ubuntu/.env ${DOCKER_IMAGE}:latest"
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
