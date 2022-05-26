#!/bin/bash

name12=$(kubectl get deployment npm -o=jsonpath='{$.spec.template.spec.containers[:1].image}')

while [[ ${name12} == kavashu/docker-npm-temp:value]];
do
    echo Deployment is running

done

echo Deployment is completed
