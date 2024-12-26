#!/bin/bash

# Function to display the main menu
show_menu() {
  echo "Select the operation you want to perform:"
  echo "1. Build MySQL image"
  echo "2. Create MySQL container"
  echo "3. Build Go image"
  echo "4. Create Go container"
  echo "5. Build React image"
  echo "6. Create React container"
  echo "7. List all Docker images"
  echo "8. List running Docker containers"
  echo "9. List all Docker containers"
  echo "10. Start MySQL container"
  echo "11. Stop MySQL container"
  echo "12. Start Go container"
  echo "13. Stop Go container"
  echo "14. Start React container"
  echo "15. Stop React container"
  echo "16. Create Docker network and connect containers"
  echo "17. Inspect Docker network"
  echo "18. Enter MySQL container (interactive)"
  echo "19. Execute go container and show menu"
  echo "20. Execute React container and show menu"
  echo "21. Fetch logs from Go container"
  echo "22. Exit"
}

# Function to show Go container actions
go_container_menu() {
  while true; do
    echo "Inside Go container menu. Select an operation:"
    echo "1. Install curl"
    echo "2. Register Abdulrahman"
    echo "3. Register Mahmoud"
    echo "4. Login Abdulrahman"
    echo "5. Login Mahmoud"
    echo "6. Exit Go container menu"
    read -p "Enter your choice (1-6): " go_choice

    case $go_choice in
      1)
        echo "Installing curl..."
        docker exec go-container apt-get update && docker exec go-container apt-get install -y curl
        ;;
      2)
        echo "Registering Abdulrahman..."
        docker exec go-container curl -s -X POST "http://go-container:8080/api/users/register" -H "Content-Type: application/json" -d '{"name": "Abdulrahman", "email": "abdo@gmail.com", "phone": "12345678901", "password": "mypassword", "role": "user"}'
        ;;
      3)
        echo "Registering Mahmoud..."
        docker exec go-container curl -s -X POST "http://go-container:8080/api/users/register" -H "Content-Type: application/json" -d '{"name": "Mahmoud", "email": "mahmoud@gmail.com", "phone": "98765432101", "password": "anotherpassword", "role": "user"}'
        ;;
      4)
        echo "Logging in Abdulrahman..."
        docker exec go-container curl -s -X POST "http://go-container:8080/api/users/login" -H "Content-Type: application/json" -d '{"email": "abdo@gmail.com", "password": "mypassword"}'
        ;;
      5)
        echo "Logging in Mahmoud..."
        docker exec go-container curl -s -X POST "http://go-container:8080/api/users/login" -H "Content-Type: application/json" -d '{"email": "mahmoud@gmail.com", "password": "anotherpassword"}'
        ;;
      6)
        echo "Exiting Go container menu."
        break
        ;;
      *)
        echo "Invalid option. Please try again."
        ;;
    esac
  done
}

# Function to show React container actions
react_container_menu() {
  while true; do
    echo "Inside React container menu. Select an operation:"
    echo "1. Register Abdulrahman"
    echo "2. Register Mahmoud"
    echo "3. Login Abdulrahman"
    echo "4. Login Mahmoud"
    echo "5. Exit React container menu"
    read -p "Enter your choice (1-5): " react_choice

    case $react_choice in
      1)
        echo "Registering Abdulrahman..."
        docker exec react-container curl -s -X POST "http://go-container:8080/api/users/register" -H "Content-Type: application/json" -d '{"name": "Abdulrahman", "email": "abdo@gmail.com", "phone": "12345678901", "password": "mypassword", "role": "user"}'
        ;;
      2)
        echo "Registering Mahmoud..."
        docker exec react-container curl -s -X POST "http://go-container:8080/api/users/register" -H "Content-Type: application/json" -d '{"name": "Mahmoud", "email": "mahmoud@gmail.com", "phone": "98765432101", "password": "anotherpassword", "role": "user"}'
        ;;
      3)
        echo "Logging in Abdulrahman..."
        docker exec react-container curl -s -X POST "http://go-container:8080/api/users/login" -H "Content-Type: application/json" -d '{"email": "abdo@gmail.com", "password": "mypassword"}'
        ;;
      4)
        echo "Logging in Mahmoud..."
        docker exec react-container curl -s -X POST "http://go-container:8080/api/users/login" -H "Content-Type: application/json" -d '{"email": "mahmoud@gmail.com", "password": "anotherpassword"}'
        ;;
      5)
        echo "Exiting React container menu."
        break
        ;;
      *)
        echo "Invalid option. Please try again."
        ;;
    esac
  done
}

# Function to perform actions based on user choice
perform_action() {
  case $1 in
    1) docker build -t my-mysql-image ./MYSQL ;;
    2) docker run -d --name mysql-container --network my-network -p 3308:3306 my-mysql-image ;;
    3) docker build -t my-go-app ./Go_Project ;;
    4) docker run -d --name go-container --network my-network -p 8080:8080 -e DB_HOST=mysql-container -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=abdomysql2001 -e DB_NAME=userdb my-go-app ;;
    5) docker build -t react-frontend ./FrontEnd ;;
    6) docker run -d --name react-container --network my-network -p 3000:80 react-frontend ;;
    7) docker images ;;
    8) docker ps ;;
    9) docker ps -a ;;
    10) docker start mysql-container ;;
    11) docker stop mysql-container ;;
    12) docker start go-container ;;
    13) docker stop go-container ;;
    14) docker start react-container ;;
    15) docker stop react-container ;;
    16) docker network create my-network && docker network connect my-network mysql-container && docker network connect my-network go-container && docker network connect my-network react-container ;;
    17) docker network inspect my-network ;;
    18) echo "Entering MySQL container interactive..."; docker exec -it mysql-container mysql -u root -p ;;
    19) echo "Showing Go container menu..."; go_container_menu ;;
    20) echo "Showing React container menu..."; react_container_menu ;;
    21) docker logs go-container ;;
    22) echo "Exiting..."; exit 0 ;;
    *) echo "Invalid option. Please try again." ;;
  esac
}

# Main loop to show the menu and run actions
while true; do
  show_menu
  read -p "Enter your choice (1-22): " choice
  perform_action $choice
done

