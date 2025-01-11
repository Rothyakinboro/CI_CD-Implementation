FROM nginx:1.27.3-alpine-slim
COPY src/html /usr/share/nginx/html

# This is not really neccessary, only good for documentation
# EXPOSE 80

#nginx defaults to this command, not also neccessary 
#CMD ["nginx", "-g", "daemon off;"]