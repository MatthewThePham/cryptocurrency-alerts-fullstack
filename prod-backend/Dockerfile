# Use Maven to build the application
# Use official Maven base image that includes OpenJDK 21
# Stage 1: Build
FROM maven:3.9.7 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project files into the container
COPY . /app
# Verify the presence of pom.xml and list files in the directory
RUN ls -l /app/pom.xml

# Build the application with Maven commands
RUN mvn clean install


# Stage 2: Runtime Use OpenJDK to run the application
FROM maven:3.9.7

# Set the working directory in the container
WORKDIR /app
COPY --from=build /app/target/cryptobackend-0.0.1-SNAPSHOT.jar cryptobackend.jar

# Expose the port that the application will run on
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "cryptobackend.jar"]
