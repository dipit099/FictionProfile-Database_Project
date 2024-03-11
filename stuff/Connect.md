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

## Push Changes to Remote Repository

1. Add all the changes to the staging area:

    ```bash
    git add .
    ```

2. Commit the changes with a meaningful message:

    ```bash
    git commit -m "Check"
    ```

3. Push the changes to the remote repository:

    ```bash
    git push origin
    ```

    <br/>

   This will update the main branch on the remote repository with your local changes.


**git-push-pull**

git fetch origin
git pull origin main


**new**
git add .
git commit -m "Check"
git push -u origin dipit
git push origin


git checkout -b dipit
git push -u origin dipit
ctrl+shft+v  to preview md files




# Ngrok Run
1. Open cmd
2. Run
   `ngrok config add-authtoken 2bSOHgZRuwquRRBBIxnAzv5w5Fe_33MyZPt7PLYLdd7Eh9Een`

   
3. Run
   `ngrok http 3000`

# Server Deploy
Checking db credentials
Go to Render.com

# Client
 Go to Firebase
 
 change BASE_URL
 
npm run build

firebase deploy





