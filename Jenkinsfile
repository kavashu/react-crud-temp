node {


   stage('SCM') {
    checkout scm
  }
  stage('SonarQube Analysis') {
   def scannerHome = tool name: 'sonarqube';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner"
    }
  }
  stage('Build & Test')
  {
	  sh '''
	        npm install
	        docker run --rm -i -v $PWD:/testproject -p 3000:3000 -w /testproject kavashu/npm bash
			npm test -all
	     '''
  }
  stage('artifactory')
  {
    
	  sh '''

            npm config set registry https://shubhamdevops1.jfrog.io/artifactory/api/npm/default-npm-virtual/
			sed -i "s/0.0.1/0.0.${BUILD_NUMBER}/" $PWD/package.json
            npm publish 
			exit
	     '''
  }
  stage('push')
  {
      withCredentials([usernamePassword(credentialsId: 'docker credentials', passwordVariable: 'password', usernameVariable: 'username')]) {
           
            sh 'docker login -u ${username} -p ${password}'
        }   
	  sh '''
        
        docker-compose build 
	    docker push kavashu/docker-npm-temp:${BUILD_NUMBER}
      docker rmi kavashu/docker-npm-temp:${BUILD_NUMBER}  
	     '''
  }
  stage('deploy')
  {
    
    sh 'sed -i "s/value/${BUILD_NUMBER}/" $PWD/ansible/tmp.sh'
    sh 'sed -i "s/value/${BUILD_NUMBER}/" $PWD/ansible/playbook.yaml'

    withCredentials([usernamePassword(credentialsId: 'master_ansible_credentials', passwordVariable: 'password', usernameVariable: 'username')]) {
           
         
               sh 'sed -i "s/username1/${username}/" $PWD/ansible/inventory.txt'
               sh 'sed -i "s/password1/${password}/" $PWD/ansible/inventory.txt'
               withCredentials([string(credentialsId: 'ansible_vault_secret_pass', variable: 'SECRET')]) {
              
                            sh 'sed -i "s/value/${SECRET}/" $PWD/ansible/vault_secret.sh' 
         sh 'ansible-playbook -v $PWD/ansible/playbook.yaml -i $PWD/ansible/inventory.txt --vault-password-file $PWD/ansible/vault_secret.sh'
         }     
               
        }  
    
  }
}