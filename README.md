# Introduction

Continuous Integration and Continuous Deployment (CI/CD) are foundational practices in modern DevOps. They automate testing and deployment processes, enhancing operational efficiency and code quality while reducing manual errors. CI/CD accelerates release cycles, enabling faster time-to-market and minimal downtime.

# Project Scope

- Automate the software development lifecycle to build, test, and deploy applications consistently.
- Leverage GitHub Actions CI/CD to automate steps like code integration, testing, versioning, and deployment.
- Containerize the application using Docker and deploy it to a Kubernetes cluster for scalability.
- Implement deployment monitoring and synchronization using ArgoCD.

![image](https://github.com/user-attachments/assets/d91997ed-fb29-409b-8914-f32901c0c39f)


## Prerequisites

- A GitHub account
- An AWS account
- A containerization system account (e.g., Docker, Podman, CRI-O)
- Basic understanding of YAML syntax for pipeline configuration
- An ArgoCD account

## Step 1: Create a GitHub Action Workflow

1. Log into your GitHub account.
2. Create a repository for this project.
3. Add a `.github/workflows` directory in the repository.
4. Create a YAML file (e.g., `ci-cd.yaml`) inside the workflows directory.
5. Pass your source code to the repository where `.github/workflows` is domiciled.

## Step 2: Configuring Your Workflow (YAML Syntax)

1. **Name your workflow**: Define the workflow name (e.g., `CI/CD Pipeline`).
2. **Specify event trigger**: Choose an event like `push` or `pull_request` to trigger the workflow.
3. **Select a runner**: Choose hosted or self-hosted runner.
4. **Define Actions**:

### Action 1: Perform Code Test (Shift Left)

**Steps:**

- Checkout the code.
- Install dependencies and set up Node.js.
- Run tests using `npx jest`.

### Action 2: Check & Create Amazon ECR Repository

**Steps:**

- Use the AWS action `aws-actions/amazon-ecr-login@v1` for logging into ECR.
- Check if the repository exists and create it if not.

**Requirements:**

- Pass AWS configurations (e.g., access key, secret key) in the workflow.

### Action 3: Docker Build and Push

**Steps:**

- Build the Docker image using the `Dockerfile`.
- Tag and push the image to ECR.

**Requirements:**

- Ensure the `Dockerfile` is in the repository.
- Pass Docker credentials.

## Step 3: Deploying to Kubernetes (Testing)

### Option 1: For Cloud-Hosted Clusters

Add a GitHub Actions pipeline to deploy applications to a Kubernetes cluster.

**Steps:**

- Log in to ECR and pull the Docker image.
- Apply Kubernetes deployment configurations.

**Requirements:**

- Include the deployment configuration in the repository.
- Use IAM credentials with permissions for ECR and Kubernetes.

### Option 2: For Local Clusters (e.g., Docker Desktop)

Pull the image from ECR to a local Kubernetes cluster, e.g., Docker Desktop.

1. **Pass Credentials:**  (replace "region" with your AWS region eg us-east-1. replace "aws_account_id" with your AWS acct. id)
   ```bash
   aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
2. **Pull the image to Docker Desktop:**
    ```bash
   docker pull aws_account_id.dkr.ecr.ca-central-1.amazonaws.com/amazonlinux:latest
## Step 4: Set Up ArgoCD Application and Directory Path

1. Ensure ArgoCD is set up and has access to the Git repository.
2. Deploy an application manifest to the ArgoCD namespace (the ArgoCD namespace must have been created).
3. Define:
   - The source repository (e.g., Helm chart location).
   - The directory path for monitoring deployments.
4. ArgoCD will automatically sync and deploy changes.

## Step 5: Create Helm Chart

1. **Create a Helm chart:**  
   ```bash
   helm create <chart_name>
2. **Update the chart:**
   - Specify the Docker image and tag.
   - Configure replicas, services, health probes, and other container patterns.
3. Push the chart to git and merge to main/master branch.
4. Refresh you ArgoCD UI to observe the deployment.
# Conclusion
This CI/CD pipeline integrates GitHub Actions, Docker, Kubernetes, and ArgoCD for a streamlined deployment process. By following these steps, you ensure automated testing, reliable deployments, and scalable application management.



