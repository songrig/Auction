import { getStorage, ref } from "firebase/storage";

// Create a root reference
const storage = getStorage();

// Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'C:\Users\hakob\Desktop/download.png');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'C:\Users\hakob\Desktop/download.png');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 