import NatureHome from '/images/nature-1.jpg';
import NaturePortfolio from '/images/nature-2.jpg';
import PhotoshootsHome from '/images/photoshoots-1.jpg';
import PhotoshootsPortfolio from '/images/photoshoots-2.jpg';
import SportsHome from '/images/sports-1.jpg';
import SportsPortfolio from '/images/sports-2.jpg';
import MusicPortfolio from '/images/music-1.jpg';
import LifestylePortfolio from '/images/lifestyle-1.jpg';
import EditorialCover1 from '/images/editorial-cover-1.png';
import EditorialCover2 from '/images/editorial-cover-2.png';

//GENERALES
import Photoshoots3 from '/images/photoshoots-3.jpg';
import Photoshoots4 from '/images/photoshoots-4.jpg';
import Photoshoots5 from '/images/photoshoots-5.jpg';
import Photoshoots6 from '/images/photoshoots-6.jpg';



export const homeSwiperImages = [
    {   src : NatureHome,
        name : "Nature",
        date : 2023,
        description : "Description 1"
    }
    ,
    {   src : PhotoshootsHome,
        name : "Photoshoots",
        date : 2023,
        description : "Description 2"
    },
    {   src : SportsHome,
        name : "Sports",
        date : 2023,
        description : "Description 3"
    }
];


export const portfolioParallaxHero = [
    {   src : NatureHome,
        y : "sm"
    }
    ,
    {   src : PhotoshootsHome,
        y: "md",
    },
    {   src : SportsHome,
        y: "lg"
    },
];

export const portfolioCardAnimation = [
    {   src : PhotoshootsPortfolio,
        name : "Photoshoots",
        date : 2023,
        description : "Description 2",
        url : "/portfolio/photoshoots"
    }
    ,
    {   src : NaturePortfolio,
        name : "Nature",
        date : 2023,
        description : "Description 1",
        url : "/portfolio/nature"
    },
    {   src : SportsPortfolio,
        name : "Sports",
        date : 2023,
        description : "Description 3",
        url : "/portfolio/sports"
    },
    {   src : MusicPortfolio,
        name : "Music",
        date : 2023,
        description : "Description 3",
        url : "/portfolio/music"
    },
    {   src : LifestylePortfolio,
        name : "Lifestyle",
        date : 2023,
        description : "Description 3",
        url : "/portfolio/lifestyle"
    },
];


export const editorialsParallaxHero = [
    {   src : Photoshoots3,
        y : "sm"
    }
    ,
    {   src : Photoshoots4,
        y: "md",
    },
    {   src : Photoshoots5,
        y: "lg"
    },
    {   src : Photoshoots6,
        y: "sm"
    },
   
];


export const editorialsCovers = [
    {   src : EditorialCover1,
        name : "GREECE",
        year : "2022"
    }
    ,
    {   src : EditorialCover2,
        name: "TANZANIA",
        year : "2023"
    },
   
];
