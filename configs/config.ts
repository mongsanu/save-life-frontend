import teacher from '../public/teacher-avatar.png';
import mongsanu from '../public/monsanu.jpg';
import samiul from '../public/samiul.jpg';
const divisions = require('./divisions.json');
const districts = require('./districts.json');
const upazillas = require('./upazilas.json');
const unions = require('./unions.json');
const admins = [
    {
        name: 'Mongsanu Marma',
        email: 'ce17059@mbstu.ac.bd',
        img: mongsanu,
        id: 'CE17059',
        batch: "14th",
        dept: "Computer Science & Engineering",
        university: "Mawlana Bhashani Science & Technology University, Shantosh, Tangail",
    },
    {
        name: 'Samiul Hoque',
        email: 'ce18014@mbstu.ac.bd',
        img: samiul,
        id: 'CE18019',
        batch: "15th",
        dept: "Computer Science & Engineering",
        university: "Mawlana Bhashani Science & Technology University, Shantosh, Tangail",
    }
];

const supervisors = [
    {
        name: 'Dr. Mehedi Hasan Talukder',
        email: 'm.hasan2006@yahoo.com',
        mobile: '01..........',
        img: teacher,
        designation: 'Associate Professor',
        dept: 'Computer Science & Engineering',
        university: 'Mawlana Bhashani Science & Technology University, Shantosh, Tangail',
    }
];

export { admins, supervisors, divisions, districts, upazillas, unions };