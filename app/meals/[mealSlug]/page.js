import classes from './page.module.css'
import Image from 'next/image'
import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation'

// adding dynamic metadata
export async function generateMetadata({ params }) {
    const meal = await getMeal(params.mealSlug);

    if (!meal) {
        // render not-found.js
        notFound();
    }
    
    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default async function MealsDetailsPage({ params }) {
    // params object has keys, and one of keys is [mealSlug]
    // usage of slug 
    const meal = await getMeal(params.mealSlug);

    if (!meal) {
        // render not-found.js
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={`https://soyonlee-nextjs-demo-users-image.s3.ca-central-1.amazonaws.com/${meal.image}`} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} 
                dangerouslySetInnerHTML={{__html: meal.instructions}}></p>
            </main>
        </>
    )
}