import { v4 as uuidv4 } from "uuid";


function Sessions() {
    return [
        {
            name: "I Main Samus Now",
            cover: "https://chillhop.com/wp-content/uploads/2021/09/2ce75252f5419a45d76bb93424ac1eae3e688b17-1024x1024.jpg",
            artist: "Sleepy Fish",
            id: uuidv4(),
            active: true,
            color: ['#FEB58D', '#FD501C'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=24822"
        },
        {
            name: "Turbulence",
            cover: "https://chillhop.com/wp-content/uploads/2021/11/4c9682ee612a3b8ef51de286c49b5489408e9257-1024x1024.jpg",
            artist: "Parkbench Epiphany",
            id: uuidv4(),
            active: false,
            color: ['#161F29', '#ED9796'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=27503"
        },
        {
            name: "Seeds for Tomorrow",
            cover: "https://chillhop.com/wp-content/uploads/2021/08/af3ce13ad39d38057f00144f8a7c295877ccfec1-1024x1024.jpg",
            artist: "Smile High, Teddy Roxpin",
            id: uuidv4(),
            active: false,
            color: ['#234364', '#6797A3'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=23336"
        },
        {
            name: "When I Get Up In the Morn...",
            cover: "https://chillhop.com/wp-content/uploads/2021/07/5821e04fd52fa668a0b9890f213cbb12e454cc6b-1024x1024.jpg",
            artist: "Middle School",
            id: uuidv4(),
            active: false,
            color: ['#F66432', '#8A6057'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=22933"
        }
    ];
}

export default Sessions