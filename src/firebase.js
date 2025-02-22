import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

    const firebaseConfig = {
        apiKey: "AIzaSyAzm5Z3INQT-GHOLeFGPJSJ2WlS-F_EEvA",
        authDomain: "hackathon-rtdb-b0e7f.firebaseapp.com",
        databaseURL: "https://hackathon-rtdb-b0e7f-default-rtdb.firebaseio.com",
        projectId: "hackathon-rtdb-b0e7f",
        storageBucket: "hackathon-rtdb-b0e7f.firebasestorage.app",
        messagingSenderId: "734113417736",
        appId: "1:734113417736:web:cdd25fdf939cb46f2edfbd"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);

      const database = getDatabase(app)
      export {database}
