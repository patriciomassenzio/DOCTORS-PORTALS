import clock from '../assets/icons/clock.svg';
import marker from '../assets/icons/marker.svg';
import phone from '../assets/icons/phone.svg';


import fluoride from '../assets/images/fluoride.png';
import cavity from '../assets/images/cavity.png';
import teeth from '../assets/images/whitening.png';


import user1 from '../assets/images/people1.png'
import user2 from '../assets/images/people2.png'
import user3 from '../assets/images/people3.png'

// Fake data for info section 
const info = [
    {
        id: 1,
        img: clock,
        title: 'Opening Hours',
        subTitle: 'Lorem Ipsum is simply dummy text of the pri',
        cardColor: 'bg-gradient-to-r from-secondary to-primary text-white'
    },
    {
        id: 2,
        img: marker,
        title: 'Visit Our Location',
        subTitle: 'Brooklyn, NY 10036, United States',
        cardColor: 'bg-neutral text-white'
    },
    {
        id: 3,
        img: phone,
        title: 'Contact Us Now',
        subTitle: '+000 123 456789',
        cardColor: 'bg-gradient-to-r from-secondary to-primary text-white'
    }
];


// Fake data for services
const services = [
    {
        id: 100,
        img: fluoride,
        title: 'Fluoride Treatment',
        subTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, adipisci.'
    },
    {
        id: 101,
        img: cavity,
        title: 'Cavity Filling',
        subTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, adipisci.'
    },
    {
        id: 102,
        img: teeth,
        title: 'Teeth Whitenig',
        subTitle: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, adipisci.'
    },
];


// Fake data for testimonials 
const users = [
    {
        id: 200,
        name: 'Winson Herry',
        address: 'Los Angeles',
        img: user1,
        review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content.'
    },
    {
        id: 201,
        name: 'Jason Roy',
        address: 'New York',
        img: user2,
        review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content.'
    },
    {
        id: 202,
        name: 'Will Smith',
        address: 'United Kingdom',
        img: user3,
        review: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content.'
    },
];


export { info, services, users };