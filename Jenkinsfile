@Library('jenkins-shared-library') _

pipeline {
    agent any

    environment {
        // for integration tests
        CI = "Jenkins"
        // for slack
        SERVICE_NAME = "prebid-outstream"

        // upload paths
        MINIO_BUCKET = "assets.h5v.eu"
        MINIO_PATH = "prebid-outstream"
    }

    tools {
        nodejs 'nodejs-14.5.0'
    }

    options {
        disableConcurrentBuilds()
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Upload to assets.h5v.eu') {
            steps {
                withAWS(endpointUrl: 'https://minio.gutefrage.net', credentials: 'minio') {
                    echo 'starting upload to minio'
                    s3Upload(
                        workingDir: 'dist',
                        includePathPattern: 'bundle.js*',
                        bucket: "${MINIO_BUCKET}",
                        path: "${MINIO_PATH}/${BUILD_NUMBER}",
                        pathStyleAccessEnabled: true,
                        cacheControl: 'public,max-age=31536000,immutable',
                        contentType: 'text/javascript;charset=utf-8'
                    )
                }
            }
        }

    }

    post {
        success {
            markBuildAsSuccessful()
        }
        unstable {
            markBuildAsUnstable()
        }
        failure {
            markBuildAsFailed()
        }
    }
}
