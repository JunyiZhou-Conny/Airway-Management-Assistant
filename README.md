# CS 370 Pediatric Savior Airway Management Simulation Chatbot

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview-of-the-project">Overview of the Project</a></li>
    <li><a href="#user-guide">User Guide</a>
      <ul>
        <li><a href="#guide-for-residents">Guide For Residents</a>
          <ul>
            <li><a href="#sign-up-sign-in1">Sign-Up/Sign-In</a></li>
            <li><a href="#airway-management-assistant1">Airway Management Assistant</a></li>
          </ul>
        </li>
        <li><a href="#guide-for-researchers">Guide For Researchers</a>
          <ul>
            <li><a href="#sign-up-sign-in2">Sign-Up/Sign-In</a></li>
            <li><a href="#airway-management-assistant2">Airway Management Assistant</a></li>
            <li><a href="#data-collection">Data Collection</a></li>
            <li><a href="#chat-history">Chat History</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#frontend-design">FrontEnd Design</a>
      <ul>
        <li><a href="#react-framework-chatbot-interface">React Framework ChatBot Interface Design</a></li>
        <li><a href="#data-collection-page-design">Data Collection Page Design</a></li>
        <li><a href="#chat-history-design">Chat History Design</a></li>
        <li><a href="#authentication-with-auth0">Authentication With Auth0</a></li>
      </ul>
    </li>
    <li><a href="#backend-design">BackEnd Design</a>
      <ul>
        <li><a href="#mongodb-database">MongoDB Database</a></li>
        <li><a href="#gpt-training">GPT Training</a></li>
      </ul>
    </li>
    <li><a href="#aws-hosting">AWS Hosting</a>
      <ul>
        <li><a href="#backend-hosting-aws-elastic-beanstalk">Backend Hosting - AWS Elastic Beanstalk</a></li>
        <li><a href="#frontend-hosting">FrontEnd Hosting</a></li>
        <li><a href="#Obtaining-SSL-Certificate-and-Domain Purchases">Obtaining SSL Certificate and Domain Purchases</a></li>
        <li><a href="#Adding-SSL-Certificate-and-DNS-Configuration">Adding SSL Certificate and DNS Configuration</a></li>


## Overview of the Project
<p>This section will provide a comprehensive overview of the Pediatric Savior Airway Management Simulation Chatbot project, including its objectives, scope, and impact on pediatric care training.</p>

## User Guide
### Guide For Residents
#### Sign-Up/Sign-In

<a name="sign-up-sign-in1"></a>

<p>Instructions for residents to sign up and sign in to the system.</p>

#### Airway Management Assistant

<a name="airway-management-assistant1"></a>

<p>Details on how residents can use the airway management assistant feature.</p>

### Guide For Researchers

<a name="sign-up-sign-in2"></a>

#### Sign-Up/Sign-In
<p>Instructions for researchers to sign up and sign in to the system.</p>

#### Airway Management Assistant

<a name="airway-management-assistant2"></a>

<p>Explanation of how the airway management assistant supports researchers.</p>

#### Data Collection
<p>Guidelines on how researchers can collect and manage data.</p>

#### Chat History
<p>Information on accessing and utilizing chat history for research purposes.</p>

## FrontEnd Design
<a name="react-framework-chatbot-interface"></a>

### React Framework ChatBot Interface Design

The `ChatbotUi` component is designed to facilitate interactive conversations with a ChatGPT-like model by managing message exchanges and dynamic content within a chat interface.

#### State Management
The component leverages React's `useState` hook to manage various states:
- `messages`: An array of message objects representing the conversation history.
- `userInput`: The current text input from the user.
- `isLoading`: Indicates whether the chatbot is generating a response.
- `loading`: Tracks the initialization status of the chatbot.

#### Key Functionalities
- **Message Handling**: Users can send messages through an input form, which are then processed by a backend server. Responses from the chatbot, including text and images, are fetched and displayed in the chat window.
- **Image Fetching**: If a response includes an image reference, the component fetches and displays this image as part of the conversation.
- **Conversation Initialization and Reset**: Provides functionality to reset the chat to a clean state and reinitialize the conversation.
- **Automatic Scrolling and Session Storage**: Implements automatic scrolling to the latest messages and stores the conversation history in session storage to preserve chat state across page reloads.

#### Effects and Refs
- **Auto-scroll Effect**: Uses `useEffect` to automatically scroll the chat window to the latest message when the `messages` array is updated.
- **Session Storage Effect**: Another `useEffect` ensures the conversation history is either retrieved from session storage or initialized afresh when the component mounts.
- **Chat Window Reference**: Utilizes `useRef` to reference the chat window DOM element for auto-scrolling functionalities.

#### User Interface
- **Chat Window**: Displays messages as either text or images, with visual differentiation between user and bot messages.
- **Input Form**: Includes text input for messages, a submit button to send messages, and a reset button to clear the chat history.
- **Loading Indicators**: Displays visual indicators during chatbot response generation and initialization, enhancing the interactive experience.

### Data Collection Page Design
Designed to manage complex forms for collecting detailed medical scenario data, utilizing React's state management capabilities.

#### State Management
- `formData` for storing detailed patient and scenario information.
- `phases` for managing an array of medical phases, each containing specific medical data.
- `isSubmitting` to control the submission process and prevent duplicate submissions.

#### Form Handling Functions
- `handleChange` updates nested fields within `formData`.
- `handlePhaseChange` updates nested fields within a specific phase in the `phases` array based on user interaction.
- `addPhase` allows users to dynamically add new phases to the form.
- `handleSubmit` handles form submission, sending data to a server and managing the submission status.

#### User Interface
The form is divided into multiple sections to input various types of data:
- Scenario outlines and objectives.
- Patient basic information and medical history.
- Detailed inputs for each phase including vital signs and medical procedures.
Dynamic form sections allow for the addition of new phases as needed.
Submission controls include buttons for adding phases and submitting the entire form.

#### Interaction
Users can input and edit data across various nested fields and dynamically add more phases as required. The form provides comprehensive data collection capabilities with structured input handling for complex scenarios, making it suitable for detailed medical data entry tasks.

### Chat History Design
Fetches and displays chat history based on user inputs using React framework.

#### State Management
The component maintains several pieces of state:
- `participantID`: Stores the inputted participant ID.
- `dateFilter`: Holds the selected date to filter the chat history.
- `chatHistory`: Contains the fetched chat conversations, organized by date.
- `error`: Captures and displays any errors during the chat data fetching process.

#### Event Handlers
- **handleParticipantIDChange**: Updates the `participantID` state with the user's input.
- **handleDateChange**: Sets the `dateFilter` state based on the user's date selection.

#### Data Fetching and Processing
- **fetchChatHistory**: An asynchronous function that:
  - Retrieves chat history data from a specified endpoint using the participant ID.
  - Processes this data to group messages by their respective dates.
  - Applies a date filter if specified.
  - Handles any errors by setting the `error` state.

#### Rendering
The component renders the following UI elements:
- **Input Fields**: For entering the participant ID and selecting a date filter.
- **Fetch Button**: Triggers the chat history fetching process.
- **Error Display**: Conditionally shown if an error occurs during data fetching.
- **Chat Logs**: Displays the chat history, grouped by date, if available.

### Authentication With Auth0
<p>Overview of how Auth0 is used for authentication in the frontend.</p>

## BackEnd Design
### MongoDB Database
<p>Description of the MongoDB database setup and schema used for the project.</p>

### GPT Training
<p>Insight into how GPT models are trained for this project.</p>

## AWS Hosting

Our final product is hosted on the Internet to allow public access utilizing AWS as our intermediary. In particular, we utilized 2 services offerred by AWS: Amazon S3 bucket and Amazon Elastic Beanstalk. Each service is responsible for different roles which are specified below.

Here is the heuristic between how these 2 services interact with each other:

1.  **AWS Elastic Beanstalk**: This service allows you to deploy and scale web applications and services quickly. You can upload your application code to Elastic Beanstalk, and it automatically takes care of deployment details like capacity provisioning, load balancing, auto-scaling, and health monitoring. It supports a range of programming languages and integrates with services such as EC2 and Elastic Load Balancing, making it easier to manage applications without deep knowledge of the infrastructure ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/)) ([AWS Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)) ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).
2.   **Amazon S3 Bucket Static Website Hosting**: This service enables you to host a static website on Amazon S3. By enabling this feature on an S3 bucket, you can serve static content (HTML, CSS, JavaScript, images) directly from S3, a highly durable and available storage service. It simplifies web hosting without the need for a server, since S3 can deliver the content directly to the web browser ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).
3.  **Amazon Route 53 Domain Name Purchases**: Amazon Route 53 is a scalable and highly available Domain Name System (DNS) web service. It not only routes users to your internet applications by translating domain names into IP addresses but also allows you to purchase and manage domain names. Through Route 53, you can buy domain names and automatically configure DNS settings for them ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).
4.   **Amazon CloudFront**: This is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds. CloudFront integrates with other Amazon Web Services products to give developers and businesses an easy way to distribute content to end-users with no minimum usage commitments ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).



<a name="backend-hosting-aws-elastic-beanstalk"></a>

### Backend Hosting - AWS Elastic Beanstalk
#### Preparing the Backend for Deployment

1. **Set Up Docker:**

   - Download Docker Desktop, which includes the Docker CLI tool.
   - Create a new folder for all backend-related files to prevent affecting the existing GitHub repository.

2. **Create Dockerfile:**

   - In VS Code, use the Command Palette (`Cmd+Shift+P`) and select `Docker: Add Docker Files to Workspace`.

3. **Generate `requirements.txt`:**

   - Activate a local virtual environment:

     ```bash
     python3 -m venv myenv
     source myenv/bin/activate
     ```

   - Freeze the current dependencies into `requirements.txt`:

     ```bash
     #pip3 install (whatever packages are needed for this project)
     #Current necessities:
     pip3 install pymongo
     pip3 install flask
     pip3 install openai
     pip3 install flask-cors
     pip3 install python-dotenv
     pip3 freeze > requirements.txt
     ```

4. **Build Docker Image:**

   - Ensure Docker Desktop is running.

   - Use the command:

     ```bash
     docker build -t my-flask-app .
     ```

     (Replace `my-flask-app` with your preferred image name and include the dot at the end.)

5. **Test Docker Image Locally:**

   - Run the following command:

     ```bash
     docker run -p 4999:4999 my-flask-app
     ```

6. **Set Up `gunicorn`:**

   - Add `gunicorn==20.0.4` to `requirements.txt`.

7. **Create an `env.list`:**

   - Store all the secrets and environment variables.
   - Optionally, you can add the environment variables to EBS during environment creation
   - You can also add extra environment variables after the initial creation of the environment, go to configuration on the left panel of the sidebar

8. **Modify Application Entry Point:**

   - Adjust the path to `main.py` in your application.
   - Especially the path of our instruction_text. You can leave the conversation simulation file unchanged as we have figured out a way to extract these cases from the mongodb

9. **Test Endpoint:**

   - Add a root route to `application.py` to test connectivity:

     ```python
     @app.route('/')
     def home():
         return 'Backend API is running. Use the appropriate endpoints for API functionality.'
     ```

10. **Address Port Permission Denied Issue:**

    - If encountering permission denied on a port (like 80), it may be occupied. Try another port or use sudo for privileged ports on Unix systems.
    - If you are working on port 4999, then things should be working fine.

#### Deploying with Elastic Beanstalk

1. **Upload and Deploy:**
   - Zip all the files needed for the backend and upload to AWS Elastic Beanstalk.
     - Dockerfile
     - requirements.txt
     - application.py
     - AssistantAPICall folder
     - env.list is optional if you pass the environment variable into the environment through configuration
   - Be sure to choose Dokcer as your platform when creating the environment
   - Use VPC and choose corresponding subnets
   - Go to configuration and open the elastic load balancer option and add new listener on port 443 that accepts HTTPS request. To accomplish this, you need SSL certificate and custom domain name. Check the section later for a detailed review
   - Deploy the version and verify the application is running by visiting the provided endpoint.
   - Below is a screenshot of our application versions. Each docker zip contains the files mentioned above:
     ![Application Version](https://github.com/liuximeng2/README_IMAGE/Application_Version.png)
### FrontEnd Hosting
#### Configuring Frontend with S3 Bucket

1. **Prepare Local Frontend Copy:**
   - Clone the frontend repository into a local folder. Update the API calls as necessary.
   - Updating the API call is of great importance especially after setting the backend configuration. We have api.connyzhou.com as the API entry.  You might be wondering why that is the case. This is due to that Auth0 requires HTTPS protocols. Check the SSL Certificate section for detail overview. So be sure to modify all of the fetch functions. For instance, when running on your local machine, you might be calling to http://localhost4999/submit-user-input. Modify this to https://api.conyzhou.com/submit-user-input when you are ready to upload it to S3 bucket
   
2. **Build Frontend:**
   
   - Run `npm install` and `npm run build` to create a production build. The content of this build contains the following files:
   
     Upload them all onto S3 bucket.
   
3. **Configure S3 for Hosting:**
   
   - Upload the `build` folder content to an S3 bucket.
   - Enable public access and set up static website hosting.
   
4. **Update Auth0 Callback URL:**
   - In Auth0, update the allowed callback URLs to include your S3 bucket URL.

5. **Edit Bucket Policy:**
   - Follow AWS documentation to set up the correct bucket policy. The following is the general policy to set

     ```json
     {
     	"Version": "2012-10-17",
     	"Statement": [
     		{
     			"Sid": "PublicReadGetObject",
     			"Effect": "Allow",
     			"Principal": "*",
     			"Action": "s3:GetObject",
     			"Resource": "arn:aws:s3:::ps-solve-issue/*"
     		}
     	]
     }
     ```
   
     
   
6. **Update CloudFront Distribution (if used):**
   - Be sure to clean up the previous cache whenever your S3 bucket is updated. Amazon CloudFront is basically a caching service, and it is of curcial to clean up previous cache. Tap the invalidation navigation bar, and use the wildcard "/*" to eliminate all caching.
     ![Invalidation](https://github.com/liuximeng2/README_IMAGE/Invalidation.png)

### Obtaining SSL Certificate and Domain Purchases
The rationale behind this step lies in the fact that our authentication service relies on making HTTPS request, and it would be necessary to obtain an SSL certificate to ensure it happens. In general case, HTTPS is a much safer protocal than HTTP, so we believe implementing this step is necessary. As for the services we are using, whether the static web hosting on S3 bucket or the Elastic BeanStalk, they both use HTTP protocal. In such a case, we need to purchase our own domain name. An SSL certificate can be obtained through proving your ownership of a particular website. Let us go through the process step by step:

1. **Buy a Domain:**
   - Purchase a domain from AWS Route 53 or other domain registrars.([Registering Domain Name]([https://aws.amazon.com/elasticbeanstalk/](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html)))

2. **Hosted Zone Configuration:**
   - A hosted zone in Route 53 is where you manage your domain's DNS records. Usually this is managed automatically by AWS. Be aware of its existence.

### Miscellaneous

- **Backend Modifications:**
  - Update the `main.py` file if there are changes in the simulation or configuration files.

- **Environment Variables:**
  - Ensure to provide the OpenAI API key and other necessary environment variables during deployment.

### Adding SSL Certificate and DNS Configuration

1. **Request SSL Certificate:**
   - Use AWS Certificate Manager (ACM) to request an SSL certificate for your custom domain.
   - Validate the domain through email or DNS validation methods.

2. **Configure DNS Records:**
   - Create an `A` record for your root domain using Alias in Route 53.
   - Set up a `CNAME` or Alias `A` record for subdomains to point to your Elastic Beanstalk environment.

3. **Attach SSL to Load Balancer:**
   - In the EC2 console, attach the ACM SSL certificate to the HTTPS listener of your load balancer.

4. **Test HTTPS Connection:**
   - Access your application using the custom domain over HTTPS to ensure the SSL certificate is working.

5. **CORS Configuration:**
   - If your frontend is on a different domain, configure CORS on your backend to accept requests from your frontend's domain.
### Chat History Design
<p>Specifics on how chat history is designed and hosted on AWS.</p>





## Authors

Contributors names and contact info

Name: Blake  
Contact:

Name: Ryan
Contact: rmeng6@emory.edu

Name: Haru  
Contact: hche475@emory.edu

Name: Chloe Liu
Contact: zliu468@emory.edu

Name: Simon Liu  
Contact: 

Name: David Chen  
Contact: zou23@emory.edu

Name: Junyi (Conny) Zhou  
Contact: junyi.zhou@emory.edu







## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
