import React from "react";
import { useState, useEffect } from "react";
import Result from "./result";
import { Link, redirect } from "react-router-dom";
import Modal from "react-modal";
import CryptoJS from "crypto-js";
import { SupabaseRegister } from "./supas/supabaseRegister";
import { SupabaseLogin } from "./supas/supabaseLogin";
import { SupabaseUser } from "./supas/supabaseUser";
import { SupabaseForgotPass } from "./supas/supabaseForgotPass";
import { tmdb } from "./supas/tmdbFetch";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

function Home() {
    localStorage.setItem("name", "");
    const [name, setName] = useState("");
    const [valid, setValid] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [button, setButton] = useState("Log In");
    const userID = localStorage.getItem("userId");

    const [feature, setFeature] = useState("");
    const [features, setFeatures] = useState([
        {
            adult: false,
            backdrop_path: "/hegMHNsxYGlGgVgaGz9FqxPqImr.jpg",
            genre_ids: [27, 9648, 53],
            id: 631842,
            original_language: "en",
            original_title: "Knock at the Cabin",
            overview:
                "While vacationing at a remote cabin, a young girl and her two fathers are taken hostage by four armed strangers who demand that the family make an unthinkable choice to avert the apocalypse. With limited access to the outside world, the family must decide what they believe before all is lost.",
            popularity: 4112.616,
            poster_path: "/dm06L9pxDOL9jNSK4Cb6y139rrG.jpg",
            release_date: "2023-02-01",
            title: "Knock at the Cabin",
            video: false,
            vote_average: 6.5,
            vote_count: 670,
        },
        {
            adult: false,
            backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
            genre_ids: [28, 12, 878],
            id: 505642,
            original_language: "en",
            original_title: "Black Panther: Wakanda Forever",
            overview:
                "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
            popularity: 2678.485,
            poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            release_date: "2022-11-09",
            title: "Black Panther: Wakanda Forever",
            video: false,
            vote_average: 7.4,
            vote_count: 3708,
        },
        {
            adult: false,
            backdrop_path: "/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg",
            genre_ids: [16, 12, 35],
            id: 315162,
            original_language: "en",
            original_title: "Puss in Boots: The Last Wish",
            overview:
                "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            popularity: 2311.833,
            poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
            release_date: "2022-12-07",
            title: "Puss in Boots: The Last Wish",
            video: false,
            vote_average: 8.4,
            vote_count: 4159,
        },
        {
            adult: false,
            backdrop_path: "/irwQcdjwtjLnaA0iErabab9PrmG.jpg",
            genre_ids: [28, 12, 53],
            id: 646389,
            original_language: "en",
            original_title: "Plane",
            overview:
                "After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.",
            popularity: 2001.922,
            poster_path: "/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg",
            release_date: "2023-01-12",
            title: "Plane",
            video: false,
            vote_average: 6.9,
            vote_count: 717,
        },
        {
            adult: false,
            backdrop_path: "/A2avUoNFstnBhAnHiogXQs4c9Bt.jpg",
            genre_ids: [18, 27, 9648],
            id: 772515,
            original_language: "es",
            original_title: "Huesera",
            overview:
                "Valeria's joy at becoming a first-time mother is quickly taken away when she's cursed by a sinister entity. As danger closes in, she's forced deeper into a chilling world of dark magic that threatens to consume her.",
            popularity: 1514.435,
            poster_path: "/1mZcxuL4GLUvPdEXC4iZPjG2EO3.jpg",
            release_date: "2023-02-10",
            title: "Huesera: The Bone Woman",
            video: false,
            vote_average: 6.6,
            vote_count: 40,
        },
        {
            adult: false,
            backdrop_path: "/k4V6EvpcOsu8CX10JD0H53lFXLq.jpg",
            genre_ids: [53, 28, 18, 80],
            id: 1058949,
            original_language: "en",
            original_title: "Little Dixie",
            overview:
                "Erstwhile Special Forces operative Doc Alexander is asked to broker a truce with the Mexican drug cartel in secrecy. When Oklahoma Governor Richard Jeffs celebrates the execution of a high-ranking cartel member on TV, his Chief of Staff and Doc inform him about the peace he just ended. But it’s too late, as Cuco, the cartel’s hatchet man, has set his vengeful sights on Doc’s daughter Dixie.",
            popularity: 1538.518,
            poster_path: "/cmWTZj9zzT9KFt3XyL0gssL7Ig8.jpg",
            release_date: "2023-02-03",
            title: "Little Dixie",
            video: false,
            vote_average: 6.2,
            vote_count: 33,
        },
        {
            adult: false,
            backdrop_path: "/af1tFYzzT2mHIy2l7nTIU8PWfak.jpg",
            genre_ids: [80, 18, 53],
            id: 842942,
            original_language: "en",
            original_title: "Bandit",
            overview:
                "After escaping a Michigan prison, a charming career criminal assumes a new identity in Canada and goes on to rob a record 59 banks and jewellery stores while being hunted by a rogue task force. Based on the story of The Flying Bandit.",
            popularity: 1272.966,
            poster_path: "/yph9PAbmjYPvyvbeZvdYIhCZHEu.jpg",
            release_date: "2022-09-23",
            title: "Bandit",
            video: false,
            vote_average: 6.6,
            vote_count: 83,
        },
        {
            adult: false,
            backdrop_path: "/ovM06PdF3M8wvKb06i4sjW3xoww.jpg",
            genre_ids: [878, 12, 28],
            id: 76600,
            original_language: "en",
            original_title: "Avatar: The Way of Water",
            overview:
                "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
            popularity: 1144.966,
            poster_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
            release_date: "2022-12-14",
            title: "Avatar: The Way of Water",
            video: false,
            vote_average: 7.7,
            vote_count: 5556,
        },
        {
            adult: false,
            backdrop_path: "/jYbABnXml6XyQ7cfhZFkMRZvMQz.jpg",
            genre_ids: [80, 28],
            id: 823999,
            original_language: "it",
            original_title: "Diabolik - Ginko all'attacco!",
            overview:
                "Diabolik nearly gets caught in Inspector Ginko's latest trap, leaving his partner in crime Eva Kant behind in the escape. Furious, Eva offers Ginko her help in capturing the King of Terror, but the former has to face the return of an old flame of his: Altea, Duchess of Vallenberg.",
            popularity: 1188.531,
            poster_path: "/31MkuLvT1CfGn7RYorWrqEY7NEM.jpg",
            release_date: "2022-11-17",
            title: "Diabolik - Ginko all'attacco!",
            video: false,
            vote_average: 5.8,
            vote_count: 46,
        },
        {
            adult: false,
            backdrop_path: "/dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg",
            genre_ids: [878, 27, 35],
            id: 536554,
            original_language: "en",
            original_title: "M3GAN",
            overview:
                "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
            popularity: 1117.018,
            poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
            release_date: "2022-12-28",
            title: "M3GAN",
            video: false,
            vote_average: 7.5,
            vote_count: 1844,
        },
        {
            adult: false,
            backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
            genre_ids: [28, 10749, 35],
            id: 758009,
            original_language: "en",
            original_title: "Shotgun Wedding",
            overview:
                "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
            popularity: 1030.834,
            poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
            release_date: "2022-12-28",
            title: "Shotgun Wedding",
            video: false,
            vote_average: 6.4,
            vote_count: 565,
        },
        {
            adult: false,
            backdrop_path: "/3JSoB7eMbCd8sE8alxNiUtrNiTz.jpg",
            genre_ids: [12, 878, 35],
            id: 640146,
            original_language: "en",
            original_title: "Ant-Man and the Wasp: Quantumania",
            overview:
                "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
            popularity: 1001.154,
            poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
            release_date: "2023-02-15",
            title: "Ant-Man and the Wasp: Quantumania",
            video: false,
            vote_average: 6.5,
            vote_count: 819,
        },
        {
            adult: false,
            backdrop_path: "/k64bxyjMaKCuqVzX2xVp4NCmGvq.jpg",
            genre_ids: [16, 10751, 35],
            id: 1058732,
            original_language: "en",
            original_title: "The Simpsons Meet the Bocellis in Feliz Navidad",
            overview:
                "This Christmas, Homer surprises Marge with the ultimate gift: an unforgettable performance from Italian opera superstar Andrea Bocelli and his children Matteo and Virginia.",
            popularity: 919.44,
            poster_path: "/9rJFKvYvSyQ3HoTl1gcU55FOzYi.jpg",
            release_date: "2022-12-15",
            title: "The Simpsons Meet the Bocellis in Feliz Navidad",
            video: false,
            vote_average: 5.3,
            vote_count: 20,
        },
        {
            adult: false,
            backdrop_path: "/cL0cdccOMzM508ODsWPfHVMMAzo.jpg",
            genre_ids: [28],
            id: 267805,
            original_language: "en",
            original_title: "There Are No Saints",
            overview:
                "A man is imprisoned for a crime he didn't commit. When his wife is murdered and his son kidnapped and taken to Mexico, he devises an elaborate and dangerous plan to rescue his son and avenge the murder.",
            popularity: 864.512,
            poster_path: "/fcOTYArjKuAgufwHoTvx8w9UKCv.jpg",
            release_date: "2022-05-27",
            title: "There Are No Saints",
            video: false,
            vote_average: 5.6,
            vote_count: 51,
        },
        {
            adult: false,
            backdrop_path: "/AsEgGeccI32SwMBkxpwhOkhbzmF.jpg",
            genre_ids: [28, 878, 53, 27],
            id: 1011679,
            original_language: "en",
            original_title: "Shark Side of the Moon",
            overview:
                "Decades ago, the USSR developed unkillable sharks and launched them to the moon. Today, a team of American astronauts will endure the fight of their lives.",
            popularity: 1286.971,
            poster_path: "/v5CfpzxoJDkZxjZAizClFdlEF0U.jpg",
            release_date: "2022-08-12",
            title: "Shark Side of the Moon",
            video: false,
            vote_average: 3.9,
            vote_count: 8,
        },
        {
            adult: false,
            backdrop_path: "/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg",
            genre_ids: [18],
            id: 785084,
            original_language: "en",
            original_title: "The Whale",
            overview:
                "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption.",
            popularity: 738.707,
            poster_path: "/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg",
            release_date: "2022-12-09",
            title: "The Whale",
            video: false,
            vote_average: 8,
            vote_count: 658,
        },
        {
            adult: false,
            backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
            genre_ids: [28, 80, 53],
            id: 1035806,
            original_language: "en",
            original_title: "Detective Knight: Independence",
            overview:
                "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
            popularity: 748.406,
            poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
            release_date: "2023-01-20",
            title: "Detective Knight: Independence",
            video: false,
            vote_average: 6.1,
            vote_count: 72,
        },
        {
            adult: false,
            backdrop_path: "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
            genre_ids: [28, 14, 878],
            id: 436270,
            original_language: "en",
            original_title: "Black Adam",
            overview:
                "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
            popularity: 751.656,
            poster_path: "/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
            release_date: "2022-10-19",
            title: "Black Adam",
            video: false,
            vote_average: 7.2,
            vote_count: 4311,
        },
        {
            adult: false,
            backdrop_path: "/afsYFdid9pnnRd6tTrHFUbHgXJn.jpg",
            genre_ids: [878, 28, 12],
            id: 843794,
            original_language: "ko",
            original_title: "정이",
            overview:
                "On an uninhabitable 22nd-century Earth, the outcome of a civil war hinges on cloning the brain of an elite soldier to create a robot mercenary.",
            popularity: 745.006,
            poster_path: "/z2nfRxZCGFgAnVhb9pZO87TyTX5.jpg",
            release_date: "2023-01-20",
            title: "JUNG_E",
            video: false,
            vote_average: 6.3,
            vote_count: 351,
        },
        {
            adult: false,
            backdrop_path: "/a4I481szRmycyreQTLrRe4f4YJe.jpg",
            genre_ids: [80, 53, 18],
            id: 842544,
            original_language: "en",
            original_title: "Transfusion",
            overview:
                "Ryan Logan, a former Special Forces operative, is battling to cope with life after the loss of his wife.  He is thrusted into the criminal underworld to keep his only son from being taken from him.",
            popularity: 666.272,
            poster_path: "/bxh5xCCW9Ynfg6EZJWUkc1zqTnr.jpg",
            release_date: "2023-01-05",
            title: "Transfusion",
            video: false,
            vote_average: 6.6,
            vote_count: 123,
        },
    ]);

    const [topRated, setTopRated] = useState([
        {
            adult: false,
            backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            genre_ids: [18, 80],
            id: 238,
            original_language: "en",
            original_title: "The Godfather",
            overview:
                "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
            popularity: 108.335,
            poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            release_date: "1972-03-14",
            title: "The Godfather",
            video: false,
            vote_average: 8.7,
            vote_count: 17571,
        },
        {
            adult: false,
            backdrop_path: "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
            genre_ids: [18, 80],
            id: 278,
            original_language: "en",
            original_title: "The Shawshank Redemption",
            overview:
                "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
            popularity: 80.528,
            poster_path: "/hBcY0fE9pfXzvVaY4GKarweriG2.jpg",
            release_date: "1994-09-23",
            title: "The Shawshank Redemption",
            video: false,
            vote_average: 8.7,
            vote_count: 23407,
        },
        {
            adult: false,
            backdrop_path: "/ejniJnlOdtSgtbh8D7u2RxT6Uli.jpg",
            genre_ids: [35, 14],
            id: 772071,
            original_language: "es",
            original_title: "Cuando Sea Joven",
            overview:
                '70-year-old Malena gets a second chance at life when she magically turns into her 22-year-old self. Now, posing as "Maria" to hide her true identity, she becomes the lead singer of her grandson\'s band and tries to recover her dream of singing, which she had to give up at some point.',
            popularity: 42.437,
            poster_path: "/6gIJuFHh5Lj4dNaPG3TzIMl7L68.jpg",
            release_date: "2022-09-14",
            title: "Cuando Sea Joven",
            video: false,
            vote_average: 8.7,
            vote_count: 209,
        },
        {
            adult: false,
            backdrop_path: "/wxaBkuqVIgImjRHEMJoxL9Lq6i8.jpg",
            genre_ids: [16, 10751, 12, 14],
            id: 995133,
            original_language: "en",
            original_title: "The Boy, the Mole, the Fox and the Horse",
            overview:
                "The unlikely friendship of a boy, a mole, a fox and a horse traveling together in the boy’s search for home.",
            popularity: 42.034,
            poster_path: "/oQRgyQCzcyZvE6w5heM9ktVY0LT.jpg",
            release_date: "2022-12-25",
            title: "The Boy, the Mole, the Fox and the Horse",
            video: false,
            vote_average: 8.6,
            vote_count: 252,
        },
        {
            adult: false,
            backdrop_path: "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
            genre_ids: [18, 80],
            id: 240,
            original_language: "en",
            original_title: "The Godfather Part II",
            overview:
                "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
            popularity: 60.487,
            poster_path: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
            release_date: "1974-12-20",
            title: "The Godfather Part II",
            video: false,
            vote_average: 8.6,
            vote_count: 10639,
        },
        {
            adult: false,
            backdrop_path: "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
            genre_ids: [18, 36, 10752],
            id: 424,
            original_language: "en",
            original_title: "Schindler's List",
            overview:
                "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
            popularity: 56.723,
            poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
            release_date: "1993-12-15",
            title: "Schindler's List",
            video: false,
            vote_average: 8.6,
            vote_count: 13840,
        },
        {
            adult: false,
            backdrop_path: "/vI3aUGTuRRdM7J78KIdW98LdxE5.jpg",
            genre_ids: [35, 18, 10749],
            id: 19404,
            original_language: "hi",
            original_title: "दिलवाले दुल्हनिया ले जायेंगे",
            overview:
                "Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé. Raj leaves for India with a mission at his hands, to claim his lady love under the noses of her whole family. Thus begins a saga.",
            popularity: 29.963,
            poster_path: "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
            release_date: "1995-10-19",
            title: "Dilwale Dulhania Le Jayenge",
            video: false,
            vote_average: 8.6,
            vote_count: 4072,
        },
        {
            adult: false,
            backdrop_path: "/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg",
            genre_ids: [16, 10751, 14],
            id: 129,
            original_language: "ja",
            original_title: "千と千尋の神隠し",
            overview:
                "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
            popularity: 79.997,
            poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
            release_date: "2001-07-20",
            title: "Spirited Away",
            video: false,
            vote_average: 8.5,
            vote_count: 14034,
        },
        {
            adult: false,
            backdrop_path: "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
            genre_ids: [18],
            id: 389,
            original_language: "en",
            original_title: "12 Angry Men",
            overview:
                "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and shut case soon becomes a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other.",
            popularity: 32.063,
            poster_path: "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
            release_date: "1957-04-10",
            title: "12 Angry Men",
            video: false,
            vote_average: 8.5,
            vote_count: 7097,
        },
        {
            adult: false,
            backdrop_path: "/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
            genre_ids: [10749, 16, 18],
            id: 372058,
            original_language: "ja",
            original_title: "君の名は。",
            overview:
                "High schoolers Mitsuha and Taki are complete strangers living separate lives. But one night, they suddenly switch places. Mitsuha wakes up in Taki’s body, and he in hers. This bizarre occurrence continues to happen randomly, and the two must adjust their lives around each other.",
            popularity: 98.769,
            poster_path: "/q719jXXEzOoYaps6babgKnONONX.jpg",
            release_date: "2016-08-26",
            title: "Your Name.",
            video: false,
            vote_average: 8.5,
            vote_count: 9581,
        },
        {
            adult: false,
            backdrop_path: "/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
            genre_ids: [35, 53, 18],
            id: 496243,
            original_language: "ko",
            original_title: "기생충",
            overview:
                "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
            popularity: 65.027,
            poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            release_date: "2019-05-30",
            title: "Parasite",
            video: false,
            vote_average: 8.5,
            vote_count: 15372,
        },
        {
            adult: false,
            backdrop_path: "/pbEkjhdfP7yuDcMB78YEZwgD4IN.jpg",
            genre_ids: [18, 28, 80, 53],
            id: 155,
            original_language: "en",
            original_title: "The Dark Knight",
            overview:
                "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
            popularity: 81.703,
            poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            release_date: "2008-07-14",
            title: "The Dark Knight",
            video: false,
            vote_average: 8.5,
            vote_count: 29306,
        },
        {
            adult: false,
            backdrop_path: "/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
            genre_ids: [14, 18, 80],
            id: 497,
            original_language: "en",
            original_title: "The Green Mile",
            overview:
                "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
            popularity: 72.783,
            poster_path: "/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
            release_date: "1999-12-10",
            title: "The Green Mile",
            video: false,
            vote_average: 8.5,
            vote_count: 15139,
        },
        {
            adult: false,
            backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
            genre_ids: [53, 80],
            id: 680,
            original_language: "en",
            original_title: "Pulp Fiction",
            overview:
                "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
            popularity: 85.751,
            poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            release_date: "1994-09-10",
            title: "Pulp Fiction",
            video: false,
            vote_average: 8.5,
            vote_count: 24787,
        },
        {
            adult: false,
            backdrop_path: "/eoCSp75lxatmIa6aGqfnzwtbttd.jpg",
            genre_ids: [37],
            id: 429,
            original_language: "it",
            original_title: "Il buono, il brutto, il cattivo",
            overview:
                "While the Civil War rages on between the Union and the Confederacy, three men – a quiet loner, a ruthless hitman, and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.",
            popularity: 47.805,
            poster_path: "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
            release_date: "1966-12-23",
            title: "The Good, the Bad and the Ugly",
            video: false,
            vote_average: 8.5,
            vote_count: 7261,
        },
        {
            adult: false,
            backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
            genre_ids: [35, 18, 10749],
            id: 13,
            original_language: "en",
            original_title: "Forrest Gump",
            overview:
                "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
            popularity: 70.366,
            poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            release_date: "1994-06-23",
            title: "Forrest Gump",
            video: false,
            vote_average: 8.5,
            vote_count: 24283,
        },
        {
            adult: false,
            backdrop_path: "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
            genre_ids: [12, 14, 28],
            id: 122,
            original_language: "en",
            original_title: "The Lord of the Rings: The Return of the King",
            overview:
                "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
            popularity: 83.617,
            poster_path: "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            release_date: "2003-12-01",
            title: "The Lord of the Rings: The Return of the King",
            video: false,
            vote_average: 8.5,
            vote_count: 21247,
        },
        {
            adult: false,
            backdrop_path: "/w2uGvCpMtvRqZg6waC1hvLyZoJa.jpg",
            genre_ids: [10749],
            id: 696374,
            original_language: "en",
            original_title: "Gabriel's Inferno",
            overview:
                "An intriguing and sinful exploration of seduction, forbidden love, and redemption, Gabriel's Inferno is a captivating and wildly passionate tale of one man's escape from his own personal hell as he tries to earn the impossible--forgiveness and love.",
            popularity: 15.077,
            poster_path: "/oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg",
            release_date: "2020-05-29",
            title: "Gabriel's Inferno",
            video: false,
            vote_average: 8.5,
            vote_count: 2327,
        },
        {
            adult: false,
            backdrop_path: "/3RMLbSEXOn1CzLoNT7xFeLfdxhq.jpg",
            genre_ids: [10749, 16],
            id: 372754,
            original_language: "ja",
            original_title: "同級生",
            overview:
                "Rihito Sajo, an honor student with a perfect score on the entrance exam and Hikaru Kusakabe, in a band and popular among girls, would have never crossed paths. Until one day they started talking at the practice for their school’s upcoming chorus festival. After school, the two meet regularly, as Hikaru helps Rihito to improve his singing skills. While they listen to each other’s voice and harmonize, their hearts start to beat together.",
            popularity: 12.411,
            poster_path: "/cIfRCA5wEvj9tApca4UDUagQEiM.jpg",
            release_date: "2016-02-20",
            title: "Dou kyu sei – Classmates",
            video: false,
            vote_average: 8.5,
            vote_count: 292,
        },
        {
            adult: false,
            backdrop_path: "/sw7mordbZxgITU877yTpZCud90M.jpg",
            genre_ids: [18, 80],
            id: 769,
            original_language: "en",
            original_title: "GoodFellas",
            overview:
                "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway.",
            popularity: 39.586,
            poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
            release_date: "1990-09-12",
            title: "GoodFellas",
            video: false,
            vote_average: 8.5,
            vote_count: 11052,
        },
    ]);
    const [theatres, setTheatres] = useState([
        {
            adult: false,
            backdrop_path: "/22z44LPkMyf5nyyXvv8qQLsbom.jpg",
            genre_ids: [27, 9648, 53],
            id: 631842,
            original_language: "en",
            original_title: "Knock at the Cabin",
            overview:
                "While vacationing at a remote cabin, a young girl and her two fathers are taken hostage by four armed strangers who demand that the family make an unthinkable choice to avert the apocalypse. With limited access to the outside world, the family must decide what they believe before all is lost.",
            popularity: 2617.181,
            poster_path: "/dm06L9pxDOL9jNSK4Cb6y139rrG.jpg",
            release_date: "2023-02-01",
            title: "Knock at the Cabin",
            video: false,
            vote_average: 6.5,
            vote_count: 923,
        },
        {
            adult: false,
            backdrop_path: "/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg",
            genre_ids: [28, 35, 53],
            id: 1077280,
            original_language: "en",
            original_title: "Die Hart",
            overview:
                "Follows a fictionalized version of Kevin Hart, as he tries to become an action movie star. He attends a school run by Ron Wilcox, where he attempts to learn the ropes on how to become one of the industry's most coveted action stars.",
            popularity: 3187.531,
            poster_path: "/1EnBjTJ5utgT1OXYBZ8YwByRCzP.jpg",
            release_date: "2023-02-22",
            title: "Die Hart",
            video: false,
            vote_average: 6.3,
            vote_count: 135,
        },
        {
            adult: false,
            backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
            genre_ids: [28, 12, 878],
            id: 505642,
            original_language: "en",
            original_title: "Black Panther: Wakanda Forever",
            overview:
                "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
            popularity: 2159.377,
            poster_path: "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
            release_date: "2022-11-09",
            title: "Black Panther: Wakanda Forever",
            video: false,
            vote_average: 7.3,
            vote_count: 3953,
        },
        {
            adult: false,
            backdrop_path: "/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
            genre_ids: [16, 12, 35, 10751],
            id: 315162,
            original_language: "en",
            original_title: "Puss in Boots: The Last Wish",
            overview:
                "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            popularity: 2004.115,
            poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
            release_date: "2022-12-07",
            title: "Puss in Boots: The Last Wish",
            video: false,
            vote_average: 8.4,
            vote_count: 4400,
        },
        {
            adult: false,
            backdrop_path: "/v2LilmCylr3bL9TCZSj6syjowZh.jpg",
            genre_ids: [35, 18],
            id: 937278,
            original_language: "en",
            original_title: "A Man Called Otto",
            overview:
                "When a lively young family moves in next door, grumpy widower Otto Anderson meets his match in a quick-witted, pregnant woman named Marisol, leading to an unlikely friendship that turns his world upside down.",
            popularity: 1765.887,
            poster_path: "/130H1gap9lFfiTF9iDrqNIkFvC9.jpg",
            release_date: "2022-12-28",
            title: "A Man Called Otto",
            video: false,
            vote_average: 7.9,
            vote_count: 592,
        },
        {
            adult: false,
            backdrop_path: "/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg",
            genre_ids: [28, 12, 53],
            id: 646389,
            original_language: "en",
            original_title: "Plane",
            overview:
                "After a heroic job of successfully landing his storm-damaged aircraft in a war zone, a fearless pilot finds himself between the agendas of multiple militias planning to take the plane and its passengers hostage.",
            popularity: 1449.384,
            poster_path: "/qi9r5xBgcc9KTxlOLjssEbDgO0J.jpg",
            release_date: "2023-01-12",
            title: "Plane",
            video: false,
            vote_average: 6.9,
            vote_count: 834,
        },
        {
            adult: false,
            backdrop_path: "/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
            genre_ids: [18, 28],
            id: 677179,
            original_language: "en",
            original_title: "Creed III",
            overview:
                "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien - a fighter who has nothing to lose.",
            popularity: 1427.727,
            poster_path: "/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
            release_date: "2023-03-01",
            title: "Creed III",
            video: false,
            vote_average: 6.9,
            vote_count: 252,
        },
        {
            adult: false,
            backdrop_path: "/k4V6EvpcOsu8CX10JD0H53lFXLq.jpg",
            genre_ids: [53, 28, 18, 80],
            id: 1058949,
            original_language: "en",
            original_title: "Little Dixie",
            overview:
                "Erstwhile Special Forces operative Doc Alexander is asked to broker a truce with the Mexican drug cartel in secrecy. When Oklahoma Governor Richard Jeffs celebrates the execution of a high-ranking cartel member on TV, his Chief of Staff and Doc inform him about the peace he just ended. But it’s too late, as Cuco, the cartel’s hatchet man, has set his vengeful sights on Doc’s daughter Dixie.",
            popularity: 1142.489,
            poster_path: "/cmWTZj9zzT9KFt3XyL0gssL7Ig8.jpg",
            release_date: "2023-02-03",
            title: "Little Dixie",
            video: false,
            vote_average: 5.9,
            vote_count: 71,
        },
        {
            adult: false,
            backdrop_path: "/A2avUoNFstnBhAnHiogXQs4c9Bt.jpg",
            genre_ids: [18, 27, 9648],
            id: 772515,
            original_language: "es",
            original_title: "Huesera",
            overview:
                "Valeria's joy at becoming a first-time mother is quickly taken away when she's cursed by a sinister entity. As danger closes in, she's forced deeper into a chilling world of dark magic that threatens to consume her.",
            popularity: 964.908,
            poster_path: "/uAfg3tKt7u3DFBipSBahFQMW8s9.jpg",
            release_date: "2023-02-10",
            title: "Huesera: The Bone Woman",
            video: false,
            vote_average: 6,
            vote_count: 121,
        },
        {
            adult: false,
            backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
            genre_ids: [28, 10749, 35],
            id: 758009,
            original_language: "en",
            original_title: "Shotgun Wedding",
            overview:
                "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
            popularity: 897.659,
            poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
            release_date: "2022-12-28",
            title: "Shotgun Wedding",
            video: false,
            vote_average: 6.3,
            vote_count: 626,
        },
        {
            adult: false,
            backdrop_path: "/wVxlmhk4OS2eCr0wTQcM4zJ20ml.jpg",
            genre_ids: [35, 18, 10749],
            id: 906221,
            original_language: "en",
            original_title: "Magic Mike's Last Dance",
            overview:
                "Mike Lane takes to the stage again after a lengthy hiatus, following a business deal that went bust, leaving him broke and taking bartender gigs in Florida. For what he hopes will be one last hurrah, Mike heads to London with a wealthy socialite who lures him with an offer he can’t refuse… and an agenda all her own. With everything on the line, once Mike discovers what she truly has in mind, will he—and the roster of hot new dancers he’ll have to whip into shape—be able to pull it off?",
            popularity: 863.553,
            poster_path: "/5C9rerMqV1X0jnRdbbsM1BswVI2.jpg",
            release_date: "2023-02-09",
            title: "Magic Mike's Last Dance",
            video: false,
            vote_average: 7.2,
            vote_count: 123,
        },
        {
            adult: false,
            backdrop_path: "/3JSoB7eMbCd8sE8alxNiUtrNiTz.jpg",
            genre_ids: [12, 878, 35],
            id: 640146,
            original_language: "en",
            original_title: "Ant-Man and the Wasp: Quantumania",
            overview:
                "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
            popularity: 842.356,
            poster_path: "/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg",
            release_date: "2023-02-15",
            title: "Ant-Man and the Wasp: Quantumania",
            video: false,
            vote_average: 6.4,
            vote_count: 951,
        },
        {
            adult: false,
            backdrop_path: "/fTLMsF3IVLMcpNqIqJRweGvVwtX.jpg",
            genre_ids: [28, 80, 53],
            id: 1035806,
            original_language: "en",
            original_title: "Detective Knight: Independence",
            overview:
                "Detective James Knight 's last-minute assignment to the Independence Day shift turns into a race to stop an unbalanced ambulance EMT from imperiling the city's festivities. The misguided vigilante, playing cop with a stolen gun and uniform, has a bank vault full of reasons to put on his own fireworks show... one that will strike dangerously close to Knight's home.",
            popularity: 620.683,
            poster_path: "/jrPKVQGjc3YZXm07OYMriIB47HM.jpg",
            release_date: "2023-01-20",
            title: "Detective Knight: Independence",
            video: false,
            vote_average: 5.6,
            vote_count: 96,
        },
        {
            adult: false,
            backdrop_path: "/a4I481szRmycyreQTLrRe4f4YJe.jpg",
            genre_ids: [80, 53, 18],
            id: 842544,
            original_language: "en",
            original_title: "Transfusion",
            overview:
                "Ryan Logan, a former Special Forces operative, is battling to cope with life after the loss of his wife.  He is thrusted into the criminal underworld to keep his only son from being taken from him.",
            popularity: 580.511,
            poster_path: "/bxh5xCCW9Ynfg6EZJWUkc1zqTnr.jpg",
            release_date: "2023-01-05",
            title: "Transfusion",
            video: false,
            vote_average: 6.6,
            vote_count: 129,
        },
        {
            adult: false,
            backdrop_path: "/r7Dfg9aRZ78gJsmDlCirIIlNH3d.jpg",
            genre_ids: [18],
            id: 785084,
            original_language: "en",
            original_title: "The Whale",
            overview:
                "A reclusive English teacher suffering from severe obesity attempts to reconnect with his estranged teenage daughter for one last chance at redemption.",
            popularity: 613.685,
            poster_path: "/jQ0gylJMxWSL490sy0RrPj1Lj7e.jpg",
            release_date: "2022-12-09",
            title: "The Whale",
            video: false,
            vote_average: 8,
            vote_count: 912,
        },
        {
            adult: false,
            backdrop_path: "/ae4xZiU7IeFVrvXxm2GjdcTrBm.jpg",
            genre_ids: [27, 9648, 53],
            id: 934433,
            original_language: "en",
            original_title: "Scream VI",
            overview:
                "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
            popularity: 588.087,
            poster_path: "/t2NEaFrNFRCrBIyAETlz5sqq15H.jpg",
            release_date: "2023-03-08",
            title: "Scream VI",
            video: false,
            vote_average: 7.6,
            vote_count: 47,
        },
        {
            adult: false,
            backdrop_path: "/pEwyF5rdnNqdesnZIADMZSd8peQ.jpg",
            genre_ids: [35, 18],
            id: 497828,
            original_language: "en",
            original_title: "Triangle of Sadness",
            overview:
                "A celebrity model couple are invited on a luxury cruise for the uber-rich, helmed by an unhinged, alcoholic captain. What first appears Instagrammable ends catastrophically, leaving the survivors stranded on a desert island in a struggle of hierarchy.",
            popularity: 569.004,
            poster_path: "/k9eLozCgCed5FGTSdHu0bBElAV8.jpg",
            release_date: "2022-09-23",
            title: "Triangle of Sadness",
            video: false,
            vote_average: 7.3,
            vote_count: 945,
        },
        {
            adult: false,
            backdrop_path: "/jhi3K0rN46SSu9wEu6zYVCOeVtH.jpg",
            genre_ids: [16, 28, 878],
            id: 1003580,
            original_language: "en",
            original_title: "Legion of Super-Heroes",
            overview:
                "Kara, devastated by the loss of Krypton, struggles to adjust to her new life on Earth. Her cousin, Superman, mentors her and suggests she leave their space-time to attend the Legion Academy in the 31st century, where she makes new friends and a new enemy: Brainiac 5. Meanwhile, she must contend with a mysterious group called the Dark Circle as it searches for a powerful weapon held in the Academy’s vault.",
            popularity: 563.183,
            poster_path: "/8M6bA5t2q5u1nWDTEIXuGDwvboW.jpg",
            release_date: "2023-02-07",
            title: "Legion of Super-Heroes",
            video: false,
            vote_average: 6.5,
            vote_count: 64,
        },
        {
            adult: false,
            backdrop_path: "/5pMy5LF2JAleBNBtuzizfCMWM7k.jpg",
            genre_ids: [10752, 36, 18],
            id: 653851,
            original_language: "en",
            original_title: "Devotion",
            overview:
                "The harrowing true story of two elite US Navy fighter pilots during the Korean War. Their heroic sacrifices would ultimately make them the Navy's most celebrated wingmen.",
            popularity: 506.499,
            poster_path: "/lwybGlEEJtXZM3ynY19PNwNlPn9.jpg",
            release_date: "2022-11-23",
            title: "Devotion",
            video: false,
            vote_average: 7.4,
            vote_count: 353,
        },
        {
            adult: false,
            backdrop_path: "/1DBDwevWS8OhiT3wqqlW7KGPd6m.jpg",
            genre_ids: [53],
            id: 985939,
            original_language: "en",
            original_title: "Fall",
            overview:
                "For best friends Becky and Hunter, life is all about conquering fears and pushing limits. But after they climb 2,000 feet to the top of a remote, abandoned radio tower, they find themselves stranded with no way down. Now Becky and Hunter’s expert climbing skills will be put to the ultimate test as they desperately fight to survive the elements, a lack of supplies, and vertigo-inducing heights",
            popularity: 562.165,
            poster_path: "/v28T5F1IygM8vXWZIycfNEm3xcL.jpg",
            release_date: "2022-08-11",
            title: "Fall",
            video: false,
            vote_average: 7.3,
            vote_count: 2504,
        },
    ]);
    const [upcoming, setUpcoming] = useState([
        {
            adult: false,
            backdrop_path: "/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
            genre_ids: [16, 12, 35, 10751],
            id: 315162,
            original_language: "en",
            original_title: "Puss in Boots: The Last Wish",
            overview:
                "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
            popularity: 2004.115,
            poster_path: "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
            release_date: "2022-12-07",
            title: "Puss in Boots: The Last Wish",
            video: false,
            vote_average: 8.4,
            vote_count: 4400,
        },
        {
            adult: false,
            backdrop_path: "/v2LilmCylr3bL9TCZSj6syjowZh.jpg",
            genre_ids: [35, 18],
            id: 937278,
            original_language: "en",
            original_title: "A Man Called Otto",
            overview:
                "When a lively young family moves in next door, grumpy widower Otto Anderson meets his match in a quick-witted, pregnant woman named Marisol, leading to an unlikely friendship that turns his world upside down.",
            popularity: 1765.887,
            poster_path: "/130H1gap9lFfiTF9iDrqNIkFvC9.jpg",
            release_date: "2022-12-28",
            title: "A Man Called Otto",
            video: false,
            vote_average: 7.9,
            vote_count: 592,
        },
        {
            adult: false,
            backdrop_path: "/dlrWhn0G3AtxYUx2D9P2bmzcsvF.jpg",
            genre_ids: [878, 27, 35],
            id: 536554,
            original_language: "en",
            original_title: "M3GAN",
            overview:
                "A brilliant toy company roboticist uses artificial intelligence to develop M3GAN, a life-like doll programmed to emotionally bond with her newly orphaned niece. But when the doll's programming works too well, she becomes overprotective of her new friend with terrifying results.",
            popularity: 975.475,
            poster_path: "/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg",
            release_date: "2022-12-28",
            title: "M3GAN",
            video: false,
            vote_average: 7.5,
            vote_count: 1957,
        },
        {
            adult: false,
            backdrop_path: "/A2avUoNFstnBhAnHiogXQs4c9Bt.jpg",
            genre_ids: [18, 27, 9648],
            id: 772515,
            original_language: "es",
            original_title: "Huesera",
            overview:
                "Valeria's joy at becoming a first-time mother is quickly taken away when she's cursed by a sinister entity. As danger closes in, she's forced deeper into a chilling world of dark magic that threatens to consume her.",
            popularity: 964.908,
            poster_path: "/uAfg3tKt7u3DFBipSBahFQMW8s9.jpg",
            release_date: "2023-02-10",
            title: "Huesera: The Bone Woman",
            video: false,
            vote_average: 6,
            vote_count: 121,
        },
        {
            adult: false,
            backdrop_path: "/zGoZB4CboMzY1z4G3nU6BWnMDB2.jpg",
            genre_ids: [28, 10749, 35],
            id: 758009,
            original_language: "en",
            original_title: "Shotgun Wedding",
            overview:
                "Darcy and Tom gather their families for the ultimate destination wedding but when the entire party is taken hostage, “’Til Death Do Us Part” takes on a whole new meaning in this hilarious, adrenaline-fueled adventure as Darcy and Tom must save their loved ones—if they don’t kill each other first.",
            popularity: 897.659,
            poster_path: "/t79ozwWnwekO0ADIzsFP1E5SkvR.jpg",
            release_date: "2022-12-28",
            title: "Shotgun Wedding",
            video: false,
            vote_average: 6.3,
            vote_count: 626,
        },
        {
            adult: false,
            backdrop_path: "/ae4xZiU7IeFVrvXxm2GjdcTrBm.jpg",
            genre_ids: [27, 9648, 53],
            id: 934433,
            original_language: "en",
            original_title: "Scream VI",
            overview:
                "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
            popularity: 588.087,
            poster_path: "/t2NEaFrNFRCrBIyAETlz5sqq15H.jpg",
            release_date: "2023-03-08",
            title: "Scream VI",
            video: false,
            vote_average: 7.6,
            vote_count: 47,
        },
        {
            adult: false,
            backdrop_path: "/f9PSbuMeBS5CuHEOVyymg5lcq8J.jpg",
            genre_ids: [28, 53, 9648, 80, 27],
            id: 996727,
            original_language: "en",
            original_title: "The Price We Pay",
            overview:
                "After a pawn shop robbery goes askew, two criminals take refuge at a remote farmhouse to try to let the heat die down, but find something much more menacing.",
            popularity: 474.746,
            poster_path: "/8fwJt0qZieQ7dKaiiqehObWpXYT.jpg",
            release_date: "2023-01-13",
            title: "The Price We Pay",
            video: false,
            vote_average: 6.1,
            vote_count: 86,
        },
        {
            adult: false,
            backdrop_path: "/jDkmlTz9xBmhsIIyORb68VqRlL2.jpg",
            genre_ids: [27],
            id: 955991,
            original_language: "en",
            original_title: "The Offering",
            overview:
                "In the wake of a young Jewish girl’s disappearance, the son of a Hasidic funeral director returns home with his pregnant wife in hopes of reconciling with his father. Little do they know that directly beneath them in the family morgue, an ancient evil with sinister plans for the unborn child lurks inside a mysterious corpse.",
            popularity: 389.95,
            poster_path: "/tbaTFgGIaTL1Uhd0SMob6Dhi5cK.jpg",
            release_date: "2022-09-23",
            title: "The Offering",
            video: false,
            vote_average: 5.6,
            vote_count: 102,
        },
        {
            adult: false,
            backdrop_path: "/v2GqQcm4Yg54ADrdbEi4Y1FZZhz.jpg",
            genre_ids: [53, 27],
            id: 746524,
            original_language: "en",
            original_title: "Blood",
            overview:
                "Jess, a newly separated mother and nurse, moves into her old family farmhouse with Tyler, her teenage daughter, and Owen, her eight-year-old son. One night, the family dog senses something in the woods and runs off to find it. He returns a couple of days later and attacks Owen, savagely biting him before Jess is able to intervene. Owen is rushed to the hospital. His condition worsens, and no one can figure out why... until Jess discovers a disturbing cure...",
            popularity: 291.083,
            poster_path: "/gCUFtTvjK4gbmjVxhx8bhyOhAeW.jpg",
            release_date: "2023-01-12",
            title: "Blood",
            video: false,
            vote_average: 5.9,
            vote_count: 40,
        },
        {
            adult: false,
            backdrop_path: "/e8BCc8Jk11dnSffI6ElICLePvLZ.jpg",
            genre_ids: [28, 53, 80],
            id: 603692,
            original_language: "en",
            original_title: "John Wick: Chapter 4",
            overview:
                "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
            popularity: 284.442,
            poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            release_date: "2023-03-22",
            title: "John Wick: Chapter 4",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/hJoe1i1MXoO7sXkbQRuONvUNPEo.jpg",
            genre_ids: [16, 12, 10751, 14],
            id: 502356,
            original_language: "en",
            original_title: "The Super Mario Bros. Movie",
            overview:
                "After finding himself in a world known as the Mushroom Kingdom, Brooklyn plumber Mario must travel alongside a princess named Peach and a mushroom named Toad to find his brother Luigi and save the world from a ruthless fire-breathing monster called Bowser.",
            popularity: 250.517,
            poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
            release_date: "2023-03-30",
            title: "The Super Mario Bros. Movie",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/eIeCUHk8q7smdd2KAiPBmceN7QS.jpg",
            genre_ids: [35, 10751, 10402],
            id: 830784,
            original_language: "en",
            original_title: "Lyle, Lyle, Crocodile",
            overview:
                "When the Primm family moves to New York City, their young son Josh struggles to adapt to his new school and new friends. All of that changes when he discovers Lyle — a singing crocodile who loves baths, caviar and great music — living in the attic of his new home. But when Lyle’s existence is threatened by evil neighbor Mr. Grumps, the Primms must band together to show the world that family can come from the most unexpected places.",
            popularity: 220.005,
            poster_path: "/irIS5Tn3TXjNi1R9BpWvGAN4CZ1.jpg",
            release_date: "2022-10-07",
            title: "Lyle, Lyle, Crocodile",
            video: false,
            vote_average: 7.6,
            vote_count: 363,
        },
        {
            adult: false,
            backdrop_path: "/jBIMZ0AlUYuFNsKbd4L6FojWMoy.jpg",
            genre_ids: [16, 35, 10749],
            id: 820067,
            original_language: "ja",
            original_title: "映画 五等分の花嫁",
            overview:
                "When five lovely young girls who hate studying hire part-time tutor Futaro, he guides not only their education but also their hearts. Time spent has brought them all closer, with feelings growing within the girls and Futaro. As they finish their third year of high school and their last school festival approaches, they set their sights on what’s next. Is there a future with one of them and Futaro?",
            popularity: 176.585,
            poster_path: "/xTlAhTivEObHRFBKjAMVSyRQGv2.jpg",
            release_date: "2022-05-20",
            title: "The Quintessential Quintuplets Movie",
            video: false,
            vote_average: 8.5,
            vote_count: 195,
        },
        {
            adult: false,
            backdrop_path: "/5HpDmq6nWTRCcvRynYKqgfLtqMb.jpg",
            genre_ids: [14, 28, 35],
            id: 594767,
            original_language: "en",
            original_title: "Shazam! Fury of the Gods",
            overview:
                'Billy Batson and his foster siblings, who transform into superheroes by saying "Shazam!", are forced to get back into action and fight the Daughters of Atlas, who they must stop from using a weapon that could destroy the world.',
            popularity: 186.938,
            poster_path: "/zpCCTtuQMHiHycpsrWnW2eCrBql.jpg",
            release_date: "2023-03-15",
            title: "Shazam! Fury of the Gods",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
        {
            adult: false,
            backdrop_path: "/A5JyEZvXHbPLN2cU65oB9NaIuYH.jpg",
            genre_ids: [53, 9648, 18, 27],
            id: 768362,
            original_language: "en",
            original_title: "Missing",
            overview:
                "When her mother disappears while on vacation in Colombia with her new boyfriend, June’s search for answers is hindered by international red tape. Stuck thousands of miles away in Los Angeles, June creatively uses all the latest technology at her fingertips to try and find her before it’s too late. But as she digs deeper, her digital sleuthing raises more questions than answers... and when June unravels secrets about her mom, she discovers that she never really knew her at all.",
            popularity: 262.669,
            poster_path: "/wEOUYSU5Uf8J7152PT6jdb5233Y.jpg",
            release_date: "2023-01-19",
            title: "Missing",
            video: false,
            vote_average: 7.8,
            vote_count: 95,
        },
        {
            adult: false,
            backdrop_path: "/6ikTLqVFjQvQUC06QBuEHGTbkWH.jpg",
            genre_ids: [878, 53],
            id: 700391,
            original_language: "en",
            original_title: "65",
            overview:
                "After a catastrophic crash on an unknown planet, pilot Mills quickly discovers he's actually stranded on Earth…65 million years ago. Now, with only one chance at rescue, Mills and the only other survivor, Koa, must make their way across an unknown terrain riddled with dangerous prehistoric creatures in an epic fight to survive.",
            popularity: 233.407,
            poster_path: "/uMMIeMVk1TCG3CZilpxbzFh0JKT.jpg",
            release_date: "2023-03-02",
            title: "65",
            video: false,
            vote_average: 6.6,
            vote_count: 5,
        },
        {
            adult: false,
            backdrop_path: "/cSjccCESfkHq2AltVkY3WRYXqdg.jpg",
            genre_ids: [9648, 53, 18],
            id: 850028,
            original_language: "en",
            original_title: "Alice, Darling",
            overview:
                "A young woman trapped in an abusive relationship becomes an unwitting participant in an intervention staged by her two closest friends.",
            popularity: 160.011,
            poster_path: "/ybqS7I4tuMs1TIssvuLMk2lYlLe.jpg",
            release_date: "2022-12-30",
            title: "Alice, Darling",
            video: false,
            vote_average: 6.1,
            vote_count: 51,
        },
        {
            adult: false,
            backdrop_path: "/uI1EvYeXNri9BbpcP3YzE4XVUJW.jpg",
            genre_ids: [12, 16, 35, 10751, 14],
            id: 816904,
            original_language: "es",
            original_title: "Momias",
            overview:
                "Through a series of unfortunate events, three mummies end up in present-day London and embark on a wacky and hilarious journey in search of an old ring belonging to the Royal Family, that was stolen by the ambitious archaeologist Lord Carnaby.",
            popularity: 152.123,
            poster_path: "/r6Ghtw9ENhTXfeUsd1Al20ZAvX.jpg",
            release_date: "2023-01-05",
            title: "Mummies",
            video: false,
            vote_average: 6.1,
            vote_count: 20,
        },
        {
            adult: false,
            backdrop_path: "/yVpILj2KX3WylLLT49GZbj2M9AO.jpg",
            genre_ids: [10749, 18],
            id: 845659,
            original_language: "en",
            original_title: "Perfect Addiction",
            overview:
                "When successful boxing trainer Sienna Lane discovers that her boyfriend Jax, the reigning champion, has been cheating on her with her own sister, she sets out to get revenge by training the one man capable of dethroning him: his arch-nemesis Kayden.",
            popularity: 138.685,
            poster_path: "/AaLnyYIAmMpHHPzowyoaY5sO2a1.jpg",
            release_date: "2023-02-16",
            title: "Perfect Addiction",
            video: false,
            vote_average: 4.5,
            vote_count: 2,
        },
        {
            adult: false,
            backdrop_path: "/fh7aM10THQzivGU7kAkgKrgzot4.jpg",
            genre_ids: [28, 12, 14],
            id: 493529,
            original_language: "en",
            original_title: "Dungeons & Dragons: Honor Among Thieves",
            overview:
                "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic, but things go dangerously awry when they run afoul of the wrong people.",
            popularity: 143.409,
            poster_path: "/6LuXaihVIoJ5FeSiFb7CZMtU7du.jpg",
            release_date: "2023-03-29",
            title: "Dungeons & Dragons: Honor Among Thieves",
            video: false,
            vote_average: 0,
            vote_count: 0,
        },
    ]);
    const [current, setCurrent] = useState(
        features.sort((a, b) => a.release_date - b.release_date)
    );

    useEffect(() => {
        if (userID) {
            const loginButtonDiv = document.getElementById("login");
            loginButtonDiv.style.display = "none";
            console.log("User has already logged in - ", userID);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("name", name);
        console.log("set local - ", localStorage.getItem("name"));
    }, [name]);
    const setValue = (s) => {
        setName(s.target.value);
        setValid(() => (s.target.value.length <= 1 ? false : true));
        console.log(s);
    };

    const invalidInput = () => {
        var input = document.getElementById("searchInput");

        console.warn("Movie name must be valid...");
        input.style.borderColor = "red";
        input.style.borderBottomWidth = "5px";
        input.style.animation = "shake";
        input.style.animationDuration = "1.5s";
    };
    const register = () => {
        var confirm = document.getElementById("confirmPass");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        var minHeight = document.getElementById("minHeightSet");
        backToLogin.style.display = "block";
        confirm.style.display = "block";
        loginContent.style.height = "75%";
        minHeight.style.minHeight = "350px";
        setButton("Register");
        forgotInputs.forEach((x) => {
            x.style.display = "none";
        });
    };
    const forgotPass = () => {
        var confirm = document.getElementById("confirmPass");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        var minHeight = document.getElementById("minHeightSet");
        backToLogin.style.display = "block";
        confirm.style.display = "block";
        loginContent.style.height = "75%";
        minHeight.style.minHeight = "350px";
        setButton("Confirm New Password");
        forgotInputs.forEach((x) => {
            x.style.display = "none";
        });
    };
    const toLogin = () => {
        var confirm = document.getElementById("confirmPass");
        var pass = document.getElementById("password");
        var loginContent = document.getElementById("loginContent");
        var backToLogin = document.getElementById("backToLogin");
        var forgotInputs = document.querySelectorAll(".forgotInputs");
        confirm.style.border = "none";
        pass.style.border = "none";
        backToLogin.style.display = "none";
        confirm.style.display = "none";
        loginContent.style.height = "65%";
        setButton("Log In");
        forgotInputs.forEach((x) => {
            x.style.display = "block";
        });
    };
    // if modal is closed, button will be Log in
    useEffect(() => {
        setButton("Log In");
    }, []);

    function hashPassword(pass) {
        // Define a key and a iv (initialization vector)
        let key = CryptoJS.enc.Utf8.parse("0123456789abcdef");
        let iv = CryptoJS.enc.Utf8.parse("abcdefghijklmnop");
        // Encrypt the password using AES
        let encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(pass),
            key,
            {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        // Return the encrypted password as a hexadecimal string
        return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    }

    const setList = async (x) => {
        // popular, toprated, theatres, upcoming
        switch (x) {
            case "theatres":
                setCurrent(
                    theatres.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "popular":
                setCurrent(
                    features.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "top rated":
                setCurrent(
                    topRated.sort((a, b) => a.release_date - b.release_date)
                );
                break;
            case "upcoming":
                setCurrent(
                    upcoming.sort((a, b) => a.release_date - b.release_date)
                );
                break;

            default:
                break;
        }
        console.log(x);
        if (x === "theatres") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            var t = document.getElementById("theatres");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("theatres");
        } else if (x === "popular") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("popular");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("popular");
        } else if (x === "top rated") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("toprated");
            t.style.backgroundColor = "blue";
            t.style.color = "white";
            setFeature("toprated");
            console.log(t);
        } else if (x === "upcoming") {
            let f = document.getElementById(feature);
            if (f) {
                f.style.backgroundColor = "transparent";
                f.style.color = "rgb(1, 50, 156)";
            }
            t = document.getElementById("upcoming");
            t.style.backgroundColor = "rgb(2, 78, 255)";
            t.style.color = "white";
            setFeature("upcoming");
        }
        return tmdb(x);
    };
    var dedi = "";
    useEffect(() => {
        if (feature === "") {
            setFeature("popular");
            let t = document.getElementById("popular");
            t.backgroundColor = "rgb(2, 78, 255)";
            t.color = "white";
        }
        var x = setList("popular");
        // setFeatures(x);
        // dedi = features.map((x) => {
        //     console.log(x.title);
        //     return <div>{x.title}</div>;
        // });
        // const feats = document.getElementById("features");
        // feats.innerHTML = dedi;
    }, []);

    const loginHandler = async (e) => {
        var v = e.target.value;
        if (v === "Register") {
            var confirm = document.getElementById("confirmPass");
            var pass = document.getElementById("password");
            var user = document.getElementById("username");
            console.log(username, password, confirmPass);
            if (!username) {
                user.style.borderColor = "red";
                user.style.borderWidth = "1px";
            } else {
                if (confirmPass === password) {
                    var hashedPass = hashPassword(password);
                    console.log(hashedPass);
                    var success = await SupabaseRegister(username, hashedPass);
                    if (success) {
                        console.log("Successfully registered.");
                        toLogin();
                    } else {
                        toLogin();
                        alert("User Already Registered");
                        console.log("Did not register. error...");
                    }
                } else {
                    confirm.style.borderWidth = "1px";
                    pass.style.borderWidth = "1px";
                    confirm.style.borderColor = "red";
                    pass.style.borderColor = "red";
                }
            }
        } else if (v === "Log In") {
            var hashedPassLogin = hashPassword(password);
            var successLogin = await SupabaseLogin(username, hashedPassLogin);
            if (successLogin) {
                const loginButtonDiv = document.getElementById("login");
                loginButtonDiv.style.display = "none";
                console.log("Successfully logged in");
                const uid = await SupabaseUser(username);
                setModalState(false);
                localStorage.setItem("userId", uid);
            } else {
                console.log("Password incorrect");
            }
        } else if (v === "Confirm New Password") {
            confirm = document.getElementById("confirmPass");
            pass = document.getElementById("password");
            user = document.getElementById("username");
            console.log(username, password, confirmPass);
            if (username) {
                console.log("username ok");
                if (password === confirmPass) {
                    console.log("password ok");
                    var changeTo = hashPassword(password);
                    var passChanged = await SupabaseForgotPass(
                        username,
                        changeTo
                    );
                    if (passChanged) {
                        console.log(passChanged);
                        alert(
                            "Your password was successfully changed... " +
                                username
                        );
                        toLogin();
                    } else {
                        user.style.border = "2px red solid";
                        pass.style.border = "none";
                        confirm.style.border = "none";
                        alert("User does not exist...");
                    }
                } else {
                    confirm.style.border = "3px red solid";
                    pass.style.border = "3px red solid";
                }
            } else {
                user.style.border = "2px red solid";
            }
        }
    };
    return (
        <div
            id="homeContainer"
            className="bg-cover bg-center bg-no-repeat bg-orange-200"
        >
            <div id="homeSearch">
                <h1 className="capitalize text-amber-900 font-mono font-bold text-3xl h-max w-4/5 pt-2 rounded-full pl-28">
                    Search for Movies. i got you
                </h1>
                <h4 className="capitalize font-mono font-bold text-l h-max w-4/5 pt-2 rounded-full pl-28">
                    Millions of movies, TV shows and people to discover. Explore
                    now.
                </h4>
                <div className="input-group">
                    <div className="homeSearchInput">
                        <input
                            autoFocus
                            type="search"
                            id="searchInput"
                            //  className="form-control"
                            onChange={(e) => setValue(e)}
                            placeholder="Search for a movie or tv show"
                        />
                    </div>
                    {valid ? (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to="result"
                        >
                            Search
                        </Link>
                    ) : (
                        <Link
                            id="search-button"
                            className="btn btn-primary text-center text-xl shadow-5"
                            to=""
                            onClick={() => invalidInput()}
                        >
                            Search
                        </Link>
                    )}
                </div>
                <div id="homeMenu">
                    <Link className="homeMenuLinks" to={"memes"}>
                        memes
                    </Link>
                    <Link className="homeMenuLinks" to={"favorites"}>
                        My Watchlist
                    </Link>
                    <button
                        id="login"
                        className="homeMenuLinks"
                        onClick={() => setModalState(true)}
                    >
                        Log In or Register
                    </button>
                </div>
            </div>

            <div id="homeFeatured" className="rounded-md">
                <div id="homeFeatures">
                    <span>
                        <button
                            onClick={() => setList("popular")}
                            id="popular"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Popular
                        </button>
                        <button
                            onClick={() => setList("top rated")}
                            id="toprated"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Top Rated
                        </button>
                        <button
                            onClick={() => setList("theatres")}
                            id="theatres"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            In Theatres
                        </button>
                        <button
                            onClick={() => setList("upcoming")}
                            id="upcoming"
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => {
                                console.log(features);
                            }}
                            type="button"
                            class="homeFeatureButton w-fit h-full text-center"
                        >
                            ssss
                        </button>
                    </span>
                </div>
                <div id="features">
                    <div id="homeCarousel">
                        {current.map((x) => {
                            return (
                                <div className="homePosters">
                                    <Link
                                        className="homePoster"
                                        to={"/movie"}
                                        state={{ id: x.id }}
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${x.poster_path}`}
                                            alt=""
                                        />
                                    </Link>

                                    <div className="homePostersInfo">
                                        <Link
                                            to={"/movie"}
                                            state={{ id: x.id }}
                                            className="homePosterTitle"
                                        >
                                            <h1>{x["original_title"]}</h1>
                                            <h1 className="text-yellow-500">
                                                {x["vote_average"]}
                                            </h1>
                                        </Link>
                                        {x["release_date"]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Modal
                id="loginContent"
                style={customStyles}
                isOpen={modalState}
                onRequestClose={() => setModalState(false)}
                contentLabel="Example Modal"
                ariaHideApp={false}
                shouldCloseOnOverlayClick={true}
            >
                <div style={customStyles.container} id="loginCont">
                    <div id="loginIcon"></div>
                    <div style={customStyles.login} id="minHeightSet">
                        <input
                            id="username"
                            style={customStyles.inputs}
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            style={customStyles.inputs}
                            type="password"
                            id="password"
                            placeholder="enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            id="confirmPass"
                            style={customStyles.inputs}
                            type="password"
                            placeholder="confirm password"
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />

                        <div style={customStyles.forgotInput}>
                            <button
                                className="forgotInputs"
                                onClick={() => forgotPass()}
                            >
                                forgot password
                            </button>
                            <button
                                className="forgotInputs"
                                onClick={() => register()}
                            >
                                register now
                            </button>
                            <button id="backToLogin" onClick={() => toLogin()}>
                                back to login
                            </button>
                        </div>

                        <input
                            id="loginButton"
                            style={customStyles.loginButton}
                            type="button"
                            value={button}
                            onClick={(e) => loginHandler(e)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        height: "65%",
        backgroundColor: "rgba(255, 215, 122, 0.79)",
        minHeight: "450px",
    },
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    inputs: {
        color: "white",
        width: "90%",
        height: "3rem",
        minHeight: "1.5rem",
        margin: "1rem",
        // backgroundColor: '#FBAB7E',
        backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        paddingLeft: "1rem",
        borderRadius: "1rem",
        outline: "none",
    },
    loginButton: {
        width: "60%",
        height: "3rem",
        position: "absolute",
        bottom: "0",
        backgroundColor: "green",
        color: "white",
    },
    login: {
        width: "100%",
        height: "100%",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: 'space-evenly',
        alignItems: "center",
    },
    forgotInput: {
        width: "80%",
        height: "1rem",
        display: "flex",
        justifyContent: "space-evenly",
    },
};

export default Home;
