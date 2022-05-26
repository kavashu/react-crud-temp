FROM kavashu/npm:latest
COPY . /tmp/
WORKDIR /tmp/react-crud-temp/
RUN npm install
CMD npm start

