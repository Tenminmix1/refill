mongo $(printf "%s" $MONGO_DATABASE) --eval "db.createUser({ user: \"${MONGO_USER}\", pwd: \"${MONGO_PASSWORD}\", roles: [{ role: \"readWrite\", db: \"$(printf "%s" $MONGO_DATABASE)\" }] });"
