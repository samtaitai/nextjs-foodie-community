'use server'

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals"
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === '';
}

// useFormState passes two parameters: prevState, formData
export async function shareMeal(prevState, formData) {
    // create a meal object
    const meal = {
      title: formData.get('title'), // name value
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'), // from ImagePicker
      creator: formData.get('name'),
      creator_email: formData.get('email')
    }

    // server-side input validation
    if (isInvalidText(meal.title) || 
      isInvalidText(meal.summary) || 
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes('@') ||
      !meal.image || meal.image.size === 0
    ) {
      return {
        message: 'Invalid input.'
      }
    }

    // store it database
    await saveMeal(meal);

    // let nextJS revalidate cache /meals
    // if nested pages exist, revalidatePath('/meals', 'layout');
    revalidatePath('/meals');

    // redirect after submission
    redirect('/meals');
  }