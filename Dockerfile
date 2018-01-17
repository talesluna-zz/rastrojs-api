FROM node:stretch

# Create app directory
RUN mkdir -p /opt/services/rastrojs
WORKDIR /opt/services/rastrojs

# Here go all logs
RUN mkdir -p storage/logs/app
RUN chmod 777 storage/logs/app

# Start service
EXPOSE 3001
CMD [ "sh" ]
