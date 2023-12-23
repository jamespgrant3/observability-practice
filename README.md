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

Locally, you should run each project using `npm run start:dev`. This ensures both api's run on different ports.
The `api` will run on `3000` and the `user-api` will run on `4000`.
