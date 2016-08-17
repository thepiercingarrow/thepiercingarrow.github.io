ii -n NICK -s SERVER &
cd ~/irc/SERVER
echo 'identify PASS' > nickserv/in
echo '/j #CHANNEL' > in
cd CHANNEL
echo 'Hello World!' > in
tail -f out
