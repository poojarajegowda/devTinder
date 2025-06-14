## Dev Tinder APIs


 # authRouter
 -POST /signup
 -POST /login
 -POST /logout


 # profileRouter
 -GET /profile/view
 -PATCH /profile/edit
 -PATCH /profile/password


# requestRouter
 -POST/request/send/interested/:userID
 -POST/request/send/ignore/:userID
 -POST/request/review/accept/:requestID
 -POST/request/review/reject/:requestID


# userRouter
-GET/user/requests/received
 -GET/user/connections/
 -GET/feed

