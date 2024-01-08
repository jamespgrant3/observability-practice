# Observability Practice

## Description
This is a project to gain more experience with observability. This project started as an [eks](https://github.com/jamespgrant3/eks-practice) project. I then wanted to try to recreate it using [ecs](https://github.com/jamespgrant3/ecs-practice). This project will focus on adding observability to the ecs project. I might revisit the eks project and do the same thing? I want to implement observability using two providers. I think I am going to use [Datadog](https://www.datadoghq.com/) and [New Relic](https://newrelic.com).

I will do this work in two branches: `datadog` and `newrelic`.

### Initial thoughts:
What I don't want to do, is focus on pipeline stuff. I want this time solely focused on learning about observability and the service provider.

## Overview
Two api's exist in this project, `api` and `user-api`, both are nestjs projects:

[api](api/README.md)

[user-api](user-api/README.md)

## Local
`cd` into the user-api directory. Start the api on port 4000 by running:
```
PORT=4000 npm run start:dev
```

`cd` into the api directory. Run:
```
npm run start:dev
```

This command automatically sets environment variables inside the `package.json`.

Now, if you navigate to `localhost:3000` you will greated with a hello world screen. If you navigate to `localhost:3000/users` an api call will be made to the users service.

## Deployment

### export variables for ease
```
export region=us-east-1
export aws_account_id=<enter aws account id here>
```

### deploy base infrastructure
Deploy the base infrastructure needed. This gives you a vpc, a couple of ecr repos, and ecs.

```
aws cloudformation create-stack \
--stack-name ecs-practice \
--template-body file://main.yml \
--parameters ParameterKey=EnvironmentName,ParameterValue=dev \
--capabilities CAPABILITY_NAMED_IAM
```

### docker authentication
Next, we need to authenticate to be able to push docker containers to ecr.

```
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $aws_account_id.dkr.ecr.$region.amazonaws.com
```

### build images for ecr
Now we can build the images.
First, build the user image. `cd` into the `user-api` directory and:

```
npm run dist:clear && \
npm run build && \
docker build --platform linux/arm64 -t $aws_account_id.dkr.ecr.$region.amazonaws.com/user-api:latest .
```

Now build the api image. `cd` into the `api` directory and:

```
npm run dist:clear && \
npm run build && \
docker build --platform linux/arm64 -t $aws_account_id.dkr.ecr.$region.amazonaws.com/api:latest .
```

### push images to ecr

Push the images to docker:

```
docker push $aws_account_id.dkr.ecr.$region.amazonaws.com/api:latest
```

```
docker push $aws_account_id.dkr.ecr.$region.amazonaws.com/user-api:latest
```

### usage

copy the dns address to your alb into your browser, this will display a hello world page. If that works, append a /users to the url and that should make a call to the user-api task running.
