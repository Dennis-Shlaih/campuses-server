import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
async function main() {
    // Clear existing data
    await prisma.student.deleteMany();
    await prisma.campus.deleteMany();

    // Create campuses
    const hunter = await prisma.campus.create({
        data: {
            name: 'Hunter College',
            address: '695 Park Ave, New York, NY 10065',
            imageUrl: 'https://placehold.co/400x200?text=Hunter+College',
            description: 'A public liberal arts college in Manhattan, part of the CUNY system.'
        }
    });
    
    const brooklyn = await prisma.campus.create({
        data: {
            name: 'Brooklyn College',
            address: '2900 Bedford Ave, Brooklyn, NY 11210',
            imageUrl: 'https://placehold.co/400x200?text=Brooklyn+College',
            description: 'A public college in Brooklyn, part of the CUNY system.'
        }
    });

    const queens = await prisma.campus.create({
        data: {
            name: 'Queens College',
            address: '65-30 Kissena Blvd, Queens, NY 11367',
            imageUrl: 'https://placehold.co/400x200?text=Queens+College',
            description: 'A public college in Queens, part of the CUNY system.'
        }
    });

    await prisma.student.createMany({
        data: [
                {
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    email: 'alice.johnson@example.com',
                    imageUrl: 'https://placehold.co/150x150?text=AJ',
                    gpa: 3.8,
                    campusId: hunter.id
                },

                {
                    firstName: 'Bob',
                    lastName: 'Smith',
                    email: 'bob.smith@example.com',
                    imageUrl: 'https://placehold.co/150x150?text=BS',
                    gpa: 3.2,
                    campusId: hunter.id
                },

                {
                    firstName: 'Carol',
                    lastName: 'Davis',
                    email: 'carol.davis@example.com',
                    imageUrl: 'https://placehold.co/150x150?text=CD',
                    gpa: 3.5,
                    campusId: brooklyn.id
                },
            {
                firstName: 'David',
                lastName: 'Lee',
                email: 'david.lee@example.com',
                imageUrl: 'https://placehold.co/150x150?text=DL',
                gpa: 2.9,
                campusId: queens.id
            },
            {
                firstName: 'Eva',
                lastName: 'Martinez',
                email: 'eva.martinez@example.com',
                imageUrl: 'https://placehold.co/150x150?text=EM',
                gpa: 3.95,
                campusId: null
            }
        ]
    });
    
    console.log('Seeded: 3 campuses, 5 students (1 unenrolled)');
}

main() 
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect()
    });