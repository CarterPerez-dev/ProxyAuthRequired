# FIX
---
fix achieemt levesl- draconic ruin is level 75000
inferna, bastion is leevl 45000
---
## admin and support refinements [refer to](https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/MD's/admin-support.md)
---
Floating-point arithmetic in JavaScript can sometimes produce such imprecise values. To fix this, rounding the result before displaying it is essential. Here's a complete example that rounds to two decimal places:

```javascript
// Define the item with its effect value
const item = { effectValue: 1.10 };

// Calculate the XP boost and round it to two decimal places
const xpBoost = ((item.effectValue - 1) * 100).toFixed(2);

// Display the result in the desired format
console.log(`+${xpBoost}% XP`);  // Expected output: +10.00% XP
```

In this snippet, the `toFixed(2)` method ensures that the result is formatted with exactly two decimal places, avoiding floating-point precision issues like "+10.000000000000009%".
---
### add to username and passsword authenication where it omits spaces. so bascially any spaces are still not allowe dbut that wouldnt matte rbacsue spaces essentially dont even get logged as a charcer. so like if they try to do spaces it wil dissalow them lets say for if they do anything in the middle of charcters so lke "carter perez" or like "c dog" orand so on it dissallows them- however if they do any spaces before any charctaers or after any charcters it doesn teven get logged as any charcters its baical;y invisible/void. so if a user did " carterperez" it gets logged as "carterperez" even if they did " carterperez " it gets logged as "carterperez" or if they just did "carterperez " it gets logged as "carterperez" 
---
### fix this import and see what happens because it hasnt been in affect this whole time since its the incorrect path LOLOL
```js
// Global CSS import
import './components/pages/XploitcraftPage/global.css';
```
### correct is 
```js
import './global.css';
```
---
## completly revamp the email sender and integrate it into your admin page where you can send the emails and also write the emails (also have a test email component before you mass send it)- dont make it daily make it just say "Newsletter" and we will send it like 2-3 times a week
---
### ADD RATE LIMITER TO AI COMPONENTS
-----
## ACHIEVEMNT Verification [refer to](https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/Mongo-Inputs/TestUsers.js)
---
# Input most files (slices, globaltestpage, unique testlists/pages, routes, app.py, dockerfiles etc etc) into claude 3.7, grok 3, deepseek R1, ChatGPT deep research and o1 Pro and ask for efficiency improvements then combine all data they gave you into one document and look for the best imporvements.
---
### ADD MORE RESOURCES TO RESOURCE PAGE
----
### update everyhing possible with the aplus testlist/page and globaltestpage--- THEN update the rest of your testlists/pages
---
### create the verify email component
---
### create the forgot password fucntionality
---
### close to release we need a Dev Database and paired with that a Dev server. so we can push DB changes and or code chnages and see teh effects before we do it in production. 
----
#### also consider a backup sever in case soemthing happens to the production one we can easily go to cloudfare and chnage IP address A record and upkeep 99% uptime---- conisder wasy to automate that somehow (prolly very very hard- essentially would haev to know- IF server donw = replace A record automcially somehow-- actually prolly easy tbh)
---
### ADD MORE RESOURCES TO RESOURCE PAGE
---
### remove the achivemet icon thing and just have the test icon from the DB display on the user profile
---
### verify some more things and optimize design some more/ make everything look better, test test and test once more
----
# THEN THE IOS APP GRIND STARTS
### refer to [refer to](https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/IOS.MD)
### and refer to [refer to][https://github.com/CarterPerez-dev/ProxyAuthRequired/blob/main/MD's/IOS.APP.MD)





