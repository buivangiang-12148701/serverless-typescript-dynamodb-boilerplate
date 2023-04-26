# Authentication with Facebook

## Library used
- axios
- @types/axios
- jsonwebtoken
- @types/jsonwebtoken
## Data:
* Access Token

## Primary stream
1. Get data (name, email, and Facebook ID) from the Facebook API
2. Check if there is a user with the email received above
3. Create an account for the user with the data received Facebook
4. Create an access token, from the user ID, with a 30-minute expiration
5. Return the generated access token

## Alternative flow: User already exists
1. Update the user account with the data received from Facebook (Facebook ID and name - only
update the name if the user account has no name)

## Exception flow: Invalid or expired token
1. Return an authentication error
