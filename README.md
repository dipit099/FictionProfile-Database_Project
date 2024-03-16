# FictionProfile-Database_Project
BUET CSE 215 Level 2 Term 1 Project

# Overview
Our project, titled "Fiction Profile," is a dynamic platform designed for users to engage with diverse media content including books, fiction, series, comics and movies. It offers a multifaceted user experience allowing interaction based on preferences in Cast, Rating, Language, and Genre. Users can access content through a versatile system using Favorite Content ID, Language, and Title parameters, ensuring seamless content exploration.
Not only does "Fiction Profile" cater to individual content discovery, but it also fosters a vibrant community by enabling user interactions. Users can engage with one another through the ability to follow, comment, and participate in dynamic discussions.

# Project Website Url :  
https://fiction-profile-client.web.app/
(Zoom out to 75% for better view..PC friendly.. Might be slow in loading since hosting is in free mode , limited resource )

or try this
https://fiction-profile-client.firebaseapp.com/

Demo video Link : https://youtu.be/Ahhur8AO3_Q

# Setting Up PostgreSQL
1. Download PostgreSQL.
2. Set PostgreSQL path in environment variables.
3. Download PgAdmin4 .
4. Make sure you have Node.js installed.


# Connect with Backend
### Nodemon Installation (Backend)
```bash
npm install -g nodemon
```

## Troubleshooting Script Execution in PowerShell

If you encounter issues with script execution in PowerShell, and you see a message stating that "execution of scripts is disabled on this system," you can follow these steps to resolve the problem.

### Instructions:

1. Go to the Start Menu and search for "Windows PowerShell ISE."

2. Right-click on the x86 version of PowerShell ISE.

3. Choose "Run as administrator" to open PowerShell ISE with elevated privileges.

4. In the top part of the PowerShell ISE window, paste the following command:
```bash
Set-ExecutionPolicy RemoteSigned
```
5. When prompted, choose "Yes" to confirm the change in the execution policy.

This will set the execution policy to RemoteSigned, allowing scripts to run on your system.

If you continue to face issues or need further assistance, you can refer to the following Stack Overflow thread for additional information: [Link to Stack Overflow Thread](https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system).


# Running the Server

To start the server, follow these steps:

1. Navigate to the "server" directory using the command line:

    ```bash
    cd server
    ```

    ```bash
    npm install
    ``` 
        

2. Run the server using nodemon:

    ```bash
    nodemon index
    ```

This will launch your server, and nodemon will automatically restart it whenever changes are detected.

**Note:** If you encounter any issues in Postman, such as "404 Not Found," consider using a different port number (e.g., 3000 or 5000). You can specify a different port by modifying the configuration in your server code.

For example, in your `index.js` or main server file, look for the part where the server is created (probably using Express) and change the port:

```javascript
const port = 3000; // Change this to 5000 or any other available port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

# Frontend Setup

To set up the frontend, follow these steps:

1. When you enter into the project, navigate to the "client" directory:

    ```bash
    cd client
    ```
    
    ```bash
    npm install 
    ```
    
    
2. Start the development server:

    ```bash
    npm start
    ```

   This command will launch your React app, and you can view it in your web browser.

3. If you encounter an issue where "react-scripts" is not found, you can install it using the following command:
    ```bash
    npm install react-scripts --save
    ```
    
4. If you encounter an issue that react-router-dom is not found, then paste this command in terminal:

    ```bash
    npm i react-router-dom
    ```
   This will add the necessary scripts for running and building your React app.


# Database Setup 

You have to execute a SQL FILE in your NAVICAT / PgAdmin for this to run in your Localhost.

Contact `sdipit099@gmail.com` for the file if needed!

# Git Commands

## Pull Changes from Remote Repository

1. First, fetch the latest changes from the remote repository:

    ```bash
    git fetch origin
    ```

2. Pull the latest changes from the main branch:

    ```bash
    git pull origin main
    ```

## Hosting Details:
1. Client hosted on Firebase
2. Server hosted on Render
3. Database hosted on Supabase


This README.md file provides users with clear instructions on how to set up, run, and contribute to the Fiction Profile project.
# Contributors:

Dipit Saha

Shah Mohammad Abdul Mannan


# Take a Tour
## USER
![Screenshot_10](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/9cc5c987-db3e-4aec-8e96-1edc92e85b6e)

![Screenshot_12](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/8f9a0393-c4f4-4d30-b8da-e319638b4b61)


![Screenshot_17](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/d9e9ec3e-d7ec-4cd7-a165-b41e88b9b242)


![Screenshot_13](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/332a5044-2e35-4b4c-8970-b0a755dce8c6)


![Screenshot_14](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/995a0645-fffd-4c4b-8b78-2bd4ef54dcf2)


![Screenshot_15](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/602621c8-bc93-4202-a523-fd8adc219ebb)


## Moderator

![Screenshot_16](https://github.com/dipit099/FictionProfile-Database_Project/assets/112118531/df154d99-02fa-467d-ad82-facc6196bc90)

)
