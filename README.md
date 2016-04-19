# Bill-Buddy

# Contributing & Git Workflow

## Clone the Project from GitHub

Clone the project's development branch on github

```
git clone -b development https://github.com/AngryPulpGophers/bill-buddy.git
cd bill-buddy
```

## Create a new branch

Checkout a new branch for what you're working on:
```
git checkout -b feat/newfeature
git checkout -b bug/somebug
git checkout -b doc/styleguide
```

## Before Pushing to GitHub

Rebase from Development before pushing to GitHub. This is where you will handle conflicts.

```
git pull --rebase origin development
```

Only ever push to your feature branch on github, never to master or development.
```
git push origin feat/newfeature
```

Submit a pull request on Github from the feature branch to development

The scrum master must review and merge.

After merging the pull request the scrum master will slack @channel REBASE.

Once you see this it is important to do another: 

```
git pull --rebase origin development
```
  
# Press Release

For anyone who is going on a trip with a group of people, to keep track of who owes who what instead of having to keep track on their own.

Summary

For a group of people who go on a trip together to keep track of who has paid for what and how much, so that everyone knows how much they owe each other. This way the cost is equal without having to try and keep track of it all trip

Problem

How do you keep track of expenses on a trip without getting split checks for every single exspense, which isnt even possible a lot of the time.

Solution

Users enter how much they spend on an expense and the app will evenly distribute how much the other members owe you.

Quote from You

'Peace of mind during group travel'

How to Get Started

Just make an account, add your buddies to your trip and get going.

Customer Quote

'Bill-Buddy sure did stop us from having silly arguements and let us have more time for good times'

Closing and Call to Action

Go download Bill-Buddy now and let us keep track of all the boring stuff for you today!

# Style Guide
