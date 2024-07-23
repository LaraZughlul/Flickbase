import * as Yup from 'yup';

export const formValues = {
    title: '',
    content: '',
    excerpt: '',
    score: '',
    director: '',
    actors: [],
    status: 'draft',
    category: ''
}

export const validation = () => (
    Yup.object({
        title: Yup.string()
            .required('Title is required'),
        content: Yup.string()
            .required('Content is required')
            .min(50, 'That is it ? ...write some more'),
        excerpt: Yup.string()
            .required('Description is required')
            .max(500, 'Sorry 500 max'),
        score: Yup.number()
            .required('Score is required')
            .min(0, '0 is the min')
            .max(100, '100 is the max'),
        director: Yup.string()
            .required('Director is required'),
        actors: Yup.array()
            .required('Actors are required')
            .min(3, 'Must be 3 at least'),
        status: Yup.string()
            .required('Status is required'),
        category: Yup.string()
            .required('Category is required')
    })
)