pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies...'
        sh 'npm install'
      }
    }
    stage('Lint') {
      steps {
        echo 'Running prettier...'
        sh 'npm run prettier'
      }
    }
    stage('Build') {
      steps {
        echo 'Building the project...'
        sh 'npm run build'
      }
    }
    stage('Test') {
      steps {
        echo 'Starting tests...'
        sh 'npm test'
        sh 'npm run test:coverage'
      }
    }
  }
}