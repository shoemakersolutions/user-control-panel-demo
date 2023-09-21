Basic user control panel demo

How to run:

The program runs with docker compose.
Start the db first and run docker-compose up after it has started successfully.

docker-compose build && docker-compose up db -d && sleep 2 && docker-compose up

The LoadUsers button fetches the user information from the given API and loads it into the database,
after which it can be modified via UI.

Delete works by selecting wanted rows from the checkboxes on the left and clicking delete button.

The ui-standalone directory contains only ui with no backend, which fetches the user information from
the given requirements url into the reducer, the functionality modifies the data within reducer.
This was added to fulfill the requirements, with the main weight being on the dockerized solution.
