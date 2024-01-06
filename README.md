# ECS Practice

## Description
This is a project to gain more experience with ECS, more specifically task communication. I also hope to layer in observability.

### Initial thoughts:
What I don't want to do, is focus on pipeline stuff. I want this time solely focused on learning the cloud service. So, there might be some manual pushing of images to ECR, etc. But, I want all the code to be public. In the end, you should be able to recreate this entire project in your AWS environment.

I am positive the vision will change as I learn what I am doing.

## Overview
Two api's exist in this project, `api` and `user-api`, both are nestjs projects:

[api](api/README.md)

[user-api](user-api/README.md)

## Local
`cd` into the user-api directory. Start the api on port 4000 by running:
```
PORT=4000 npm run start:dev
```

`cd` into the api directory. Start the api on port 3000, and use an environment variable to tell the api where the user-api is. Run:
```
USER_API_HOST=localhost:4000 npm run start:dev
```

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
