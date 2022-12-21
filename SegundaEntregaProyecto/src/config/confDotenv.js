import dotenv from "dotenv";
dotenv.config();

const PRODUCTOS_LISTADO = "productos";
const CARRITOS_LISTADO = "carritos";

const config = {
  SERVER: {
    selecBaseDeDatos: process.env.BASE ?? "memoria",
  },
  DATABASES: {
    filesystem: {
      PRODUCTOS_LISTADO,
      CARRITOS_LISTADO,
    },
    mongoDB: {
      url: process.env.MONGODB_URL,
      dbName: process.env.MONGODB_NOMBRE,
    },
    firebase: {
      type: "service_account",
      project_id: "backend-ecommerce-6cf27",
      private_key_id: "b1adb982503cc3cffc8ebe6bbd223ac9fd9f29a8",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCrwfJOZuFF8wFz\npoDpKzuddlUQfP2vwsCI9so5GEt+Fv7fv/Z/GRfhmGiuMouvWouboacDPq6Yyu3M\nGSOPOMJypUhwnLVImMV0YCuMcR0SPg3Yd3jmzmUpY7zebS++VkOY4R48c6j4IDPH\nw18c/MIXxvUgvwnu8g5FPSWa6UjybFKullAb4CzJJM/9WMwib3si3haFOkFLo34Q\nD8jOIToqq2D+KpJ7BIOMwsf4cUkl/HXbLuTZcv24Oi8fc/dzJpY3U/SQZK1QlrS4\nVJIMErijQ9JvRNE3+SCjwiR0Tpfl2bqZDUQjlwlnGCHHS9BUnl2ql8q4w6+vSHIJ\njNuriSTXAgMBAAECggEAG7b08V+6c/4NOusgG//E49inSzzP9p93T+J6qRHZhKQT\nRmmETefvqZBdO9aeIZJ7uoYwG97ub2s3Sdq4mTCwd61h7gHrYqZ8HhYykLvj1AC9\nXTOSB7RAMJiOblmx/YWP7MhOh7SmDDut/0rwOw4yB4IsJbeN08etM9D1E3UXNz6t\nkmXquOWdHjkxjklou/f3CesewVCT9Jf9qWB3iEtM/9Ro6jonQctck/KAFUVzS1nA\nFZ85MDIEwp5pLKeBDGk2OuG0fNlbZ0criDOTTgZS07vMLa+SIGTMEU/S/1u/zIa7\neN/bXvnU5TfAM98Jz/+3XKcmChbBCCr7bch/Dz0bKQKBgQDhm5hvDyXHyL1HRYpR\nIzYBLl2ZPqxQNNHGPUP2HequeHx/iSqj4D0yonYwCSiDxpL+cqZBlMn77bpd9IV+\nV1Ugs4CG4JDZhYo3ra338js9rcaWwdiH/QIyUv47pyZxhBd56BJO/sS8dH3+wgPN\np0TKbWSWeVNvVdG5i6hPwcpYjQKBgQDC5UA6/LG6Slo5mDEUTB3UpCbOdXYptSQd\ntMZtQy8hhDPAsCmbSCQ94Vcfjby2u0360yNz6DqYX7B0vWXf008PHNiyZmiByQBd\nZIhalrc9IVbK+jFYEhpu1VTDRkaZjpp6m0H6YHcWendW9L3KS7TCEpsQY9QCf/RF\n+B723t8z8wJ/EL57kcKOC0Xaxm9i1KLIX04RpE4Ce/FvoEbrxFh0En7evphvkboS\n0K8+FlKXrzANuNTJghSI6Sm7qz16quXQa5zm7Ru9pGdE2t0JDF3uB6XeF1JLv8wH\nXbTLKaI+OC6Vj3ap5TMDZvk+YKoFnj3L3TpBPOnER38XEa5Lz5+SZQKBgDGiFHNx\nOwnIOaYFPip/H/GxRDi77TW97c6q5QWaYHxWoJ9nvZDQFHq10mw0umSG2tsPvi2c\nbJ+1bsisGy+fLrkYjY8RSXgT6kXefmMjktK8lM/oW3ykT5r+NTHtybj9ehXTSEAt\nJObSlWXNui+0i/oIpvjLk4h3cYwIHkqcg5dFAoGBANB9FRiLzPeebkKFrX1F5wlt\newQ4/738YAHe7m8JDp0y8EJiuVE3Y12UEg11A6WSPHfrJJxmbMfaD4hTk/A0K/+a\nFOL5GAsPZ7We8uUMMrNGVL1avPVKS3whX2Sr22AK5yVu0zL/Yzs1/BoMXyOpPEXX\n/3ZlpaDXhDtuZlNOINxT\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-9bl0u@backend-ecommerce-6cf27.iam.gserviceaccount.com",
      client_id: "111883407595980519977",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9bl0u%40backend-ecommerce-6cf27.iam.gserviceaccount.com",
    },
  },
};

export { config };
