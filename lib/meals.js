// access to db

import sql from 'better-sqlite3'
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'ca-central-1'
});
const db = sql('meals.db');

export async function getMeals() {
    // slow simulation 
    await new Promise((resolve) => setTimeout(resolve, 5000));

    //throw new Error('loading error')
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    // create slug
    meal.slug = slugify(meal.title, {lower: true});
    // sanitize user input
    meal.instructions = xss(meal.instructions); 

    /* save user image to S3 */
    // create file name
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // create array type buffer
    const bufferedImage = await meal.image.arrayBuffer();

    s3.putObject({
        Bucket: 'soyonlee-nextjs-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    });

    meal.image = fileName;

    // save meal object into db; value order matters
    db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (         
         @title,
         @summary,
         @instructions,
         @creator,
         @creator_email,
         @image,
         @slug
         )
    `).run(meal); 
}