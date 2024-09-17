import NatureHome from '/images/nature-1.jpg';
import NaturePortfolio from '/images/nature-2.jpg';
import PhotoshootsHome from '/images/photoshoots-1.jpg';
import PhotoshootsPortfolio from '/images/photoshoots-2.jpg';
import SportsHome from '/images/sports-1.jpg';
import SportsPortfolio from '/images/sports-2.jpg';
import MusicPortfolio from '/images/music-1.jpg';
import LifestylePortfolio from '/images/lifestyle-1.jpg';

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
        description : "Description 2"
    }
    ,
    {   src : NaturePortfolio,
        name : "Nature",
        date : 2023,
        description : "Description 1"
    },
    {   src : SportsPortfolio,
        name : "Sports",
        date : 2023,
        description : "Description 3"
    },
    {   src : MusicPortfolio,
        name : "Music",
        date : 2023,
        description : "Description 3"
    },
    {   src : LifestylePortfolio,
        name : "Lifestyle",
        date : 2023,
        description : "Description 3"
    },
];
