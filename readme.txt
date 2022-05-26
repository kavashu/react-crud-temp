SONAR
cd /tmp/testproject
cp -r node_modules/ react-crud/
cd react-crud
docker run \
    --rm \
    -e SONAR_HOST_URL="http://192.168.0.178:9000/" \
    -e SONAR_LOGIN="33168419e80ffde95f1d3fc60c737d876bd4d1eb" \
    -v "$PWD:/usr/src" \
    sonarsource/sonar-scanner-cli

BUILD

cd /tmp
docker run --rm -it -v $PWD/testproject:/testproject -p 3001:3000 -w /testproject kavashu/npm bash

TEST

npm test -all
q


ARTIFACTORY
npm config set registry http://192.168.0.178:8081/artifactory/api/npm/react-npm/
npm publish
exit

PUSH
docker-compose build 
docker push kavashu/docker-rect-npm:${BUILD_NUMBER}

DEPLOY

docker run -p 3002:3000 kavashu/docker-rect-npm:${BUILD_NUMBER}
