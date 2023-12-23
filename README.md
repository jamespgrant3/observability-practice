# EKS Practice

## Description
This is a project to gain more experience with EKS. I have a core understanding of k8s, but I have never really deployed anything using it. I want to change that.

### Initial thoughts:
What I don't want to do, is focus on pipeline stuff. I want this time solely focused on learning the cloud service. So, there might be some manual pushing of images to ECR, etc. But, I want all the code to be public. In the end, you should be able to recreate this entire project in your AWS environment.

I am positive the vision will change as I learn what I am doing.

When I was looking at EKS before, the only way to get two EKS tasks to communicate cleanly through DNS was to use Cloud Map?? Maybe that's changed, but I want to try it. I could throw these containers in the same task, but ideally I want to scale them independently.

I'd like to have three EKS tasks: ui, api, and users api.

The ui pod is self explanatory. The api is like a orchestration layer, it just makes calls to other services. In this case, the api will call the users api. This will get us that pod-to-pod communication. That api call will just return some hard-coded data.

The only code I plan to jack, is the scaffolding of the vpc. Outside of that, I will write everything.

## Overview
Two api's exist in this project, `api` and `user-api`, both are nestjs projects:

[api](api/README.md)

[user-api](user-api/README.md)

Locally, you should run each project using `npm run start:dev`. This ensures both api's run on different ports.
The `api` will run on `3000` and the `user-api` will run on `4000`.
