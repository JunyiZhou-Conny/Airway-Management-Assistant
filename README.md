# CS 370 Pediatric Savior Airway Management Simulation Chatbot

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview-of-the-project">Overview of the Project</a></li>
    <li><a href="#user-guide">User Guide</a>
      <ul>
        <li><a href="#tutorial-video">Tutorial Video</a></li>
        <li><a href="#a-few-reminders">A few reminders</a></li>
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
        <li><a href="#prompt-tuning">Connecting to OpenAI API & Prompt-tuning</a></li>
      </ul>
    </li>
    <li><a href="#aws-hosting">AWS Hosting</a>
      <ul>
        <li><a href="#backend-hosting-aws-elastic-beanstalk">Backend Hosting - AWS Elastic Beanstalk</a></li>
        <li><a href="#frontend-hosting">FrontEnd Hosting</a></li>
        <li><a href="#obtaining-ssl-certificate-and-domain-purchases">Obtaining SSL Certificate and Domain Purchases</a></li>
        <li><a href="#adding-ssl-certificate-and-dns-configuration">Adding SSL Certificate and DNS Configuration</a></li>
      </ul>
    </li>
  </ol>
</details>

## Overview of the Project
<p>This section will provide a comprehensive overview of the Pediatric Savior Airway Management Simulation Chatbot project, including its objectives, scope, and impact on pediatric care training.</p>

## User Guide
###### <a name="tutorial-video"></a>

#### Tutorial Video

We believe having visual instruction is more intuitive compared to reading tons of documentation. So we made a video on YouTube to guide our users. Here is the link:https://youtu.be/yY1-Hx5sHYY

<a name="a-few-reminders"></a>

#### A Few Gentle Reminders

##### Regarding Sign-up

1. It’s important to note that our application features two distinct interfaces: one for admins and another for non-admins. Admins, who are typically doctors conducting research, have access to a comprehensive set of tools, whereas non-admins, mostly residents participating in the research, will have a more focused experience. For normal users signing up on our website, you will be automatically assigned the non-admin/resident permission where only the chatbot feature can be utilized. An account will only be made an admin account after it is made and after review. If you need admin access, reach out to this email address: JZHO349@emory.edu.
2. If you are a first-time user, we only allow email addresses ending with emory.edu and morehouse.edu. We will try to make it available for general access once we find the time is ripe.

##### Airway Management Assistant

1. Please be patient while the chatbot initializes. Sometimes due to network connection, you might need to respond "Begin Simulation" twice to allow proper conversation. Nevertheless, this is quite rare.
2. Resetting the conversation without hitting the save button will result in history loss. So remember to save the conversation if you want it to be stored in the database.
3. After updating the instruction on the instruction page, remember to activate the instruction by hitting the reset button in the chatbot interface

##### Chat History
The chat history feature allows users to view past conversations by entering a participant ID. This feature is accessible through the main interface once the user is authenticated. Be sure to remember your participant ID. Enter a valid participant ID. Click on "Fetch History" to view the chat logs of the specific participant.

##### Instruction Editor

1. The instruction editor allows users to prompt-tune the GPT. You can edit however you want, but you will be responsible for all the changes you have made. We recommend documenting your adjustment for GPT.
2. Be sure to click the save button on the Instruction page, when you go back to the chatbot interface, hit reset to activate the new instruction.

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
- **Image Fetching**: If a response includes an image reference, the component fetches and displays this image as part of the conversation. The chatbot's backend logic determines when an image is relevant to the conversation, tagging the response with an image ID.
- **Conversation Initialization and Reset**: Provides functionality to reset the chat to a clean state and reinitialize the conversation. It gives users the ability to clear the conversation history manually. This can be particularly useful if the conversation becomes too cluttered or if the user wants to start over with different inquiries.
  - **Reflecting Updates**: If updates are made to the instruction text in the "Instruction Editor" section, resetting the chat is essential to allow these updates to be reflected in the conversation without needing to refresh the entire page or restart the application.
- **Saving Chat History**: A 'Save' button is integrated into the chat interface, enabling users to manually save the current state of the chat history—whether complete or incomplete—into the backend database at any point during the interaction, associating it with the user's participant ID.
  - **Continued Development (for developers)**: Future development might focus on how the users retrieve not-yet-completed conversations and resume without losing context at a later time, which is especially useful in complex query scenarios or when interruptions occur during the interaction. Additionally, both complete and incomplete saved conversations might be leveraged as a dataset for training the chatbot, enhancing its response accuracy and contextual understanding.
- **Automatic Scrolling and Session Storage**: Implements automatic scrolling to the latest messages and stores the conversation history in session storage to preserve chat state across page reloads.

#### Effects and Refs
- **Auto-scroll Effect**: Uses `useEffect` to automatically scroll the chat window to the latest message when the `messages` array is updated.
- **Session Storage Effect**: Another `useEffect` ensures the conversation history is either retrieved from session storage or initialized afresh when the component mounts.
- **Chat Window Reference**: Utilizes `useRef` to reference the chat window DOM element for auto-scrolling functionalities.


#### User Interface 
- **Chat Window**: Displays messages as either text or images, with visual differentiation between user and bot messages.
- **Input Form**: Includes text input for messages, a submit button to send messages, a reset button to clear the chat history, and a save button to store the current state of the chat history (complete/non-complete) into the database.
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

#### User Interface Flow (for end users): 
When the application (App.js) loads, it determines which components to display based on the user's authentication status. If authenticated as the admin, it renders ChatHistory.js allowing users to interact with the chat history functionality. If authenticated as non-admin (regular research participants), the Chat History page will not be displayed in the navigation bar on the left. 
#### Data Fetching Flow (for developers): 
When a user inputs a unique participant ID in ChatHistory.js and triggers the data fetch, this component sends an API request to the Flask backend (app.py). After fetching the data, the server sends it back to ChatHistory.js, which then updates the UI to display the chat history.

#### State Management
The component maintains several pieces of state:
- `participantID`: Stores the inputted participant ID.
- `chatHistory`: Contains the fetched chat conversations, organized by date, displaying the most recent chat log at the top.
- `error`: Captures and displays any errors during the chat data fetching process.

#### Event Handlers
- **handleParticipantIDChange**: Updates the `participantID` state with the user's input.

#### Data Fetching and Processing
- **fetchChatHistory**: An asynchronous function that:
  - Retrieves chat history data from a specified endpoint using the participant ID.
  - Processes this data to group messages by their respective dates.
  - Handles any errors by setting the `error` state.

#### Current Limitations and Future Improvements 
- **Sorting by Newest**: Currently, when multiple entries (chat sessions) exist for a single participant, the interface defaults to displaying the earliest conversation first.
  - Modifying the sorting mechanism to display the newest conversations first could be achieved by adjusting the sorting logic in the fetchChatHistory function to prioritize newer dates or by managing conversation indices differently.
- **Single Entry per Participant**: Based on the present consensus with the doctors, this system assumes that each participant has only one chat history entry in the database. However, users may engage in multiple sessions, resulting in multiple entries.
  - Implement functionality to handle multiple chat histories per participant more effectively. This could include a UI component that allows users to select which conversation date they wish to view, or implementing a more comprehensive search and filtering mechanism (e.g., by date, keyword, or conversation status (complete/incomplete)).

#### Rendering
The component renders the following UI elements:
- **Input Fields**: For entering the pre-defined unique participant ID.
- **Fetch Button**: Triggers the chat history fetching process.
- **Error Display**: Conditionally shown if an error occurs during data fetching.
- **Chat Logs**: Displays the chat history, grouped by date, if available.

### Authentication With Auth0 
Authentication is a critical component of our system. Detailed documentation for implementation is readily available at [Auth0 Documentation](https://auth0.com/docs).

As our team transitions to focus on individual objectives, it's essential to ensure that medical professionals have proper access to this authentication system. A particularly important feature is the ability to assign administrative controls to users. Here are the steps to facilitate this:

1. The current team owner, Conny Zhou (junyi.zhou@emory.edu), will invite Dr. Gorbatkin to the Auth0 tenant and assign him a team role.
2. Access the development environment at `dev-og4xau6hi3ojdb13`.
3. Navigate to "User Management" from the left sidebar and select "Users".
4. For each user listed, click the three-dot menu button on the right side of their entry and assign the "admin" roles.

This functionality is crucial for managing access rights within the system effectively.

## BackEnd Design
### MongoDB Database
Our application leverages MongoDB, a NoSQL database, to store and manage dynamic chat data efficiently. The database is named **Chatbot_Data** and is structured into four main collections: **case**__, **conversations**__, **image**__, and **instruction**__.
#### Collections
- `cases`: Stores case scenarios, including patient reports and the outline of the case steps with nested objects for different phases of the case.
  - From the **Data Collection** page, users are able to directly input new cases in a phase-by-phase manner that will be used to train the GPT model.
- `conversations`: Contains conversation logs, where each document is associated with a unique pre-assigned participantID.
  - The documents include a **timestamp** and a **history** array that records the sequence of messages exchanged between the bot and the user.
  - Each individual chat session is stored as a separate document in the database. When a user continues their interaction in a new session under the same participantID entered earlier, it is saved as a new document.
- `image`:  Store images related to certain chatbot interactions.
  - Images are stored as Binary data along with a description and a unique identifier.
- `instruction`: Consists of instructions or help guidelines related to the chatbot or case scenarios
  - From the **Instruction Editor** page, users are able to directly input new cases in a phase-by-phase manner that will be used to train the GPT model.

#### Image Handling
- **Image Fetching**: Upon detecting an image trigger, ChatbotUi.js sends a request to the backend, which retrieves the image data from the MongoDB image collection using the image ID embedded in the bot's message.
  - The backend endpoint `/get-image/:id`serves the image by retrieving the Binary data, encoding it to Base64, and returning it in a JSON response.
- **Image Retrieval & Rendering**: The front end handles the JSON response by creating a message object with the image data and adding it to the messages array.
  - **ChatbotUI.js** checks the type of each message: if the type is 'text', it displays the text as it is. If the type is 'image', it then renders the image in an img element with the 'src' attribute set to the image data, displaying it within the conversation flow.
  - A loading state is indicated to the user while the image is being fetched, providing feedback that the system is processing their interaction.

#### Connection with the Database:
- **connection string**: The connection string is a crucial piece of information that the application uses to connect to the MongoDB database. It contains the credentials and the address of the database that the application needs to store and retrieve data.
  - For security concerns, the connection string, alongside the key for our OpenAI API, is not hard-coded into the application's source code and stored in public repositories like GitHub. We store the connection string in an environment variable.
  - Refer to the  .env.example file in this repo to view the placeholders for the necessary variables that need to be defined in the local environment before running this application. 

### Connecting to OpenAI API & Prompt-tuning
<a name="prompt-tuning"></a>
We utilize OpenAI's [Assistants API](https://platform.openai.com/docs/assistants/overview) for generating conversations. This API offers more versatility and advanced features compared to the [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api), such as file searching and function execution capabilities. Despite not deploying these sophisticated functions in the initial stage, planning for future scalability is crucial as the project evolves beyond our immediate work.

While Assistants API works with variants of both GPT-3.5 and GPT-4, we use gpt-4-turbo-preview for best performance. We initialized the assistant by specifying the model that we choose and the instructions. For each conversation that the user starts, we initialize a [Thread](https://platform.openai.com/docs/api-reference/threads) and for each user input, we [Run](https://platform.openai.com/docs/api-reference/runs) the assistant on that thread to get the model output. We implemented a wait_on_run function to check whether a run is complete at 0.5s intervals, and we return the model output to the user whenever the run is complete. 

To mitigate instances of inaccurate or "hallucinated" responses, we enhance the user's query by appending the case description. This refinement directs the AI to concentrate on relevant topics, minimizing the likelihood of generating off-topic or erroneous content. However, it is important to acknowledge that completely eliminating AI-generated inaccuracies is currently unachievable. Given that case descriptions cannot encapsulate every detail or anticipate all potential inquiries, reliance on the AI's intrinsic knowledge base is sometimes necessary, which may inadvertently introduce hallucinations.

In the GPT instruction, we explain the structure of the case descriptions and explicitly instruct the GPT how to use them to engage in conversations with the user. As the result of continual experimentation and adjustment, we now come to a proficient GPT that acts like an instructor to teach residents about the Bag Mask Ventilation process. Nonetheless, perfecting prompt-tuning is an ongoing endeavor, heavily reliant on receiving user feedback. To facilitate continuous improvement, we have established a prompt-tuning interface, granting administrative users the flexibility to refine prompts as needed.

## AWS Hosting

Our final product is hosted on the Internet to allow public access utilizing AWS as our intermediary. In particular, we utilized 2 services offered by AWS: Amazon S3 bucket and Amazon Elastic Beanstalk. Each service is responsible for different roles which are specified below.

Here is the heuristic between how these 2 services interact with each other:

1.  **AWS Elastic Beanstalk**: This service allows you to deploy and scale web applications and services quickly. You can upload your application code to Elastic Beanstalk, and it automatically takes care of deployment details like capacity provisioning, load balancing, auto-scaling, and health monitoring. It supports a range of programming languages and integrates with services such as EC2 and Elastic Load Balancing, making it easier to manage applications without deep knowledge of the infrastructure ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/)) ([AWS Documentation](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)) ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).
2.   **Amazon S3 Bucket Static Website Hosting**: This service enables you to host a static website on Amazon S3. By enabling this feature on an S3 bucket, you can serve static content (HTML, CSS, JavaScript, images) directly from S3, a highly durable and available storage service. It simplifies web hosting without the need for a server since S3 can deliver the content directly to the web browser ([Amazon Web Services](https://aws.amazon.com/elasticbeanstalk/details/)).
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

    - If encountering a permission denied error on a port (like 80), it may be occupied. Try another port or use sudo for privileged ports on Unix systems.
    - If you are working on port 4999, then things should be working fine.

#### Deploying with Elastic Beanstalk

1. **Upload and Deploy:**
   - Zip all the files needed for the backend and upload them to AWS Elastic Beanstalk.
     - Dockerfile
     - requirements.txt
     - application.py
     - AssistantAPICall folder
     - env.list is optional if you pass the environment variable into the environment through configuration
   - Be sure to choose Dokcer as your platform when creating the environment
   - Use VPC and choose corresponding subnets
   - Go to configuration, open the elastic load balancer option, and add a new listener on port 443 that accepts HTTPS requests. To accomplish this, you need an SSL certificate and a custom domain name. Check the section later for a detailed review
   - Deploy the version and verify the application is running by visiting the provided endpoint.
### FrontEnd Hosting
#### Configuring Frontend with S3 Bucket

1. **Prepare Local Frontend Copy:**
   - Clone the frontend repository into a local folder. Update the API calls as necessary.
   - Updating the API call is of great importance, especially after setting the backend configuration. We have api.connyzhou.com as the API entry.  You might be wondering why that is the case. This is due to that Auth0 requires HTTPS protocols. Check the SSL Certificate section for a detailed overview. So be sure to modify all of the fetch functions. For instance, when running on your local machine, you might be calling to http://localhost4999/submit-user-input. Modify this to https://api.conyzhou.com/submit-user-input when you are ready to upload it to S3 bucket
   
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
   - Be sure to clean up the previous cache whenever your S3 bucket is updated. Amazon CloudFront is basically a caching service, and it is crucial to clean up the previous cache. Tap the invalidation navigation bar, and use the wildcard "/*" to eliminate all caching.
     ![Invalidation](https://github.com/liuximeng2/README_IMAGE/Invalidation.png)

### Obtaining SSL Certificate and Domain Purchases
The rationale behind this step lies in the fact that our authentication service relies on making HTTPS requests, and it would be necessary to obtain an SSL certificate to ensure it happens. In general case, HTTPS is a much safer protocol than HTTP, so we believe implementing this step is necessary. As for the services we are using, whether the static web hosting on S3 bucket or the Elastic BeanStalk, they both use HTTP protocol. 

In particular, we use api.connyzhou.com to redirect request into http://ps-docker-env.eba-nam3rvmm.us-east-2.elasticbeanstalk.com

We use pediatricsavior.connyzhou.com to redirect requeset into https://d1zgn9xjpa6cni.cloudfront.net

There is a certain level of misunderstanding in the first place, I thought that to allow the website to be hosted on https://d1zgn9xjpa6cni.cloudfront.net with https request, I need to manually assign a certificate. However, this is actually automatically handled by Cloudfront. The real effect of using
In such a case, we need to purchase our own domain name. An SSL certificate can be obtained through proving your ownership of a particular website. Let us go through the process step by step:

1. **Buy a Domain:**
   - Purchase a domain from AWS Route 53 or other domain registrars. ([Registering Domain Name]([https://aws.amazon.com/elasticbeanstalk/](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html)))

2. **Hosted Zone Configuration:**
   - A hosted zone in Route 53 is where you manage your domain's DNS records. Usually, this is managed automatically by AWS. Be aware of its existence.

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
Contact: blake.grudzien@emory.edu

Name: Ryan
Contact: rmeng6@emory.edu

Name: Haru  
Contact: hche475@emory.edu

Name: Chloe Liu
Contact: zliu468@emory.edu

Name: Simon Liu  
Contact: simon.liu@emory.edu

Name: Zhaoliang Chen  
Contact: david.chen2@emory.edu

Name: Junyi (Conny) Zhou  
Contact: junyi.zhou@emory.edu

Name: Jinghan (Summer) Sun  
Contact: jinghan.sun@emory.edu





