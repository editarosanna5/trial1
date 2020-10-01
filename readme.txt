Extracting files:
  1. extract 'newlink.zip'
  2. extract '/newlink/conFusionServer.zip'
  3. extract '/newlink/conFusionServer/conFusion-React.zip'

Setting up app:
  1. Setting up mongodb:
     - ensure that the path '/newlink/mongodb/data' exists

  2. Setting up back-end:
     - in terminal:
       - cd to '/newlink/conFusionServer'
       - run: npm install

  3. Setting up front-end:
     - in terminal:
       - cd to '/newlink/conFusionServer/conFusion-React'
       - run: yarn install --ignore-engines


Starting app:
  1. Starting mongodb:
     - in terminal:
       - cd to '/newlink/mongodb'
       - run: mongod --dbpath=data --bind_ip 127.0.0.1

  2. Starting back-end:
     - in terminal:
       - cd to '/newlink/conFusionServer'
       - run: npm start

  3. Starting front-end:
     - in terminal:
       - cd to '/newlink/conFusionServer/conFusion-React'
       - run: yarn start

  4. Browser:
     - go to: https://localhost:3443/
     - allow not secured connection
     - go to: http://localhost:3001/ to use app

Useful commands:
  1. MongoDB:
     - in terminal:
       - run: mongo -> to start mongo shell
     - in mongo shell:
       - show dbs -> to list all available database
       - use <db name> -> to access <db name> database
         example:
           > use conFusion
       - show collections -> to list all available collections of the current database
       - db.<collection name>.find().pretty() -> to list all documents of <collection name>
         example:
           > db.feedbacks.find().pretty()
       - db.<collection name>.insert(<key value pairs>) -> to insert <key value pairs> to <collection name>
         example:
           > db.locations.insert({ name: "Taman Anggrek", image: "images/tamananggrek.png", address: "Jl. Letjen S. Parman No.Kav. 21, RT.12/RW.1, Tomang, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11440", contact: "672828182", capacity: "40", visitorIn: "40", visitorOut: "50", description: "Mal Taman Anggrek adalah sebuah pusat perbelanjaan yang terletak di Tanjung Duren Selatan, Grogol Petamburan, Jakarta Barat, Indonesia. Mal ini dibuka pada tahun 1996. Di pusat perbelanjaan ini, terdapat sebuah rink ice skating. Mall ini didirikan oleh Salimin Prawiro Sumarto, konglomerat asal Kebumen." })
       - exit -> to quit mongo shell