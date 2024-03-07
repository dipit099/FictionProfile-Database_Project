# Common for all the pages (These are navigation buttons and dropdown menus to navigate from one page to other)
1. Top Right buttons - Dashboard(when logged in) , 
Login/Account(when logged in) , Notification
2. Dropdown - Home, Feed, Discover(Searching)

# Tentative Pages of our website


1. Account 
        Contains : General Info of the user/moderator (this is common since we only bother about the info)
        Allows : General Info can be edited and profile picture can be added and managed.(anything other than email, username can be changed)


2. Dashboard

        ** For user **
        Display and Feature:   
            a. List of title and soem features like comparission and other relevant statistics
                // Will add the detials soon

            b. Tentative ~ allows user to create custom list based on some specific perfernce

        ** For Moderator **
        Display and Feature:
            a. Manage requests 
            b. Manage reports
            c. Manage and Create announcements for new addition or deletion to database
            d. Add, Delete, Update Media info
            e.
            (
                okay so now i have to build the moderator site for my website
                moderator will login as moderator in login page then they will be redirected to their site where they can : 
                1. Add, remove or modify movies, TV, manga, or books
                2. Remove comment, post or review according to report (users can report post, review, comments if they contain profanity or inappropriate language)
                3. Make announcements that will reach to all users
                4. Also a dashboard page where he can see all of his past works in brief details like how many movies he added or deleted ...info like that
            )

        ** For Admin ** 
        Display and Feature:
            a. Basically every operation that ever occured. This aligns with our project rubric for bonus marks
                What I understand is that we just need to show the changes in our database that is simply said that - 
                we will show when someone posts, or if some moderator approves request, or some user reports something.
                We will not update every little things as some comment addition is trivial. 
                Also remeber that it should be stored in separate table as per rubrik.
            b. Approve moderator to join the team.


3. Home page
    This is basically what our users will see for the very first time when they viist our website.
    Display : Trending and latest features.
    
    Details : 
                We will compute a popularity index based on some calculations and diplay them with the poster card instead of add option and favorite option.
                Ensures the use of complex queries(1/2 musts) here.


4. Feed
    Page where user will see the posts of the people whom he/she follows


5. Discover
    This is pur main browsing site.
    Filter panel on the left.
    Global serach.

    //Details about the srach options and fitlers wil be added soon

6. Login/Registration
    Simple page for login and registration
    A tentative feature is "forgot password" option(requires valid email if thus validity check for email)





TODOs: (Mahdi)
1. Finish up the realtions between user and mod and add necessary columns where needed.
2. Create log tables for the major queries and trigger to track and keep record of the interactions.
3. Create all the triggers.
4. Create moderator site and test all the triggers. (Also decide on media deletion logic : should it be a soft delete or reinsertion in some new table and handle the processs accordingly)
5. Check all the queries and match up to the project rubric.
6. Reduce table sizes accordingly such that a faster searching can be performed regularly. 
7. Check up on all bugs and try fixing them.
8. 
