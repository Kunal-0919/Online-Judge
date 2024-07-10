# Difference between OJ and OC

- Code file -> OJ -> Verdict(AC or WA) (after submission)
- Code -> Online Compiler -> Output display based on the code (code output) (after running the code)
- examples of OJ = Codeforces, Leetcode, Codechef etc.
- examples of OC = OnlineGDB, Programiz, GFG Online Compiler etc.
- Online Compiler is subset of Online Judge. But Online compiler can exist indepently but OJ is going to need Online Compiler to test the submission and provide the verdict.
- We are not going to design the compiler but build it and not going to use third party services for the compiler.
- No API is used.
- We are going to build our own compiler from scratch in Node.js.
- we are going to use childprocess an in-built library to run and compile the code.

# Overview

- Working
- Concept
- Decision Making => most crucial part => scalability, well-structured, robust, and everything what sepeartes it from every other OJ. => 3 weeks is all it will take.
<!-- there are multiple ways to implement the authentication jwt, github auth-->
- Dev is not about learning each and everything.
- Build some project using X technology -> Blog Post, social media app, chat bot, chat app

# What's important for interview

- Project: A good one which is not just some clone or some blog app, social media app, chatbot etc.
- Deployment: Vercel, AWS, GCP, Render, Netlify.
- User Base: Friends can help with that.
- Scalability:
  1. Load balancer
  2. Message Queue
  3. Auto scaling

This is how a good project is formed.

# Security

1. DDOS(Distributed Denial of Service): eg. Google ReCAPTCHA can be used.
2. Malicious Code: eg. Script injection is a problem that can cause problem to our database
3. User permissions eg. Contest: ctrl c or ctrl v is diabled
4. File system: DB
5. Authentication: We have users so we need Auth so that we can track the user.
6. Network Isolation: Not able to access google or anything(An automation script).
