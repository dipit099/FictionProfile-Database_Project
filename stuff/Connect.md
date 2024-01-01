connect with backend
--------------------
#download postgre
#set postgre path in environment variables
#download postman app
#make sure you have "node" installed in your system

#lets install nodemon in backend terminal
cd server
npm install -g nodemon 

#if scripts not running, follow this link
https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system
Go to Start Menu and search for "Windows PowerShell ISE".
Right click the x86 version and choose "Run as administrator".
In the top part, paste Set-ExecutionPolicy RemoteSigned; run the script. Choose "Yes".

#now lets run again
cd server
npm install -g nodemon
nodemon index

** use different port number 3000,5000 if any issue in postman like "404 not found"**



add frontend
-----------
npx create-react-app client
( everytime u enter)
cd client
npm start 

npm install react-scripts --save ( if show "react-scripts" not found)

#1st
git fetch origin
git pull origin main

#2nd
git add .
git commit -m "check"
git push origin

done



Postgres remote connection Credentials:


// Hosted in Supabase
Name : postgres
Host : db.eocmqhvplptwmzerrcng.supabase.co
Port : 5432
Database Name : postgres
User : postgres
Password : dx$Q6*vWTnu!45j

//Hosted in Render
Name : Fiction Profile
Host : dpg-cm4p2dq1hbls73af6t9g-a.singapore-postgres.render.com
Port : 5432
Database Name : fictprofile
User : fictp
Password : gt5fhRprywckeSWOOpPv51FtLo8EwqgR
Internal Database URL : postgres://fictp:gt5fhRprywckeSWOOpPv51FtLo8EwqgR@dpg-cm4p2dq1hbls73af6t9g-a/fictprofile
External Database URL : postgres://fictp:gt5fhRprywckeSWOOpPv51FtLo8EwqgR@dpg-cm4p2dq1hbls73af6t9g-a.singapore-postgres.render.com/fictprofile
PSQL COMMAND : PGPASSWORD=gt5fhRprywckeSWOOpPv51FtLo8EwqgR psql -h dpg-cm4p2dq1hbls73af6t9g-a.singapore-postgres.render.com -U fictp fictprofile


new
--------
npm install "react-router-dom"
npm i react-toastify


